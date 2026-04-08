// =============================================================
// Home Page — app/page.js
//
// Single-page assembly. Imports all section components in order.
// This file is a Server Component — client interactivity lives
// inside each individual component with "use client".
// =============================================================

import Navbar       from "@/components/Navbar";
import Hero         from "@/components/Hero";
import Services     from "@/components/Services";
import About        from "@/components/About";
import Industries   from "@/components/Industries";
import WhyChooseUs  from "@/components/WhyChooseUs";
import Brands       from "@/components/Brands";
import Contact      from "@/components/Contact";
import Footer       from "@/components/Footer";

export default function Home() {
  return (
    // overflow-x-hidden prevents glow blobs or animated elements from
    // causing a horizontal scrollbar on narrow viewports
    <main className="relative overflow-x-hidden bg-black">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Industries />
      <WhyChooseUs />
      <Brands />
      <Contact />
      <Footer />
    </main>
  );
}
