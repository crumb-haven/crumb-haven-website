import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Bestsellers from "@/components/home/Bestsellers";
import About from "@/components/home/About";
import Lifestyle from "@/components/home/Lifestyle";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Contact from "@/components/home/Contact";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Crumb Haven | Pure Desi Ghee Cookies in Mumbai – No Preservatives, No Trans Fats</title>
        <meta name="description" content="Indulge in Crumb Haven's wholesome cookies made with Pure Desi Ghee, zero preservatives, and no trans fats. Enjoy authentic flavors with clean, nourishing ingredients. Order online for delivery in Mumbai." />
        <meta name="keywords" content="Pure Desi Ghee cookies, healthy cookies Mumbai, no preservatives cookies, no trans fat cookies, Crumb Haven bakery, online cookie delivery Mumbai" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crumbhaven.in/" />
      </Helmet>
      
      <Hero />
      <Features />
      <Bestsellers />
      <About />
      <Lifestyle />
      <Testimonials />
      <Newsletter />
      <Contact />
    </>
  );
};

export default Home;
