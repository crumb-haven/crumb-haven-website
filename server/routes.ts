import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSubmissionSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Get all products
  apiRouter.get("/products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
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
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const features = await storage.getProductFeatures(product.id);
      
      return res.json({ 
        product,
        features: features.map(f => f.feature) 
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Get featured products
  apiRouter.get("/featured-products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getFeaturedProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });
  
  // Get testimonials
  apiRouter.get("/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
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
      
      const submission = await storage.createContactSubmission(validationResult.data);
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
      
      const subscription = await storage.createNewsletterSubscription({
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
