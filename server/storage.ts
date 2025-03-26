import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  productFeatures, type ProductFeature, type InsertProductFeature,
  testimonials, type Testimonial, type InsertTestimonial,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Product Features
  getProductFeatures(productId: number): Promise<ProductFeature[]>;
  createProductFeature(feature: InsertProductFeature): Promise<ProductFeature>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Newsletter Subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private productFeatures: Map<number, ProductFeature>;
  private testimonials: Map<number, Testimonial>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  private userCurrentId: number;
  private productCurrentId: number;
  private productFeatureCurrentId: number;
  private testimonialCurrentId: number;
  private contactSubmissionCurrentId: number;
  private newsletterSubscriptionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.productFeatures = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.productFeatureCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    this.newsletterSubscriptionCurrentId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    // Make sure all the required fields are present with correct types
    const product: Product = {
      id,
      name: insertProduct.name,
      slug: insertProduct.slug,
      description: insertProduct.description,
      shortDescription: insertProduct.shortDescription,
      price: insertProduct.price,
      salePrice: insertProduct.salePrice || null,
      imageSrc: insertProduct.imageSrc,
      badge: insertProduct.badge || null,
      isFeatured: insertProduct.isFeatured || null,
      category: insertProduct.category
    };
    this.products.set(id, product);
    return product;
  }
  
  // Product Features
  async getProductFeatures(productId: number): Promise<ProductFeature[]> {
    return Array.from(this.productFeatures.values()).filter(
      (feature) => feature.productId === productId,
    );
  }
  
  async createProductFeature(insertFeature: InsertProductFeature): Promise<ProductFeature> {
    const id = this.productFeatureCurrentId++;
    const feature: ProductFeature = {
      id,
      productId: insertFeature.productId,
      feature: insertFeature.feature
    };
    this.productFeatures.set(id, feature);
    return feature;
  }
  
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = {
      id,
      name: insertTestimonial.name,
      location: insertTestimonial.location,
      rating: insertTestimonial.rating,
      review: insertTestimonial.review,
      initials: insertTestimonial.initials
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Contact Submissions
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionCurrentId++;
    const submission: ContactSubmission = {
      id,
      name: insertSubmission.name,
      email: insertSubmission.email,
      subject: insertSubmission.subject,
      message: insertSubmission.message,
      createdAt: insertSubmission.createdAt
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  // Newsletter Subscriptions
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.newsletterSubscriptionCurrentId++;
    const subscription: NewsletterSubscription = {
      id,
      email: insertSubscription.email,
      createdAt: insertSubscription.createdAt
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Sample products
    const products: InsertProduct[] = [
      {
        name: "Almond Oat Cookies",
        slug: "almond-oat-cookies",
        description: "A wholesome blend of nutrient-rich oats, premium almonds, and whole wheat flour, our Almond Oat Cookies offer the perfect balance of taste and health. Made exclusively with pure Desi ghee—never palm oil—these cookies bring home a rich, authentic flavour while staying free from trans fats and preservatives. Whether you're looking for a guilt-free snack or a nourishing treat, this clean-label delight ensures pure indulgence with every bite.",
        shortDescription: "A wholesome blend of nutrient-rich oats, premium almonds, and whole wheat flour.",
        price: "199",
        salePrice: "199",
        imageSrc: "/almond-oat-lifestyle",
        badge: "Bestseller",
        isFeatured: true,
        category: "healthy",
      },
      {
        name: "Chocochip Brownie Cookies",
        slug: "chocochip-brownie-cookies",
        description: "For those who crave intense chocolate flavour with a crunch, our Choco Chip Brownie Cookies are the perfect treat. Combining the fudgy richness of brownies with crispy choco chips, these cookies redefine indulgence without compromising on health. Made with pure Desi ghee (never palm oil), zero trans fats, and no preservatives, each bite is a decadent yet guilt-free delight.",
        shortDescription: "Combining the fudgy richness of brownies with crispy choco chips for chocolate lovers.",
        price: "249",
        salePrice: "249",
        imageSrc: "/chocochip-brownie",
        badge: "New",
        isFeatured: true,
        category: "indulgent",
      },
      {
        name: "Kodo Millet Cookies",
        slug: "kodo-millet-cookies",
        description: "Power-packed with protein, fiber, and ancient grain goodness, our Kodo Millet Cookies are completely wheat-free, making them the perfect choice for gluten-sensitive or health-conscious consumers. Crafted with pure Desi ghee, zero refined sugar, and no preservatives, these cookies offer a light yet satisfying crunch while promoting better digestion and sustained energy.",
        shortDescription: "Power-packed with protein, fiber, and ancient grain goodness, completely wheat-free.",
        price: "279",
        salePrice: "279",
        imageSrc: "/kodo-millet",
        badge: "Gluten-Free",
        isFeatured: false,
        category: "gluten-free",
      },
      {
        name: "Honey Oat Cookies",
        slug: "honey-oat-cookies",
        description: "Infused with the natural sweetness of honey and the nutritional power of oats, our Honey Oat Cookies deliver the perfect harmony of taste and health. Made with pure Desi ghee, zero trans fats, and no preservatives, these cookies are a wholesome snack that supports your well-being while satisfying your sweet cravings.",
        shortDescription: "Infused with natural sweetness of honey and the nutritional power of oats.",
        price: "229",
        salePrice: "229",
        imageSrc: "/honey-oats",
        badge: "",
        isFeatured: false,
        category: "healthy",
      }
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
    
    // Product features
    const productFeatureMap: { [key: string]: string[] } = {
      "almond-oat-cookies": [
        "Pure Desi Ghee – No palm oil, just authentic flavour",
        "Whole Wheat Goodness – No maida, just wholesome grains",
        "Zero Trans Fat, No Palm Oil, No Preservatives – Clean, guilt-free indulgence",
        "Nutrient-Dense – Infused with almonds and oats for sustained energy",
        "Traditionally Inspired, Health-Conscious – Crafted for taste and wellness"
      ],
      "chocochip-brownie-cookies": [
        "Decadent Brownie Taste – Fudgy, chocolaty, and satisfying",
        "Pure Desi Ghee Goodness – No palm oil, only authentic ingredients",
        "Zero Trans Fat, No Preservatives, No Palm Oil – Made for guilt-free indulgence",
        "Crispy Choco Chips – Perfectly balanced texture",
        "Clean Label & Health-Conscious – Rich taste, mindful ingredients"
      ],
      "kodo-millet-cookies": [
        "Wheat-Free & Wholesome – Perfect for mindful snackers",
        "Protein & Fiber-Rich – Powered by Kodo millet for better health",
        "Pure Desi Ghee Flavour – No palm oil, only traditional richness",
        "No Refined Sugar, No Preservatives, No Palm Oil – Naturally nourishing",
        "Balanced & Guilt-Free – The perfect mix of taste and nutrition"
      ],
      "honey-oat-cookies": [
        "Hearty Oats for Sustained Energy – Wholesome and filling",
        "Made with Pure Desi Ghee – No palm oil, just authentic taste",
        "No Palm Oil, No Preservatives, Zero Trans Fat – Clean-label snacking",
        "Perfect Balance of Health & Indulgence – Guilt-free treat",
        "Clean Label & Health-Conscious – Rich taste, mindful ingredients"
      ]
    };
    
    // Create product features
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const features = productFeatureMap[product.slug];
      
      if (features) {
        for (const feature of features) {
          this.createProductFeature({
            productId: i + 1,  // Product IDs start from 1
            feature
          });
        }
      }
    }
    
    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Priya R.",
        location: "Delhi",
        rating: 5,
        review: "I never thought healthy cookies could taste this good! The Almond Oat ones are my absolute favorite. Love that they're made with desi ghee instead of palm oil.",
        initials: "PR"
      },
      {
        name: "Anand K.",
        location: "Mumbai",
        rating: 5,
        review: "The Kodo Millet Cookies have been a game-changer for my gluten-sensitive family. Delicious, nutritious, and made with such care. We're repeat customers!",
        initials: "AK"
      },
      {
        name: "Sneha M.",
        location: "Bangalore",
        rating: 4.5,
        review: "My kids love the Chocochip Brownie Cookies and I love that they're made with real ingredients. No guilt when they ask for seconds!",
        initials: "SM"
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
