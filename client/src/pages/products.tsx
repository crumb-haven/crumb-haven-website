import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const categories = [
    { id: null, name: "All" },
    { id: "healthy", name: "Healthy" },
    { id: "indulgent", name: "Indulgent" },
    { id: "gluten-free", name: "Gluten-Free" }
  ];

  const filteredProducts = activeCategory
    ? products?.filter(product => product.category === activeCategory)
    : products;

  const containerVariants = {
    hidden: {},
    visible: {
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
      transition: {
        duration: 0.4
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
        </div>
        
        <div className="flex justify-center mb-10 animate-pulse">
          <div className="flex space-x-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-10 bg-slate-200 rounded w-24"></div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
              <div className="w-full h-60 bg-slate-200"></div>
              <div className="p-4">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6 mb-3"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error loading products</h2>
        <p className="mt-4">Sorry, something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Cookies | Crumb Haven</title>
        <meta name="description" content="Explore our range of healthy and delicious cookies made with pure desi ghee, zero preservatives, and no trans fats." />
      </Helmet>
      
      <div className="bg-[#F9F5EB] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
              Our Cookies
            </h1>
            <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
              Discover our range of cookies, crafted with pure desi ghee and wholesome ingredients for the perfect balance of taste and health.
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={
                    activeCategory === category.id
                      ? "bg-[#8B5A2B] text-white hover:bg-[#6D4522]"
                      : "border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white"
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredProducts && filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map(product => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#4A3520]">No products found in this category. Please try another category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
