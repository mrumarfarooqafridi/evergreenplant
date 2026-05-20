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
    <section className="py-10 sm:py-16">
      <div className="container mx-auto px-5 sm:px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl sm:text-3xl font-bold text-center mb-6 sm:mb-12"
        >
          Shop by Category
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-4 gap-2 sm:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link href={`/products?category=${category.slug}`}>
                <div
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer group ${
                    category.slug === "indoor"
                      ? "hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)]"
                      : category.slug === "outdoor"
                        ? "hover:shadow-[0_8px_30px_rgba(251,191,36,0.3)]"
                        : category.slug === "succulents"
                          ? "hover:shadow-[0_8px_30px_rgba(168,85,247,0.3)]"
                          : "hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)]"
                  } transition-shadow duration-300`}
                >
                  <div className="p-3 sm:p-5 flex flex-col items-center justify-center text-center gap-2 sm:gap-3">
                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform ${
                        category.slug === "indoor"
                          ? "bg-gradient-to-br from-green-500 to-emerald-600"
                          : category.slug === "outdoor"
                            ? "bg-gradient-to-br from-amber-500 to-orange-600"
                            : category.slug === "succulents"
                              ? "bg-gradient-to-br from-purple-500 to-violet-600"
                              : "bg-gradient-to-br from-pink-500 to-rose-600"
                      }`}
                    >
                      <category.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="font-semibold text-[11px] sm:text-base text-gray-800 group-hover:text-primary transition-colors leading-tight">
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
