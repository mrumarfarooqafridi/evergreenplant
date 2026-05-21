import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ahmed Al-Mansoori",
    text: "Evergreen Nursery has the most beautiful plants and excellent customer service. My garden has never looked better!",
    rating: 5,
  },
  {
    name: "Fatima Al-Zahra",
    text: "I love shopping here. The plants are healthy and the delivery is always on time. Highly recommended!",
    rating: 5,
  },
  {
    name: "Mohammed Al-Rashid",
    text: "Great selection of plants and helpful staff. They helped me choose the perfect plants for my balcony.",
    rating: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-sm sm:text-2xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[10px] sm:text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our happy customers about their experience with Evergreen
            Nursery
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 mb-1.5 sm:mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={8}
                      className={`sm:hidden ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={12}
                      className={`hidden sm:block md:hidden ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className={`hidden md:block ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-2 sm:mb-4 md:mb-6 text-[6px] sm:text-xs md:text-sm leading-snug italic line-clamp-3 sm:line-clamp-none">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
              <div className="border-t pt-1.5 sm:pt-3 md:pt-4">
                <p className="font-bold text-gray-900 text-[8px] sm:text-xs md:text-base">
                  {testimonial.name}
                </p>
                <p className="text-[6px] sm:text-[10px] md:text-xs text-gray-500">
                  Happy Customer
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
