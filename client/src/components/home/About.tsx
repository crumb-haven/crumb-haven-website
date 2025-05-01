
import { motion } from "framer-motion";
import honeyOatsImage from "@assets/Honey Oats 2.png";

const features = [
  { icon: "fas fa-star", text: "Quality Ingredients" },
  { icon: "fas fa-heart", text: "Made with Love" },
  { icon: "fas fa-leaf", text: "Always Natural" },
  { icon: "fas fa-home", text: "Tastes Like Home" }
];

const About = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 * i, duration: 0.5 }
    })
  };

  return (
    <section id="about" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#8B5A2B] mb-4">
              Our Story
            </h2>
            <p className="text-[#4A3520] opacity-90 mb-6 leading-relaxed">
              At Crumb Haven, we believe indulgence should be as nourishing as it is delicious. Our cookies are crafted with Pure Desi Ghee, Zero Preservatives, and No Trans Fats, ensuring every bite delivers authentic flavour with clean, wholesome ingredients.
            </p>
            <p className="text-[#4A3520] opacity-90 mb-8 leading-relaxed">
              We replace processed additives with nature's best, striking the perfect balance between taste and well-being. Every cookie is a testament to our commitment—where tradition meets health, and flavour never takes a backseat.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  custom={index}
                  variants={featureVariants}
                  className="flex items-center space-x-2"
                >
                  <i className={`${feature.icon} text-[#7D9D74]`}></i>
                  <span className="text-[#4A3520]">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={honeyOatsImage}
              alt="Honey Oats Cookie"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
