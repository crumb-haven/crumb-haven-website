import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      const emailSchema = z.string().email("Please enter a valid email address");
      emailSchema.parse(email);
    } catch (error) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await apiRequest('POST', '/api/newsletter', { email });
      const data = await res.json();
      
      toast({
        title: "Success!",
        description: "You've been successfully subscribed to our newsletter.",
        variant: "default"
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#8B5A2B] mb-4">Stay Updated</h2>
          <p className="text-[#4A3520] opacity-80 mb-8">
            Subscribe to our newsletter for new product announcements, special offers, and healthy recipes.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="py-3 px-4 rounded-md border-2 border-[#F0E6D6] focus:border-[#8B5A2B] focus:outline-none flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-sm text-[#4A3520] opacity-60 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
