import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''} bg-white`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/assets/images/Crumb Haven-Logo JPG.jpg" 
              alt="Crumb Haven Logo" 
              className="h-12 mr-2" 
            />
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <i className="fas fa-bars text-[#8B5A2B] text-2xl"></i>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Home
            </Link>
            <Link href="/products" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Our Cookies
            </Link>
            <a href="/#about" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              About Us
            </a>
            <a href="/#ingredients" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Ingredients
            </a>
            <a href="/#contact" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Contact
            </a>
            <a href="/#contact">
              <Button variant="default" className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white">
                Get in Touch
              </Button>
            </a>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} mt-4 pb-4 md:hidden`}>
          <div className="flex flex-col space-y-3">
            <Link href="/" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Home
            </Link>
            <Link href="/products" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Our Cookies
            </Link>
            <a href="/#about" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              About Us
            </a>
            <a href="/#ingredients" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Ingredients
            </a>
            <a href="/#contact" className="font-['Lato'] text-[#8B5A2B] hover:text-[#6D4522] font-medium">
              Contact
            </a>
            <a href="/#contact">
              <Button variant="default" className="bg-[#8B5A2B] hover:bg-[#6D4522] text-white w-full justify-center">
                Get in Touch
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import { Link } from "wouter";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img src="/assets/brand-logo.png" alt="Crumb Haven" className="h-16" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-[#4A3520] hover:text-[#8B5A2B]">Home</Link>
            <Link href="/products" className="text-[#4A3520] hover:text-[#8B5A2B]">Our Cookies</Link>
            <a href="/#about" className="text-[#4A3520] hover:text-[#8B5A2B]">About Us</a>
            <a href="/#contact" className="text-[#4A3520] hover:text-[#8B5A2B]">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
