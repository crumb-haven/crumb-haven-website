import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Download, ExternalLink } from "lucide-react";

// Replace public/catalogue.pdf to update the catalogue shown on this page.
const CATALOGUE_URL = "/catalogue.pdf";

const Catalogue = () => {
  // The SPA fallback serves index.html for missing files, so check the content type.
  const { data: available, isLoading } = useQuery<boolean>({
    queryKey: ["catalogue-pdf"],
    queryFn: async () => {
      const response = await fetch(CATALOGUE_URL, { method: "HEAD" });
      const type = response.headers.get("content-type") || "";
      return response.ok && type.includes("pdf");
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <Helmet>
        <title>Product Catalogue | Crumb Haven</title>
        <meta name="description" content="Browse the Crumb Haven product catalogue — healthy cookies made with pure desi ghee, zero preservatives and no trans fats. View online or download the PDF." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crumbhaven.in/catalogue" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#4A3520] mb-3">
            Our Catalogue
          </h1>
          <p className="text-[#4A3520] opacity-80 max-w-2xl mx-auto">
            Explore our full range of wholesome cookies. View it below or download a copy to share.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center">Loading catalogue...</div>
        ) : available ? (
          <>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <a
                href={CATALOGUE_URL}
                download="Crumb-Haven-Catalogue.pdf"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8B5A2B] text-white hover:bg-[#4A3520]"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
              <a
                href={CATALOGUE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white"
              >
                <ExternalLink className="h-4 w-4" /> Open in new tab
              </a>
            </div>

            <object
              data={CATALOGUE_URL}
              type="application/pdf"
              className="w-full h-[80vh] rounded-lg shadow-md border border-gray-200"
            >
              <div className="text-center py-12">
                Your browser can't display the catalogue here.{" "}
                <a href={CATALOGUE_URL} className="text-[#8B5A2B] underline">
                  Open the PDF
                </a>{" "}
                instead.
              </div>
            </object>
          </>
        ) : (
          <div className="text-center py-12 text-[#4A3520]">
            Our catalogue is coming soon. Please check back shortly.
          </div>
        )}
      </div>
    </>
  );
};

export default Catalogue;
