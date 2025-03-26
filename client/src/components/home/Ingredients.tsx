import { motion } from "framer-motion";

const Ingredients = () => {
  const ingredients = [
    {
      name: "Pure Desi Ghee",
      description: "We use only authentic desi ghee, never palm oil, for rich flavor and wholesome goodness.",
      image: "https://images.unsplash.com/photo-1600184461441-5d128306cf7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Premium Almonds",
      description: "Our cookies contain high-quality almonds, adding protein, healthy fats, and delicious crunch.",
      image: "https://images.unsplash.com/photo-1621855673823-d53b773773d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Whole Grain Oats",
      description: "Nutrient-rich oats provide fiber and complex carbohydrates for sustained energy.",
      image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Kodo Millet",
      description: "This ancient grain is gluten-free and packed with protein, fiber, and essential nutrients.",
      image: "https://images.unsplash.com/photo-1596360819641-84d2af6fa1cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="ingredients" className="bg-[#F9F5EB] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">The Crumb Haven Difference</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
            Premium Ingredients
          </h2>
          <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
            We carefully select each ingredient to ensure authentic flavor and superior nutrition in every cookie.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={itemVariants}
            >
              <img 
                src={ingredient.image} 
                alt={ingredient.name} 
                className="w-32 h-32 object-cover mx-auto rounded-full mb-4 border-4 border-[#F2C94C]"
                width="128" 
                height="128"
              />
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#8B5A2B] mb-2">
                {ingredient.name}
              </h3>
              <p className="text-[#4A3520] opacity-80">
                {ingredient.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Ingredients;
