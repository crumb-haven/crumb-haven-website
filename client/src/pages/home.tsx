import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

const Bestsellers = lazy(() => import("@/components/home/Bestsellers"));
const About = lazy(() => import("@/components/home/About"));
const Lifestyle = lazy(() => import("@/components/home/Lifestyle"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const Newsletter = lazy(() => import("@/components/home/Newsletter"));
const Contact = lazy(() => import("@/components/home/Contact"));

const DeferredSections = () => (
  <Suspense fallback={null}>
    <Bestsellers />
    <About />
    <Lifestyle />
    <Testimonials />
    <Newsletter />
    <Contact />
  </Suspense>
);

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
      <DeferredSections />
    </>
  );
};

export default Home;
