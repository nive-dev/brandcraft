import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Megaphone, Search, Palette, Globe, TrendingUp, Share2, ArrowRight,
  Sparkles, Shield, Zap, Users, BookOpen
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ElectricCard from "@/components/ElectricCard";

const Hero3DScene = lazy(() => import("@/components/Hero3D/Scene"));
const services = [
  { icon: Megaphone, title: "Digital Marketing", desc: "Comprehensive digital campaigns across multiple channels to reach your target audience effectively and drive measurable business growth." },
  { icon: Search, title: "SEO Optimization", desc: "Advanced search engine optimization strategies that boost your visibility, organic traffic, and search rankings on Google and beyond." },
  { icon: Palette, title: "Brand Strategy", desc: "Strategic brand positioning and identity development that differentiates you from competitors and creates emotional connections." },
  { icon: BookOpen, title: "Brand Guidelines", desc: "Detailed brand guideline documents ensuring consistency across all touchpoints, from typography to tone of voice." },
  { icon: Globe, title: "Web Development", desc: "Custom, responsive, and high-performance websites designed to convert visitors into customers with stunning user experiences." },
  { icon: Share2, title: "Social Media Marketing", desc: "Engaging social media strategies that build community, drive engagement, and amplify your brand voice across all platforms." },
  { icon: TrendingUp, title: "Performance Marketing", desc: "ROI-focused paid advertising campaigns on Google, Meta, and beyond, optimized for maximum conversion and minimum cost." },
  {
  icon: Megaphone,
  title: "Meta Ads (Facebook & Instagram)",
  desc: "High-converting Meta Ads campaigns on Facebook and Instagram designed to generate leads, increase sales, and maximize ROI with precise audience targeting and creative optimization."
},
];

const trustItems = [
  { icon: Sparkles, label: "50+ Projects Delivered" },
  { icon: Users, label: "30+ Happy Clients" },
  { icon: Shield, label: "100% Satisfaction" },
  { icon: Zap, label: "Lightning Fast Results" },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* 3D Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <Hero3DScene />
        </Suspense>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80 z-[1]" />

        <div className="container relative z-10 mx-auto px-6 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary tracking-widest uppercase mb-8">
              Digital Marketing Agency
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          >
            Crafting Powerful
            <br />
            <span className="text-gradient-gold">Digital Brands</span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1, ease: "easeOut" }}
          >
            Digital Marketing • SEO • Web Development • Brand Strategy
          </motion.p>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto text-sm mb-10 opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.3, ease: "easeOut" }}
          >
            We blend creativity, data, and strategy to build brands that stand out and scale fast.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsla(43, 56%, 54%, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl gradient-gold-bg text-primary-foreground font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsla(43, 56%, 54%, 0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl glass font-semibold text-sm tracking-wide hover-glow"
              >
                View Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <span className="text-xs font-medium tracking-widest uppercase text-primary">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-4">
              Our <span className="text-gradient-gold">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              End-to-end digital solutions crafted to elevate your brand and accelerate growth.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ElectricCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 border-t border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustItems.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.1} className="text-center">
                <item.icon size={28} className="text-primary mx-auto mb-3" />
                <p className="font-display font-semibold text-foreground">{item.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <AnimatedSection className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to <span className="text-gradient-gold">Elevate</span> Your Brand?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's create something extraordinary together. Get in touch today.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl gradient-gold-bg text-primary-foreground font-semibold text-sm shadow-lg"
              >
                Start Your Project
              </motion.button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
};

export default Index;
