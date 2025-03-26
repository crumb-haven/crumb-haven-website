import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product, ProductFeature } from "@shared/schema";
import { useCartStore } from "@/lib/cart-store";

interface ProductResponse {
  product: Product;
  features: string[];
}

const ProductPage = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const addToCart = useCartStore(state => state.addItem);

  const { data, isLoading, error } = useQuery<ProductResponse>({
    queryKey: [`/api/products/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse">
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
              <div className="flex space-x-4 mb-6">
                <div className="h-12 bg-slate-200 rounded w-28"></div>
                <div className="h-12 bg-slate-200 rounded w-40"></div>
              </div>
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

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.salePrice || product.price),
      image: product.imageSrc,
      quantity
    });

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Crumb Haven</title>
        <meta name="description" content={product.shortDescription} />
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
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={product.imageSrc} 
                  alt={product.name} 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
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
                
                <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#8B5A2B] mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-6">
                  {product.price !== product.salePrice && (
                    <span className="text-sm text-[#4A3520] opacity-70 line-through">
                      ₹{product.price}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-[#8B5A2B]">
                    ₹{product.salePrice || product.price}
                  </span>
                  
                  {product.price !== product.salePrice && (
                    <span className="bg-[#A87C4F] text-white text-xs px-2 py-1 rounded">
                      Save ₹{Number(product.price) - Number(product.salePrice)}
                    </span>
                  )}
                </div>
                
                <p className="text-[#4A3520] mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-[#7D9D74] mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Quantity:</h3>
                  <div className="flex items-center space-x-3">
                    <button 
                      className="w-8 h-8 flex items-center justify-center border-2 border-[#8B5A2B] rounded text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button 
                      className="w-8 h-8 flex items-center justify-center border-2 border-[#8B5A2B] rounded text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <Button 
                  className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white py-2 px-6 rounded-md text-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
                
                <div className="mt-8 border-t border-[#F0E6D6] pt-6">
                  <div className="flex items-center space-x-3 text-sm text-[#4A3520]">
                    <span>Category: <span className="text-[#8B5A2B]">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span></span>
                    <span className="w-1 h-1 bg-[#8B5A2B] rounded-full"></span>
                    <span>Tags: <span className="text-[#8B5A2B]">Pure Desi Ghee, Healthy Cookies</span></span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
