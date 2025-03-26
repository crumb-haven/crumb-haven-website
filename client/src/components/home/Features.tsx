import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: "fas fa-seedling",
      title: "Natural Ingredients",
      description: "Only premium ingredients like almonds, oats, honey, and Kodo millet - never any artificial additives.",
      color: "bg-[#9BBC91]"
    },
    {
      icon: "fas fa-oil-can",
      title: "Pure Desi Ghee",
      description: "Crafted with authentic desi ghee for rich flavor - we never use palm oil or hydrogenated fats.",
      color: "bg-[#F2C94C]"
    },
    {
      icon: "fas fa-heart",
      title: "Health Conscious",
      description: "Zero trans fat, no preservatives, and many options with no refined sugar or maida.",
      color: "bg-[#A87C4F]"
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
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
            Why Choose Crumb Haven?
          </h2>
          <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
            We believe indulgence should be as nourishing as it is delicious. Our cookies strike the perfect balance between taste and well-being.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-[#F9F5EB] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              variants={itemVariants}
            >
              <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#8B5A2B] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#4A3520] opacity-80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
