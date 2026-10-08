import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Catalogue = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

      <div className="w-screen h-screen overflow-hidden bg-white">
        {isMobile ? (
          <div className="flex h-full w-full items-center justify-center">
            <a
              href="/catalogue.pdf"
              className="inline-flex items-center justify-center rounded-lg bg-amber-900 px-8 py-4 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-amber-950"
            >
              Open Catalogue
            </a>
          </div>
        ) : (
          <iframe
            src="/catalogue.pdf"
            className="block h-full w-full border-0"
            title="Crumb Haven Catalogue"
          />
        )}
      </div>
    </>
  );
};

export default Catalogue;
