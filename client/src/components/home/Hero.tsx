
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import almondOatImage from "@assets/Almond Oat Lifestyle.png";

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
              Our Story
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[#4A3520] opacity-90">
              At Crumb Haven, we believe indulgence should be as nourishing as it is delicious. Our cookies are crafted with Pure Desi Ghee, Zero Preservatives, and No Trans Fats, ensuring every bite delivers authentic flavour with clean, wholesome ingredients.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-[#8B5A2B] hover:bg-[#6D4522] text-white">
                  View Our Products
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
              src={almondOatImage} 
              alt="Crumb Haven Almond Oat Cookies made with Pure Desi Ghee, no maida, and no preservatives" 
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
