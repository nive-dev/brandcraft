import { motion } from "framer-motion";
import {
  Megaphone, Search, Palette, BookOpen, Globe, Share2, TrendingUp
} from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
import ElectricCard from "@/components/ElectricCard";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Comprehensive campaigns designed to attract, engage, and convert your ideal customers."
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Rank higher on Google, increase organic traffic, and generate consistent leads."
  },
  {
    icon: Palette,
    title: "Brand Strategy",
    desc: "Build a powerful brand identity that connects emotionally and stands out."
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines",
    desc: "Maintain consistency across all platforms with clear and professional brand systems."
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "High-converting, fast, and responsive websites built to generate leads."
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Grow your audience and engagement with strategic content and campaigns."
  },
  {
    icon: Megaphone,
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Generate high-quality leads with targeted ad campaigns optimized for ROI.",
    popular: true
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Data-driven paid campaigns that maximize ROI and scale your business."
  },
];

const Services = () => (
  <main>
    
    {/* HERO */}
    <section className="relative pt-32 pb-20 overflow-hidden">
      <HeroBackground />
      <div className="container relative z-10 mx-auto px-6 text-center">
        
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-medium tracking-widest uppercase text-primary"
        >
          What We Offer
        </motion.span>

        <motion.h1
          className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Services That <span className="text-gradient-gold">Drive Real Growth</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          We don’t just provide services — we deliver measurable results that grow your business.
        </motion.p>

        {/* TRUST LINE */}
        <p className="text-xs text-muted-foreground mt-4">
          Trusted by growing brands • ROI-focused strategies • Proven results
        </p>
      </div>
    </section>

    {/* SERVICES GRID */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {services.map((s, i) => (
            <div key={s.title} className="relative">

              {/* POPULAR BADGE */}
              {s.popular && (
                <span className="absolute top-3 right-3 text-xs bg-primary text-white px-2 py-1 rounded-full z-10">
                  Popular
                </span>
              )}

              <ElectricCard
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                index={i}
              />

              {/* CTA BUTTON */}
              <div className="mt-4 text-center">
                <a
                  href="https://wa.me/919566432818?text=Hi%20I%20am%20interested%20in%20your%20services"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Get Free Consultation →
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>

    {/* FINAL CTA SECTION */}
    <section className="py-20 text-center">
      <div className="container mx-auto px-6">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Grow Your Business? 🚀
        </h2>

        <p className="text-muted-foreground mb-8">
          Let’s discuss how we can help you generate more leads and scale faster.
        </p>

        <a
          href="https://wa.me/919566432818?text=Hi%20I%20want%20a%20free%20consultation"
          className="inline-block px-8 py-4 rounded-xl bg-green-500 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Free Consultation on WhatsApp
        </a>
      </div>
    </section>

  </main>
);

export default Services;