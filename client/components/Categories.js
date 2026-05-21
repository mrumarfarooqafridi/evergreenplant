import Link from "next/link";
import { motion } from "framer-motion";
import { Flower2, Home, Sprout, Sun } from "lucide-react";

const categories = [
  { name: "Indoor", slug: "indoor", Icon: Home },
  { name: "Outdoor", slug: "outdoor", Icon: Sun },
  { name: "Succulents", slug: "succulents", Icon: Sprout },
  { name: "Flowering", slug: "flowering", Icon: Flower2 },
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
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-[10px] sm:text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated plant collections perfect for every space
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link href={`/products?category=${category.slug}`}>
                <div
                  className={`bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                    category.slug === "indoor"
                      ? "hover:shadow-[0_20px_60px_rgba(34,197,94,0.25)] hover:border-green-200"
                      : category.slug === "outdoor"
                        ? "hover:shadow-[0_20px_60px_rgba(251,191,36,0.25)] hover:border-amber-200"
                        : category.slug === "succulents"
                          ? "hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)] hover:border-purple-200"
                          : "hover:shadow-[0_20px_60px_rgba(236,72,153,0.25)] hover:border-pink-200"
                  }`}
                >
                  {/* Gradient Background Overlay */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                      category.slug === "indoor"
                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                        : category.slug === "outdoor"
                          ? "bg-gradient-to-br from-amber-500 to-orange-600"
                          : category.slug === "succulents"
                            ? "bg-gradient-to-br from-purple-500 to-violet-600"
                            : "bg-gradient-to-br from-pink-500 to-rose-600"
                    }`}
                  />

                  <div className="p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center gap-2 sm:gap-3 relative z-10">
                    <div
                      className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
                        category.slug === "indoor"
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-200"
                          : category.slug === "outdoor"
                            ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-200"
                            : category.slug === "succulents"
                              ? "bg-gradient-to-br from-purple-500 to-violet-600 shadow-purple-200"
                              : "bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-200"
                      }`}
                    >
                      <category.Icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    <h3 className="font-semibold text-[10px] sm:text-sm md:text-base text-gray-800 group-hover:text-primary transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <span className="text-[8px] sm:text-xs md:text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      {category.slug === "indoor" && "Perfect for homes"}
                      {category.slug === "outdoor" && "Garden favorites"}
                      {category.slug === "succulents" && "Easy care plants"}
                      {category.slug === "flowering" && "Beautiful blooms"}
                    </span>
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
