"use client";

import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
    </div>
  );
}
