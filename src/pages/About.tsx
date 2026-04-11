import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Target, Eye, Award, Clock, Lightbulb, HeartHandshake } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroBackground from "@/components/HeroBackground";

const whyUs = [
  { icon: Award, title: "Expert Team", desc: "Seasoned professionals with deep industry expertise." },
  { icon: Lightbulb, title: "Creative Approach", desc: "Innovative solutions tailored to your unique brand." },
  { icon: Clock, title: "Timely Delivery", desc: "We respect deadlines without compromising quality." },
  { icon: HeartHandshake, title: "Client First", desc: "Your success is our top priority, always." },
];

/* TYPEWRITER TAGLINE */
const TypewriterTagline = () => {
  const text1Full = "Think Different. ";
  const text2Full = "Market Better.";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    let i = 0;

    const interval1 = setInterval(() => {
      setText1(text1Full.slice(0, i + 1));
      i++;

      if (i === text1Full.length) {
        clearInterval(interval1);

        let j = 0;
        const interval2 = setInterval(() => {
          setText2(text2Full.slice(0, j + 1));
          j++;
          if (j === text2Full.length) clearInterval(interval2);
        }, 60);
      }
    }, 60);

    return () => clearInterval(interval1);
  }, []);

  return (
    <p
      style={{
        marginTop: "24px",
        fontSize: "22px",
        fontWeight: 600,
        textAlign: "center",
        fontFamily: "'Playfair Display', serif",
        letterSpacing: "0.5px",
      }}
    >
      <span className="text-gradient-gold">{text1}</span>
      <span className="text-gradient-gold">{text2}</span>

      <span
        style={{
          marginLeft: "2px",
          animation: "blink 1s infinite",
        }}
      >
        |
      </span>

      <style>
        {`
          @keyframes blink {
            0%,50%,100% { opacity: 1; }
            25%,75% { opacity: 0; }
          }
        `}
      </style>
    </p>
  );
};

const About = () => (
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
          About Us
        </motion.span>

        <motion.h1
          className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          We Are <span className="text-gradient-gold">BrandCraft Media</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Brandcraft Media is a creative digital agency focused on building strong brands, 
          powerful online presence, and result-driven marketing solutions. We help businesses grow 
          through smart digital marketing, social media strategies, creative advertising, and modern web development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <TypewriterTagline />
        </motion.div>
      </div>
    </section>

    {/* ABOUT DESCRIPTION */}
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <p className="text-muted-foreground max-w-4xl mx-auto text-center leading-relaxed text-lg">
            At Brandcraft Media, we believe every business has the power to stand out when it is presented in the right way. 
            Our goal is not just to create designs or websites, but to build a brand image that attracts attention, earns trust, 
            and drives real business growth.
            <br /><br />
            We combine creativity, strategy, and technology to deliver solutions that are modern, effective, and tailored to each client’s goals. 
            From startups to growing businesses, we work to turn ideas into strong digital brands.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* MISSION & VISION */}
    <section className="py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">

        <AnimatedSection>
          <div className="glass rounded-2xl p-8 h-full hover-glow">
            <div className="w-12 h-12 rounded-xl gradient-gold-bg flex items-center justify-center mb-4">
              <Target size={22} className="text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to provide creative, strategic, and result-oriented digital services that help businesses grow with confidence.
              <br /><br />
              We are committed to:
              <br />• Building strong and professional brand presence  
              <br />• Creating effective marketing strategies  
              <br />• Delivering high-quality web development solutions  
              <br />• Helping clients reach more people and grow successfully
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="glass rounded-2xl p-8 h-full hover-glow">
            <div className="w-12 h-12 rounded-xl gradient-gold-bg flex items-center justify-center mb-4">
              <Eye size={22} className="text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our vision is to become a trusted creative and digital growth partner for businesses by building brands that are modern, 
              memorable, and impactful.
              <br /><br />
              We aim to help businesses succeed in the digital world through innovative marketing, strong brand identity, 
              and high-quality web solutions that create long-term value.
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>

    {/* WHY US */}
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-medium tracking-widest uppercase text-primary">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            Why Choose <span className="text-gradient-gold">BrandCraft</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 text-center hover-glow transition-all"
              >
                <div className="w-14 h-14 rounded-full gradient-gold-bg flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

  </main>
);

export default About;