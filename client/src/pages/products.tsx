import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/product-card";
import { Product } from "@shared/schema";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('/data/products.json');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const categories = [
    { id: null, name: "All" },
    { id: "healthy", name: "Healthy" },
    { id: "indulgent", name: "Indulgent" },
    { id: "gluten-free", name: "Gluten-Free" }
  ];

  const filteredProducts = activeCategory
    ? products?.filter(product => product.category === activeCategory)
    : products;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Error loading products. Please try again later.
          {process.env.NODE_ENV === 'development' && (
            <div className="text-sm mt-2">{(error as Error).message}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Pure Desi Ghee Cookies in Mumbai | No Preservatives, Healthy Indulgence | Crumb Haven</title>
        <meta name="description" content="Explore Crumb Haven's range of healthy cookies in Mumbai made with pure desi ghee, zero preservatives, and no trans fats. We offer Almond Oat, Honey Oat, Kodo Millet and more wholesome varieties. Order online for delivery across Mumbai." />
        <meta name="keywords" content="Pure Desi Ghee cookies Mumbai, healthy cookies online, no preservatives cookies, no palm oil cookies, gluten-free cookies Mumbai, whole grain cookies" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crumbhaven.in/products" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            "itemListElement": products?.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.shortDescription,
                "url": `https://crumbhaven.in/products/${product.slug}`,
                "brand": {
                  "@type": "Brand",
                  "name": "Crumb Haven"
                }
              }
            })) || []
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id || 'all'}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts?.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Products;