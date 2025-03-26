import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Bestsellers from "@/components/home/Bestsellers";
import About from "@/components/home/About";
import Ingredients from "@/components/home/Ingredients";
import Lifestyle from "@/components/home/Lifestyle";
import Testimonials from "@/components/home/Testimonials";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import Newsletter from "@/components/home/Newsletter";
import Contact from "@/components/home/Contact";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Crumb Haven | Healthy & Delicious Cookies</title>
        <meta name="description" content="Indulge in healthy cookies crafted with Pure Desi Ghee, Zero Preservatives, and No Trans Fats. Where tradition meets wellness." />
      </Helmet>
      
      <Hero />
      <Features />
      <Bestsellers />
      <About />
      <Ingredients />
      <Lifestyle />
      <Testimonials />
      <FeaturedProduct />
      <Newsletter />
      <Contact />
    </>
  );
};

export default Home;
