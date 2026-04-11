import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
    
    {/* Tooltip */}
    <div className="mb-2 px-3 py-1.5 text-xs rounded-lg bg-black text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
      Chat with us
    </div>

    {/* Button */}
  <motion.a
  href="https://wa.me/919566432818?text=Hello%20BrandCraft%20Media,%20I%20am%20interested%20in%20your%20services"
  target="_blank"
  rel="noopener noreferrer"
  className="relative p-4 rounded-full bg-[#25D366] text-white shadow-lg"
  whileHover={{ scale: 1.12 }}
  whileTap={{ scale: 0.95 }}
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 1.2, type: "spring" }}
>
      {/* Glow Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] blur-xl opacity-60 animate-pulse"></span>

      {/* Real WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="white"
        className="relative z-10"
      >
        <path d="M16.001 2.002c-7.732 0-14 6.268-14 14 0 2.469.648 4.877 1.881 7.002L2 30l7.215-1.872A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14s-6.268-13.998-14-13.998zm0 25.998a11.91 11.91 0 0 1-6.065-1.655l-.434-.258-4.282 1.11 1.143-4.17-.283-.44A11.94 11.94 0 0 1 4.001 16c0-6.627 5.373-12 12-12 3.204 0 6.217 1.248 8.485 3.515A11.92 11.92 0 0 1 28.001 16c0 6.627-5.373 12-12 12zm6.588-8.256c-.36-.18-2.126-1.048-2.456-1.166-.33-.12-.57-.18-.81.18-.24.36-.93 1.166-1.14 1.406-.21.24-.42.27-.78.09-.36-.18-1.518-.56-2.89-1.788-1.068-.954-1.788-2.13-1.998-2.49-.21-.36-.022-.554.158-.734.162-.162.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.956-1.11-2.676-.294-.706-.594-.61-.81-.622l-.69-.012c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.538 3.876 6.154 5.436.86.372 1.53.594 2.054.762.864.276 1.65.237 2.27.144.692-.104 2.126-.868 2.426-1.708.3-.84.3-1.56.21-1.708-.09-.15-.33-.24-.69-.42z" />
      </svg>

      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full border-2 border-white opacity-70 animate-ping"></span>
    </motion.a>
  </div>
);

export default WhatsAppButton;