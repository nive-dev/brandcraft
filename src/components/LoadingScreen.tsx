import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const text1 = "Think Different. ";
const text2 = "Market Better.";

const LoadingScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 500);
  }, []);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut" },
    },
  };

  return (
    <>
      {/* SHIMMER KEYFRAMES */}
      <style>
        {`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        `}
      </style>

      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* PARTICLES */}
        <div className="absolute inset-0">
          {[...Array(35)].map((_, i) => (
            <motion.span
              key={i}
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                background: "white",
                borderRadius: "50%",
                opacity: 0.3,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -20, 20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center gap-6">

          {/* LOGO */}
          <motion.img
            src={logo}
            alt="BrandCraft"
            style={{ height: "80px" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* TEXT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            style={{
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* FIRST PART */}
            {text1.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                style={{
                  whiteSpace: "pre",
                  display: "inline-block",
                  color: "#FFD700",
                  textShadow:
                    "0 0 6px rgba(255,215,0,0.6), 0 0 12px rgba(255,215,0,0.4)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}

            {/* SECOND PART (SHIMMER) */}
            {text2.split("").map((char, i) => (
              <motion.span
                key={`b-${i}`}
                variants={letter}
                style={{
                  whiteSpace: "pre",
                  display: "inline-block",
                  background:
                    "linear-gradient(90deg, #FFD700, #FFF3B0, #FFD700)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 2s linear infinite",
                  textShadow:
                    "0 0 10px rgba(255,200,0,0.9), 0 0 20px rgba(255,180,0,0.7)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* PROGRESS BAR */}
          <div
            style={{
              width: "160px",
              height: "3px",
              background: "#333",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "#FFD700",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LoadingScreen;