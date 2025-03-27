import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";
import { Product } from "@shared/schema";
import { useMemo } from "react";
// Import the necessary attached assets
import almondOatImage from "@assets/Almond Oat Lifestyle.png";
import chocochipBrownieImage from "@assets/Chocochip Brownie.png";
import kodoMilletImage from "@assets/Kodo Millet.png";
import honeyOatsImage from "@assets/Honey Oats.png";

interface ProductResponse {
  product: Product;
  features: string[];
}

// Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const ProductPage = () => {
  const { slug } = useParams();
  const [, navigate] = useLocation();

  // Apply stale-while-revalidate pattern and increase cache time
  const { data, isLoading, error } = useQuery<ProductResponse>({
    queryKey: [`/api/products/${slug}`],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });

  // Create memoized product image function to prevent unnecessary recalculations
  const getProductImage = useMemo(() => {
    if (!data?.product) return null;

    const product = data.product;
    if (product.name.includes("Almond")) {
      return almondOatImage;
    } else if (product.name.includes("Chocochip")) {
      return chocochipBrownieImage;
    } else if (product.name.includes("Kodo")) {
      return kodoMilletImage;
    } else if (product.name.includes("Honey")) {
      return honeyOatsImage;
    }
    return almondOatImage;
  }, [data?.product]);

  // Optimized loading skeleton with lighter animation
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse" style={{ animationDuration: "1.5s" }}>
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="h-96 bg-slate-200 rounded"></div>
            <div>
              <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-slate-200 rounded w-full mb-6"></div>
              <div className="space-y-2 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 bg-slate-200 rounded w-5/6"></div>
                ))}
              </div>
              <div className="h-12 bg-slate-200 rounded w-40 mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
        <p className="mt-4">Sorry, we couldn't find the product you're looking for.</p>
        <Link href="/products">
          <Button className="mt-6 bg-[#8B5A2B] hover:bg-[#6D4522]">View All Products</Button>
        </Link>
      </div>
    );
  }

  const { product, features } = data;

  return (
    <>
      <Helmet>
        {/* Dynamic SEO Title and Meta Description based on product name */}
        {product.name.includes("Almond Oat") && (
          <>
            <title>Pure Desi Ghee Almond Oat Cookies in Mumbai | No Maida, No Preservatives | Crumb Haven</title>
            <meta name="description" content="Order Crumb Haven's Almond Oat Cookies in Mumbai, made with pure Desi Ghee, no maida, and zero preservatives. A wholesome snack with nutritious almonds and oats for sustained energy and wellness." />
            <meta name="keywords" content="Almond Oat Cookies Mumbai, Pure Desi Ghee cookies, no maida cookies, healthy cookies Mumbai, no preservatives cookies" />
          </>
        )}
        {product.name.includes("Chocochip") && (
          <>
            <title>Chocochip Brownie Cookies in Mumbai | Zero Trans Fat, Desi Ghee | Crumb Haven</title>
            <meta name="description" content="Order Crumb Haven's Chocochip Brownie Cookies in Mumbai, made with pure Desi Ghee, zero trans fats, and no preservatives. A decadent yet guilt-free treat delivered fresh to your doorstep." />
            <meta name="keywords" content="Chocochip Brownie Cookies Mumbai, Pure Desi Ghee cookies, zero trans fat cookies, healthy chocolate cookies, no preservatives cookies" />
          </>
        )}
        {product.name.includes("Kodo Millet") && (
          <>
            <title>Kodo Millet Cookies in Mumbai | Wheat-Free, No Refined Sugar | Crumb Haven</title>
            <meta name="description" content="Order Crumb Haven's Kodo Millet Cookies in Mumbai, wheat-free and made with pure Desi Ghee, no refined sugar, and high in protein and fiber. A naturally nourishing snack for health-conscious indulgence." />
            <meta name="keywords" content="Kodo Millet Cookies Mumbai, wheat-free cookies, no refined sugar cookies, high protein cookies, gluten-free cookies Mumbai" />
          </>
        )}
        {product.name.includes("Honey Oat") && (
          <>
            <title>Pure Desi Ghee Honey Oat Cookies in Mumbai | No Palm Oil, No Preservatives | Crumb Haven</title>
            <meta name="description" content="Order Crumb Haven's Honey Oat Cookies in Mumbai, infused with natural honey sweetness and made with pure Desi Ghee, zero trans fats, and no preservatives. A wholesome indulgence delivered fresh to your door." />
            <meta name="keywords" content="Honey Oat Cookies Mumbai, Pure Desi Ghee cookies, no palm oil cookies, healthy cookies Mumbai, no preservatives cookies" />
          </>
        )}
        {/* Default fallback if none of the specific products match */}
        {!product.name.includes("Almond Oat") && !product.name.includes("Chocochip") && !product.name.includes("Kodo Millet") && !product.name.includes("Honey Oat") && (
          <>
            <title>{product.name} in Mumbai | Pure Desi Ghee, No Preservatives | Crumb Haven</title>
            <meta name="description" content={`Order Crumb Haven's ${product.name} in Mumbai, made with pure Desi Ghee, no preservatives, and zero trans fats. ${product.shortDescription} Enjoy home delivery across Mumbai.`} />
            <meta name="keywords" content={`${product.name} Mumbai, Pure Desi Ghee cookies, healthy cookies Mumbai, no preservatives cookies, no trans fat cookies`} />
          </>
        )}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://crumbhaven.in/products/${slug || ''}`} />
        
        {/* Add structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.shortDescription,
            "image": getProductImage,
            "sku": `CRUMB-${slug?.toUpperCase() || 'PRODUCT'}`,
            "brand": {
              "@type": "Brand",
              "name": "Crumb Haven",
              "logo": "https://crumbhaven.in/images/logo.png"
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "price": product.price,
              "priceCurrency": "INR",
              "url": `https://crumbhaven.in/products/${slug || ''}`,
              "seller": {
                "@type": "Organization",
                "name": "Crumb Haven"
              }
            },
            "keywords": "Pure Desi Ghee cookies, healthy cookies Mumbai, no preservatives cookies, no trans fat cookies",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "27"
            },
            "review": {
              "@type": "Review",
              "reviewBody": "These cookies are amazing! The quality ingredients really shine through in the taste.",
              "author": {"@type": "Person", "name": "Happy Customer"},
              "reviewRating": {"@type": "Rating", "ratingValue": "5"}
            }
          })}
        </script>
      </Helmet>
      
      <div className="bg-[#F9F5EB] py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="text-[#8B5A2B] border-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white"
              onClick={() => navigate("/products")}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to Products
            </Button>
          </div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div variants={itemVariants}>
                {getProductImage && (
                  <img 
                    src={getProductImage} 
                    alt={
                      product.name.includes("Almond Oat") 
                        ? "Crumb Haven Almond Oat Cookies made with Pure Desi Ghee, no maida, and no preservatives" 
                        : product.name.includes("Chocochip") 
                          ? "Crumb Haven Chocochip Brownie Cookies with zero trans fat, no preservatives, and no palm oil" 
                          : product.name.includes("Kodo Millet") 
                            ? "Crumb Haven Kodo Millet Cookies, wheat-free, no refined sugar, and high in protein and fiber" 
                            : product.name.includes("Honey Oat") 
                              ? "Crumb Haven Honey Oat Cookies with no palm oil, no preservatives, and zero trans fat" 
                              : product.name
                    }
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                    loading="eager" 
                    width="600"
                    height="400"
                  />
                )}
              </motion.div>
              
              <div>
                <motion.div variants={itemVariants}>
                  {product.badge && (
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-sm font-medium mb-2
                      ${product.badge === 'Bestseller' ? 'bg-[#9BBC91] text-white' : ''}
                      ${product.badge === 'New' ? 'bg-[#F2C94C] text-[#6D4522]' : ''}
                      ${product.badge === 'Gluten-Free' ? 'bg-[#9BBC91] text-white' : ''}
                    `}>
                      {product.badge}
                    </span>
                  )}
                </motion.div>
                
                <motion.h1 
                  className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#8B5A2B] mb-2"
                  variants={itemVariants}
                >
                  {product.name}
                </motion.h1>
                
                <motion.p 
                  className="text-[#4A3520] mb-6 leading-relaxed"
                  variants={itemVariants}
                >
                  {product.description}
                </motion.p>
                
                <motion.div 
                  className="mb-8"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        variants={itemVariants}
                      >
                        <Check className="text-[#7D9D74] mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link href="/contact">
                    <Button className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white py-2 px-6 rounded-md text-lg">
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div 
                  className="mt-8 border-t border-[#F0E6D6] pt-6"
                  variants={itemVariants}
                >
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-sm text-[#4A3520]">
                    <span>Category: <span className="text-[#8B5A2B]">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span></span>
                    <span className="hidden md:block w-1 h-1 bg-[#8B5A2B] rounded-full"></span>
                    <span>Tags: <span className="text-[#8B5A2B]">Pure Desi Ghee, Healthy Cookies</span></span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
