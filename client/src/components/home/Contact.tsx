import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const res = await apiRequest('POST', '/api/contact', data);
      const responseData = await res.json();
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default"
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Message not sent",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F9F5EB] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">Get In Touch</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
            Contact Us
          </h2>
          <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
            We'd love to hear from you! Reach out with questions, feedback, or wholesale inquiries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4A3520] font-medium">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="py-3 px-4 rounded-md border-2 border-[#F0E6D6] focus:border-[#8B5A2B] focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#4A3520] font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            {...field} 
                            className="py-3 px-4 rounded-md border-2 border-[#F0E6D6] focus:border-[#8B5A2B] focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#4A3520] font-medium">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="How can we help you?" 
                          {...field} 
                          className="py-3 px-4 rounded-md border-2 border-[#F0E6D6] focus:border-[#8B5A2B] focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#4A3520] font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..." 
                          {...field} 
                          rows={5}
                          className="py-3 px-4 rounded-md border-2 border-[#F0E6D6] focus:border-[#8B5A2B] focus:outline-none resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white py-3 px-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#8B5A2B] mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-[#7D9D74] mt-1 mr-4 w-5"></i>
                  <p>123 Cookie Lane, Bakers District<br/>Mumbai, Maharashtra 400001</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone-alt text-[#7D9D74] mr-4 w-5"></i>
                  <p>+91 98765 43210</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-[#7D9D74] mr-4 w-5"></i>
                  <p>hello@crumbhaven.com</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-[#7D9D74] mr-4 w-5"></i>
                  <p>Monday-Friday: 9am-6pm<br/>Saturday: 10am-4pm</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#8B5A2B] mb-4">
                Follow Us
              </h3>
              <p className="mb-4">Stay connected with us on social media for updates, special offers, and behind-the-scenes content.</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-[#F9F5EB] w-10 h-10 rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-[#F9F5EB] w-10 h-10 rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-[#F9F5EB] w-10 h-10 rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-[#F9F5EB] w-10 h-10 rounded-full flex items-center justify-center text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
