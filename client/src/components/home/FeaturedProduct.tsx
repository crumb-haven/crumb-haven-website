import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cart-store";

const FeaturedProduct = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/featured-products'],
  });
  
  const addToCart = useCartStore(state => state.addItem);

  if (isLoading) {
    return (
      <section className="bg-[#F9F5EB] py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-6"></div>
                
                <div className="space-y-2 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-slate-200 rounded w-2/3"></div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div className="h-6 bg-slate-200 rounded w-20"></div>
                </div>
                
                <div className="h-10 bg-slate-200 rounded w-1/3"></div>
              </div>
              <div className="h-96 bg-slate-200"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !products || products.length === 0) {
    return null; // Don't show this section if there's an error or no featured products
  }

  // Get the first featured product
  const featuredProduct = products[0];
  
  const handleAddToCart = () => {
    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: Number(featuredProduct.salePrice || featuredProduct.price),
      image: featuredProduct.imageSrc,
      quantity: 1
    });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <section className="bg-[#F9F5EB] py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div 
              className="p-8 md:p-12 flex flex-col justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={textVariants}
            >
              <span className="inline-block bg-[#F5D67D] text-[#6D4522] px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Product
              </span>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#8B5A2B] mb-4">
                {featuredProduct.name}
              </h2>
              <p className="text-[#4A3520] opacity-80 mb-6">
                {featuredProduct.description}
              </p>
              
              <div className="mb-6 space-y-2">
                {/* We'll fetch features from the API in a real implementation */}
                <motion.div className="flex items-center" variants={listItemVariants}>
                  <Check className="text-[#7D9D74] mr-2 h-5 w-5" />
                  <span>Pure Desi Ghee – No palm oil</span>
                </motion.div>
                <motion.div className="flex items-center" variants={listItemVariants}>
                  <Check className="text-[#7D9D74] mr-2 h-5 w-5" />
                  <span>Whole Wheat Goodness – No maida</span>
                </motion.div>
                <motion.div className="flex items-center" variants={listItemVariants}>
                  <Check className="text-[#7D9D74] mr-2 h-5 w-5" />
                  <span>Zero Trans Fat, No Preservatives</span>
                </motion.div>
                <motion.div className="flex items-center" variants={listItemVariants}>
                  <Check className="text-[#7D9D74] mr-2 h-5 w-5" />
                  <span>Nutrient-Dense – With almonds and oats</span>
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <div>
                  {featuredProduct.price !== featuredProduct.salePrice && (
                    <span className="text-sm text-[#4A3520] opacity-70 line-through mr-2">
                      ₹{featuredProduct.price}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-[#8B5A2B]">
                    ₹{featuredProduct.salePrice || featuredProduct.price}
                  </span>
                </div>
                {featuredProduct.price !== featuredProduct.salePrice && (
                  <div className="bg-[#A87C4F] text-white px-3 py-1 rounded-md text-sm">
                    Save ₹{Number(featuredProduct.price) - Number(featuredProduct.salePrice)}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
                <Link href={`/product/${featuredProduct.slug}`}>
                  <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div>
              <img 
                src={featuredProduct.imageSrc} 
                alt={`${featuredProduct.name} with ingredients`} 
                className="w-full h-full object-cover"
                width="800" 
                height="600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
