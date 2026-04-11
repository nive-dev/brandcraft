import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface ElectricCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}

const ElectricCard = ({ icon: Icon, title, desc, index }: ElectricCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Electric border container */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        {/* Rotating gradient border */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent, transparent, hsl(var(--primary)), transparent)`,
            animation: hovered
              ? "electric-spin 1.5s linear infinite"
              : "electric-spin 4s linear infinite",
          }}
        />
        {/* Secondary pulse layer */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `conic-gradient(from 180deg, transparent, hsl(var(--gold-light)), transparent, transparent, hsl(var(--gold-light)), transparent)`,
            animation: hovered
              ? "electric-spin-reverse 1.2s linear infinite"
              : "electric-spin-reverse 3.5s linear infinite",
          }}
        />
      </div>

      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.15 : 0,
          background: `radial-gradient(circle at center, hsl(var(--primary)), transparent 70%)`,
        }}
      />

      {/* Card content */}
      <motion.div
        animate={hovered ? { scale: 1.03 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative rounded-2xl bg-card/80 backdrop-blur-xl p-8 md:p-10 h-full flex flex-col"
        style={{
          boxShadow: hovered
            ? "0 20px 60px -15px hsla(var(--primary) / 0.2), 0 0 30px -10px hsla(var(--primary) / 0.1)"
            : "0 4px 20px -5px hsla(0, 0%, 0%, 0.3)",
        }}
      >
        {/* Icon */}
        <div className="relative mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center gradient-gold-bg transition-shadow duration-500"
            style={{
              boxShadow: hovered
                ? "0 0 25px hsla(var(--primary) / 0.4)"
                : "none",
            }}
          >
            <Icon size={26} className="text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl md:text-2xl mb-3 text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
          {desc}
        </p>

        {/* Bottom accent line */}
        <div className="mt-6 h-[2px] rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-gold-bg"
            initial={{ width: "0%" }}
            animate={hovered ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ElectricCard;
