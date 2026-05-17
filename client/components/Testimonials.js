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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-5 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our happy customers about their experience with Evergreen
            Nursery
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-3 gap-2 sm:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-3 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex gap-0.5 mb-2 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-3 sm:mb-6 text-[11px] sm:text-sm md:text-base leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="border-t pt-2 sm:pt-4">
                <p className="font-bold text-gray-900 text-xs sm:text-base">
                  {testimonial.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Happy Customer</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
