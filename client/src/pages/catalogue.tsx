import { Helmet } from "react-helmet";

// Replace public/catalogue.pdf to update the catalogue shown on this page.
const CATALOGUE_URL = "/catalogue.pdf";

// Mobile browsers either can't embed PDFs or only show the first page,
// so they get a button that opens the PDF in the browser's own viewer.
const canEmbedPdf = () => {
  if (typeof navigator === "undefined") return false;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPadOS
  return !isMobile && navigator.pdfViewerEnabled !== false;
};

const OpenCatalogueButton = () => (
  <div className="flex h-screen items-center justify-center p-6">
    <a href={CATALOGUE_URL} className="px-6 py-3 rounded-full bg-[#8B5A2B] text-white text-lg">
      Open Catalogue
    </a>
  </div>
);

const Catalogue = () => {
  return (
    <>
      <Helmet>
        <title>Crumb Haven Catalogue</title>
        <meta name="description" content="View the Crumb Haven B2B Cookie Catalogue." />
        <link rel="canonical" href="https://crumbhaven.in/catalogue" />
      </Helmet>

      {canEmbedPdf() ? (
        <object
          data={CATALOGUE_URL}
          type="application/pdf"
          className="fixed inset-0 block w-full h-full border-0"
        >
          <OpenCatalogueButton />
        </object>
      ) : (
        <OpenCatalogueButton />
      )}
    </>
  );
};

export default Catalogue;
