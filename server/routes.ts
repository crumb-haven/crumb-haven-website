import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

// Simple in-memory cache implementation
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface ProductDetailsCache {
  product: any;
  features: string[];
}

class AppCache {
  private products: CacheItem<any> | null = null;
  private featuredProducts: CacheItem<any> | null = null;
  private testimonials: CacheItem<any> | null = null;
  private productDetails: Map<string, CacheItem<ProductDetailsCache>> = new Map();

  // Get data from cache if valid, otherwise fetch from source and cache
  async getOrFetch<T>(
    key: 'products' | 'featuredProducts' | 'testimonials',
    ttl: number,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cache = this[key] as CacheItem<T> | null;
    
    if (cache && Date.now() - cache.timestamp < cache.ttl) {
      return cache.data;
    }
    
    const data = await fetchFn();
    this[key] = { data, timestamp: Date.now(), ttl };
    return data;
  }

  // Get product details from cache or fetch
  async getProductDetails(
    slug: string,
    ttl: number,
    fetchFn: () => Promise<ProductDetailsCache>
  ): Promise<ProductDetailsCache> {
    const cache = this.productDetails.get(slug);
    
    if (cache && Date.now() - cache.timestamp < cache.ttl) {
      return cache.data;
    }
    
    const data = await fetchFn();
    this.productDetails.set(slug, { data, timestamp: Date.now(), ttl });
    return data;
  }
}

// Initialize cache instance
const appCache = new AppCache();

// Performance monitoring middleware
const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Add response hook to log slow requests
  const originalSend = res.send;
  res.send = function(body?: any): any {
    const duration = Date.now() - start;
    
    // Only log if request is slow (>100ms)
    if (duration > 100) {
      console.log(`[PERF] ${req.method} ${req.url} - ${duration}ms`);
    }
    
    return originalSend.call(res, body);
  };
  
  next();
};

// Standard headers for caching and security
const addStandardHeaders = (res: Response) => {
  res.setHeader('Cache-Control', 'public, max-age=300'); // Browser cache for 5 minutes
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
};

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Add performance monitoring
  apiRouter.use(performanceMonitor);
  
  // Get all products
  apiRouter.get("/products", async (_req: Request, res: Response) => {
    try {
      // Use cache with 5-minute TTL
      const products = await appCache.getOrFetch('products', 5 * 60 * 1000, async () => {
        return await storage.getProducts();
      });
      
      addStandardHeaders(res);
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  // Get product by slug
  apiRouter.get("/products/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      
      // Use cache with 10-minute TTL
      const productData = await appCache.getProductDetails(
        slug,
        10 * 60 * 1000,
        async () => {
          const product = await storage.getProductBySlug(slug);
          
          if (!product) {
            throw new Error('Product not found');
          }
          
          const features = await storage.getProductFeatures(product.id);
          return {
            product,
            features: features.map(f => f.feature)
          };
        }
      );
      
      addStandardHeaders(res);
      return res.json(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      
      if ((error as Error).message === 'Product not found') {
        return res.status(404).json({ message: "Product not found" });
      }
      
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Get featured products
  apiRouter.get("/featured-products", async (_req: Request, res: Response) => {
    try {
      // Use cache with 5-minute TTL
      const products = await appCache.getOrFetch('featuredProducts', 5 * 60 * 1000, async () => {
        return await storage.getFeaturedProducts();
      });
      
      addStandardHeaders(res);
      return res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  
  // Get testimonials
  apiRouter.get("/testimonials", async (_req: Request, res: Response) => {
    try {
      // Use cache with 30-minute TTL (testimonials rarely change)
      const testimonials = await appCache.getOrFetch('testimonials', 30 * 60 * 1000, async () => {
        return await storage.getTestimonials();
      });
      
      addStandardHeaders(res);
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Submit contact form
  apiRouter.post("/contact", async (req: Request, res: Response) => {
    try {
      const validationResult = insertContactSubmissionSchema.safeParse({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        createdAt: new Date().toISOString()
      });
      
      if (!validationResult.success) {
        const errorMessage = fromZodError(validationResult.error).message;
        return res.status(400).json({ 
          success: false,
          message: errorMessage
        });
      }
      
      await storage.createContactSubmission(validationResult.data);
      return res.status(201).json({ 
        success: true,
        message: "Contact form submitted successfully" 
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(400).json({ 
        success: false,
        message: "Failed to submit contact form. Please try again." 
      });
    }
  });
  
  // Subscribe to newsletter
  apiRouter.post("/newsletter", async (req: Request, res: Response) => {
    try {
      const emailSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
      });
      
      const { email } = emailSchema.parse(req.body);
      
      await storage.createNewsletterSubscription({
        email,
        createdAt: new Date().toISOString()
      });
      
      return res.status(201).json({ 
        success: true,
        message: "Subscribed to newsletter successfully" 
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      return res.status(400).json({ 
        success: false,
        message: "Failed to subscribe to newsletter. Please try again." 
      });
    }
  });
  
  app.use("/api", apiRouter);
  
  const httpServer = createServer(app);
  
  return httpServer;
}
