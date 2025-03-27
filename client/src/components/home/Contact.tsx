import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#F9F5EB] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">Get In Touch</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
            Contact Us
          </h2>
        </div>
        
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <div className="flex justify-center gap-8 py-4">
              <a 
                href="https://www.instagram.com/crumb__haven/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                aria-label="Instagram"
              >
                <div className="bg-[#F9F5EB] p-4 rounded-full transition-all group-hover:bg-[#7D9D74]/20">
                  <Instagram className="text-[#8B5A2B] h-7 w-7 transition-all group-hover:text-[#7D9D74]" />
                </div>
              </a>
              
              <a 
                href="https://wa.me/917021330300" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                aria-label="WhatsApp"
              >
                <div className="bg-[#F9F5EB] p-4 rounded-full transition-all group-hover:bg-[#7D9D74]/20">
                  <Phone className="text-[#8B5A2B] h-7 w-7 transition-all group-hover:text-[#7D9D74]" />
                </div>
              </a>
              
              <a 
                href="mailto:crumb.haven.official@gmail.com" 
                className="group"
                aria-label="Email"
              >
                <div className="bg-[#F9F5EB] p-4 rounded-full transition-all group-hover:bg-[#7D9D74]/20">
                  <Mail className="text-[#8B5A2B] h-7 w-7 transition-all group-hover:text-[#7D9D74]" />
                </div>
              </a>
            </div>
            
            <p className="mt-6 text-[#4A3520] text-sm">
              Follow us on Instagram <span className="font-medium">@crumb__haven</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;