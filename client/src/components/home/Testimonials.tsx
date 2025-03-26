import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Testimonial } from "@shared/schema";

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section className="bg-[#8B5A2B] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-['Caveat'] text-xl text-[#F2C94C] mb-2">What Our Customers Say</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-20 bg-slate-200 rounded w-full mb-4"></div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#8B5A2B] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <p>Error loading testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="text-[#F2C94C]">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
      </div>
    );
  };

  return (
    <section className="bg-[#8B5A2B] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-['Caveat'] text-xl text-[#F2C94C] mb-2">What Our Customers Say</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">Testimonials</h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials?.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="italic text-[#4A3520] mb-4">
                "{testimonial.review}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#F0E6D6] rounded-full flex items-center justify-center mr-3">
                  <span className="font-medium text-[#8B5A2B]">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-[#4A3520] opacity-70">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
