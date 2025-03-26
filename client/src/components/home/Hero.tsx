import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-[#F9F5EB] relative">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#8B5A2B] leading-tight">
              Indulgence <span className="text-[#D9B03D] italic">Never</span> Tasted So Healthy
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#4A3520] opacity-90">
              Cookies crafted with pure desi ghee, zero preservatives, and no trans fats – where tradition meets wellness.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <Check className="text-[#7D9D74] mt-1" />
                <p className="font-medium">Pure Desi Ghee Goodness – No Palm Oil</p>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-[#7D9D74] mt-1" />
                <p className="font-medium">Zero Trans Fat & No Preservatives</p>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-[#7D9D74] mt-1" />
                <p className="font-medium">Wholesome Ingredients – Almonds, oats, honey, Kodo millet</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-[#8B5A2B] hover:bg-[#6D4522] text-white">
                  Shop Now
                </Button>
              </Link>
              <a href="#about">
                <Button variant="outline" className="w-full sm:w-auto border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white">
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1629324482344-58ac79e27737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Assorted cookies on a wooden tray" 
              className="rounded-lg shadow-lg w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              width="600" 
              height="400"
            />
            <motion.div 
              className="absolute -top-4 -right-4 bg-[#F2C94C] rounded-full w-24 h-24 flex items-center justify-center transform rotate-12 shadow-md"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="font-['Caveat'] text-center text-[#4A3520] font-semibold text-lg leading-tight">100% Guilt Free</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
