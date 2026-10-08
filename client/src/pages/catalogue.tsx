import { Helmet } from "react-helmet";

// Replace public/catalogue.pdf to update the catalogue shown on this page.
const CATALOGUE_URL = "/catalogue.pdf";

const Catalogue = () => {
  return (
    <>
      <Helmet>
        <title>Product Catalogue | Crumb Haven</title>
        <meta name="description" content="Browse the Crumb Haven product catalogue — healthy cookies made with pure desi ghee, zero preservatives and no trans fats." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crumbhaven.in/catalogue" />
      </Helmet>

      <object
        data={CATALOGUE_URL}
        type="application/pdf"
        className="block w-screen h-screen"
      >
        {/* Shown by browsers that can't display PDFs inline (e.g. many mobile browsers) */}
        <div className="flex h-screen items-center justify-center p-6 text-center text-[#4A3520]">
          <a href={CATALOGUE_URL} className="px-5 py-3 rounded-full bg-[#8B5A2B] text-white">
            View the Crumb Haven catalogue (PDF)
          </a>
        </div>
      </object>
    </>
  );
};

export default Catalogue;
