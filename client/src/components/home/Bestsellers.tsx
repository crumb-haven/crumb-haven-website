import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Product } from "@shared/schema";

const Bestsellers = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <section id="products" className="bg-[#F9F5EB] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">Our Signature Selection</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
              Bestselling Cookies
            </h2>
            <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
              Discover our most loved cookies, each crafted with care and premium ingredients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
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
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="bg-[#F9F5EB] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

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

  return (
    <section id="products" className="bg-[#F9F5EB] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">Our Signature Selection</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
            Bestselling Cookies
          </h2>
          <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
            Discover our most loved cookies, each crafted with care and premium ingredients.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products?.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 text-center">
          <Link href="/products">
            <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
