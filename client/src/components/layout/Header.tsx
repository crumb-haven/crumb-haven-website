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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

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