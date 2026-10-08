import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Catalogue = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile based on screen size and user agent
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth < 1024;
      const isMobileUserAgent = /Mobile|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileScreen || isMobileUserAgent);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Helmet>
        <title>Crumb Haven Catalogue</title>
        <meta
          name="description"
          content="View the Crumb Haven B2B Cookie Catalogue."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crumbhaven.in/catalogue" />
      </Helmet>

      <div className="w-full h-screen bg-white overflow-hidden">
        {isMobile ? (
          // Mobile: Show "Open Catalogue" button
          <div className="flex items-center justify-center w-full h-full">
            <a
              href="/catalogue.pdf"
              download
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-950 transition-colors duration-200 shadow-lg"
            >
              Open Catalogue
            </a>
          </div>
        ) : (
          // Desktop: Embed PDF directly
          <iframe
            src="/catalogue.pdf"
            className="w-full h-full border-none"
            title="Crumb Haven Catalogue"
          />
        )}
      </div>
    </>
  );
};

export default Catalogue;
