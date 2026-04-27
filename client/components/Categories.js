import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { name: "Indoor Plants", image: "/indoor.jpg", slug: "indoor" },
  { name: "Outdoor Plants", image: "/outdoor.jpg", slug: "outdoor" },
  { name: "Succulents", image: "/succulents.jpg", slug: "succulents" },
  { name: "Flowering Plants", image: "/flowering.jpg", slug: "flowering" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Categories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Shop by Category
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link href={`/products?category=${category.slug}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="h-32 bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-semibold text-sm text-center px-2">
                      {category.name}
                    </span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
