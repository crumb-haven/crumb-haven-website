import { motion } from "framer-motion";

const About = () => {
  const features = [
    { icon: "fas fa-certificate", text: "Quality Ingredients" },
    { icon: "fas fa-heart", text: "Made with Love" },
    { icon: "fas fa-leaf", text: "Always Natural" },
    { icon: "fas fa-home", text: "Tastes Like Home" }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const featureVariants = {
    hidden: { opacity: 0 },
    visible: transition => ({
      opacity: 1,
      transition: { delay: 0.4 + transition * 0.1 }
    })
  };

  return (
    <section id="about" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <img 
              src="https://images.unsplash.com/photo-1556912173-3bb406ef7e97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Baking cookies with natural ingredients" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
              width="600" 
              height="400"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <p className="font-['Caveat'] text-xl text-[#7D9D74] mb-2">Our Story</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
              Where Tradition Meets Wellness
            </h2>
            <p className="text-[#4A3520] opacity-90 mb-4 leading-relaxed">
              At Crumb Haven, we believe indulgence should be as nourishing as it is delicious. Our cookies are crafted with Pure Desi Ghee, Zero Preservatives, and No Trans Fats, ensuring every bite delivers authentic flavour with clean, wholesome ingredients.
            </p>
            <p className="text-[#4A3520] opacity-90 mb-4 leading-relaxed">
              We replace processed additives with nature's best, striking the perfect balance between taste and well-being. Every cookie is a testament to our commitment—where tradition meets health, and flavour never takes a backseat.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={featureVariants}
                  className="bg-[#F9F5EB] p-4 rounded-md flex items-center"
                >
                  <i className={`${feature.icon} text-[#D9B03D] text-2xl mr-3`}></i>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
