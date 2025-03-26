import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ShoppingCart, 
  Trash2, 
  ChevronLeft, 
  Plus, 
  Minus, 
  CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/cart-store";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCartStore();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate a checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. We'll send you a confirmation email shortly.",
      });
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const incrementQuantity = (itemId: number, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decrementQuantity = (itemId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  // Shipping charges
  const shippingCharge = subtotal() > 500 ? 0 : 50;
  // GST (5%)
  const gst = subtotal() * 0.05;
  // Total amount
  const totalAmount = subtotal() + shippingCharge + gst;

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Crumb Haven</title>
        <meta name="description" content="Your shopping cart at Crumb Haven - Review and checkout your selection of healthy and delicious cookies." />
      </Helmet>
      
      <div className="bg-[#F9F5EB] py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/products">
              <Button 
                variant="outline" 
                className="text-[#8B5A2B] border-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Continue Shopping
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            <div className="flex items-center mb-6">
              <ShoppingCart className="h-6 w-6 text-[#8B5A2B] mr-3" />
              <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#8B5A2B]">
                Your Shopping Cart
              </h1>
            </div>
            
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#F0E6D6] rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-[#8B5A2B]" />
                </div>
                <h2 className="text-xl font-semibold text-[#8B5A2B] mb-2">Your cart is empty</h2>
                <p className="text-[#4A3520] opacity-80 mb-6">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link href="/products">
                  <Button className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white">
                    Browse Our Cookies
                  </Button>
                </Link>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Cart Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 font-semibold text-[#4A3520] mb-4 pb-2 border-b border-[#F0E6D6]">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      variants={itemVariants}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-[#F0E6D6]"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6 flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md mr-4"
                          width="80"
                          height="80"
                        />
                        <div>
                          <h3 className="font-medium text-[#8B5A2B]">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 flex items-center mt-2 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-[#4A3520] md:text-center">
                        <span className="md:hidden font-medium text-[#8B5A2B]">Price: </span>
                        ₹{item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 md:text-center">
                        <span className="md:hidden font-medium text-[#8B5A2B] mb-2 block">Quantity: </span>
                        <div className="flex items-center md:justify-center">
                          <button 
                            className="w-8 h-8 flex items-center justify-center border border-[#8B5A2B] rounded-l-md text-[#8B5A2B] hover:bg-[#F0E6D6] transition-colors"
                            onClick={() => decrementQuantity(item.id, item.quantity)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center border-t border-b border-[#8B5A2B] bg-white">
                            {item.quantity}
                          </div>
                          <button 
                            className="w-8 h-8 flex items-center justify-center border border-[#8B5A2B] rounded-r-md text-[#8B5A2B] hover:bg-[#F0E6D6] transition-colors"
                            onClick={() => incrementQuantity(item.id, item.quantity)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 font-semibold text-[#8B5A2B] md:text-center">
                        <span className="md:hidden">Total: </span>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    className="text-[#8B5A2B] border-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
                
                {/* Order Summary */}
                <div className="mt-10 md:w-1/2 md:ml-auto">
                  <h2 className="text-xl font-['Playfair_Display'] font-bold text-[#8B5A2B] mb-4">
                    Order Summary
                  </h2>
                  <div className="bg-[#F9F5EB] p-6 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#4A3520]">Subtotal</span>
                      <span className="font-medium text-[#8B5A2B]">₹{subtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#4A3520]">Shipping</span>
                      <span className="font-medium text-[#8B5A2B]">
                        {shippingCharge === 0 ? 'Free' : `₹${shippingCharge.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-[#4A3520]">GST (5%)</span>
                      <span className="font-medium text-[#8B5A2B]">₹{gst.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4 bg-[#E0D6C6]" />
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold text-[#4A3520]">Total</span>
                      <span className="font-bold text-xl text-[#8B5A2B]">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#8B5A2B] hover:bg-[#6D4522] text-white py-3 mt-4"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" /> Proceed to Checkout
                        </span>
                      )}
                    </Button>
                    
                    <p className="text-sm text-[#4A3520] opacity-70 text-center mt-4">
                      Free shipping on orders above ₹500
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
