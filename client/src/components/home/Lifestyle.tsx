import { motion } from "framer-motion";

const Lifestyle = () => {
  const usageIdeas = [
    {
      icon: "fas fa-mug-hot",
      title: "Perfect with Tea or Coffee",
      description: "The rich flavors complement your morning brew perfectly."
    },
    {
      icon: "fas fa-hiking",
      title: "On-the-Go Energy",
      description: "Nutrient-dense cookies provide sustained energy for busy days."
    },
    {
      icon: "fas fa-gift",
      title: "Thoughtful Gift",
      description: "Share the goodness with loved ones on special occasions."
    }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">Perfect Pairings</p>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#8B5A2B] mb-4">
              Enjoy Life's Simple Moments
            </h2>
            <p className="text-[#4A3520] opacity-90 mb-6 leading-relaxed">
              Our cookies are designed to complement your favorite moments - from morning tea to afternoon breaks. The perfect balance of indulgence and nutrition means you can enjoy them anytime, anywhere.
            </p>
            <motion.div 
              className="space-y-4"
              variants={listVariants}
            >
              {usageIdeas.map((idea, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start space-x-3"
                  variants={listItemVariants}
                >
                  <i className={`${idea.icon} text-[#D9B03D] text-xl mt-1`}></i>
                  <div>
                    <h3 className="font-medium text-[#8B5A2B] text-lg">{idea.title}</h3>
                    <p className="text-[#4A3520] opacity-80">
                      {idea.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <img 
              src="https://images.unsplash.com/photo-1609201372208-a65e80ff6b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Enjoying cookies with tea" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
              width="600" 
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
