import { motion } from "framer-motion";

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Gradient orbs */}
    <motion.div
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
      style={{ background: "radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)" }}
      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
      style={{ background: "radial-gradient(circle, hsl(var(--gold-light)) 0%, transparent 70%)" }}
      animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

export default HeroBackground;
