import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#8B5A2B] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Crumb Haven</h3>
            <p className="opacity-80 mb-4">
              Indulgence never tasted so healthy. Our cookies are crafted with pure desi ghee, zero preservatives, and no trans fats.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white opacity-80 hover:opacity-100">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="opacity-80 hover:opacity-100">Home</Link></li>
              <li><Link href="/products" className="opacity-80 hover:opacity-100">Our Cookies</Link></li>
              <li><a href="/#about" className="opacity-80 hover:opacity-100">About Us</a></li>
              <li><a href="/#ingredients" className="opacity-80 hover:opacity-100">Ingredients</a></li>
              <li><a href="/#contact" className="opacity-80 hover:opacity-100">Contact</a></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/product/almond-oat-cookies" className="opacity-80 hover:opacity-100">Almond Oat Cookies</Link></li>
              <li><Link href="/product/chocochip-brownie-cookies" className="opacity-80 hover:opacity-100">Chocochip Brownie Cookies</Link></li>
              <li><Link href="/product/kodo-millet-cookies" className="opacity-80 hover:opacity-100">Kodo Millet Cookies</Link></li>
              <li><Link href="/product/honey-oat-cookies" className="opacity-80 hover:opacity-100">Honey Oat Cookies</Link></li>
              <li><Link href="/products" className="opacity-80 hover:opacity-100">Gift Packs</Link></li>
            </ul>
          </div>
          
          {/* Policies */}
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100">Privacy Policy</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Terms of Service</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Shipping Policy</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Return & Refund</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6">
          <p className="text-center opacity-70 text-sm">
            &copy; {new Date().getFullYear()} Crumb Haven. All rights reserved. Made with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
