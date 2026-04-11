import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroBackground from "@/components/HeroBackground";
import { toast } from "sonner";

// Google Apps Script Web App URL - Replace with your deployed URL
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided, validate format)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-+()]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Check if Google Apps Script URL is configured
    if (!GOOGLE_APPS_SCRIPT_URL) {
      toast.error("Contact form endpoint not configured");
      return;
    }

    setSending(true);

    try {
      // Using mode: "no-cors" to handle CORS with Google Apps Script
      // Note: This returns an opaque response, so we can't read the response body
      // We assume success if the network request completes without error
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      // With no-cors mode, we get an opaque response (status 0)
      // We assume success if no network error was thrown
      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      // Only network errors will be caught here
      // CORS errors are caught here as well
      toast.error(
        "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <HeroBackground />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-medium tracking-widest uppercase text-primary"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Contact <span className="text-gradient-gold">Us</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection>
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
                noValidate
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  Send a Message
                </h3>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-border"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-border"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Phone Number{" "}
                    <span className="text-xs text-muted-foreground/70">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-border"
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm text-muted-foreground mb-1.5 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-border"
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.03 } : {}}
                  whileTap={!sending ? { scale: 0.97 } : {}}
                  className="w-full py-3.5 rounded-xl gradient-gold-bg text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </AnimatedSection>

            {/* Info + Map */}
            <AnimatedSection delay={0.15}>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6 space-y-5">
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Contact Info
                  </h3>
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={20}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Address
                      </p>
                      <p className="text-muted-foreground text-sm">
                        9, Padmavathi Nagar South, Reddipalayam Road, Thanjavur
                        – 613009
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Phone
                      </p>
                      <p className="text-muted-foreground text-sm">
                        9087473497 / 9566432818
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Email
                      </p>
                      <p className="text-muted-foreground text-sm">
                        brand01craftmedia@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass rounded-2xl overflow-hidden h-[300px]">
                  <iframe
                    title="BrandCraft Media Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8!2d79.14!3d10.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzQ4LjAiTiA3OcKwMDgnMjQuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;