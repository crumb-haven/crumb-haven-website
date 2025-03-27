import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";

const Contact = () => {
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
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-[#F9F5EB] rounded-lg">
                <Phone className="text-[#7D9D74] h-6 w-6" />
                <div>
                  <h4 className="font-medium text-[#8B5A2B]">Phone/WhatsApp</h4>
                  <a href="tel:+917021330300" className="text-[#4A3520] hover:text-[#8B5A2B] transition-colors">
                    +91 7021330300
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-[#F9F5EB] rounded-lg">
                <Mail className="text-[#7D9D74] h-6 w-6" />
                <div>
                  <h4 className="font-medium text-[#8B5A2B]">Email</h4>
                  <a href="mailto:crumb.haven.official@gmail.com" className="text-[#4A3520] hover:text-[#8B5A2B] transition-colors">
                    crumb.haven.official@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-[#F9F5EB] rounded-lg">
                <Instagram className="text-[#7D9D74] h-6 w-6" />
                <div>
                  <h4 className="font-medium text-[#8B5A2B]">Instagram</h4>
                  <a 
                    href="https://www.instagram.com/crumb__haven/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4A3520] hover:text-[#8B5A2B] transition-colors"
                  >
                    @crumb__haven
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#8B5A2B] mb-4">
                Follow Us for Updates
              </h3>
              <p className="mb-6 text-[#4A3520]">
                Stay connected with us on Instagram for new product announcements, 
                special offers, and behind-the-scenes content about our cookie-making process.
              </p>
              <a 
                href="https://www.instagram.com/crumb__haven/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#8B5A2B] hover:bg-[#6D4522] text-white py-3 px-6 rounded-md transition-colors font-medium"
              >
                Visit Our Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;