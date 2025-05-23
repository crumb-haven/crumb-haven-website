import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "100% Natural",
      description: "We use only natural ingredients with no artificial additives.",
      color: "bg-[#8B5A2B]"
    },
    {
      title: "Palm Oil Free",
      description: "We never use palm oil, only pure desi ghee for rich, authentic flavor.",
      color: "bg-[#8B5A2B]"
    },
    {
      title: "No Preservatives",
      description: "Our cookies are free from artificial preservatives for a truly natural treat.",
      color: "bg-[#8B5A2B]"
    },
    {
      title: "Trans Fat Free",
      description: "Zero trans fats in all our products for a healthier indulgence experience.",
      color: "bg-[#8B5A2B]"
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
            Why Crumb Haven?
          </h2>
          <p className="max-w-2xl mx-auto text-[#4A3520] opacity-80">
            We believe indulgence should be as nourishing as it is delicious. Our cookies strike the perfect balance between taste and well-being.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
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
