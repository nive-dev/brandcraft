import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroBackground from "@/components/HeroBackground";
import { toast } from "sonner";

// Google Apps Script Web App URL - Replace with your deployed URL
const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string; // ✅ added
  message: string;
  services: string[]; // ✅ added
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const serviceOptions = [
  "Digital Marketing",
  "Meta Ads",
  "SEO Optimization",
  "Website Development",
  "Social Media Marketing",
  "Performance Marketing",
];

const Contact = () => {
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "", // ✅ added
    message: "",
    services: [], // ✅ added
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-+()]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (!formData.address.trim()) {
      newErrors.message = "Address is required"; // kept inside same error type (UI unchanged)
    }

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ✅ SERVICE CHECKBOX HANDLER
  const handleServiceChange = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);

      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!GOOGLE_APPS_SCRIPT_URL) {
      toast.error("Contact form endpoint not configured");
      return;
    }

    setSending(true);

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address, // ✅ added
          message: formData.message,
          services: formData.services, // ✅ added
          timestamp: new Date().toISOString(),
        }),
      });

      toast.success("Message sent successfully! We'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
        services: [],
      });

      setErrors({});
    } catch (error) {
      toast.error(
        "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <HeroBackground />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.span className="text-xs font-medium tracking-widest uppercase text-primary">
            Get In Touch
          </motion.span>

          <motion.h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6">
            Contact <span className="text-gradient-gold">Us</span>
          </motion.h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* FORM SIDE */}
            <AnimatedSection>
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
                noValidate
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  Send a Message
                </h3>

                {/* NAME */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm"
                  placeholder="John Doe"
                />

                {/* EMAIL */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm"
                  placeholder="john@example.com"
                />

                {/* PHONE */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm"
                  placeholder="+91 98765 43210"
                />

                {/* ADDRESS (NEW) */}
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm"
                  placeholder="Your Address"
                />

                {/* SERVICES (NEW) */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Services
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                {/* MESSAGE */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border text-foreground text-sm resize-none"
                  placeholder="How can we help you?"
                />

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl gradient-gold-bg text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </AnimatedSection>

            {/* INFO SIDE (UNCHANGED) */}
            <AnimatedSection delay={0.15}>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6 space-y-5">
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Contact Info
                  </h3>

                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      9, Padmavathi Nagar South, Reddipalayam Road, Thanjavur
                      – 613009
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      9087473497 / 9566432818
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      brand01craftmedia@gmail.com
                    </p>
                  </div>
                  <div className="glass rounded-2xl overflow-hidden h-[300px] mt-6">
 <iframe
  title="Exact Location Map"
src="https://www.google.com/maps?q=Padmavathi+Nagar+South+Reddipalayam+Road+Thanjavur+613009&output=embed"  width="100%"
  height="300"
  style={{ border: 0 }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
</div>
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