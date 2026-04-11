import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-display font-bold text-gradient-gold mb-4">
            BrandCraft Media
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Crafting powerful brands in the digital world. We help businesses grow through strategic digital marketing.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-foreground">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <span>9, Padmavathi Nagar South, Reddipalayam Road, Thanjavur – 613009</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              <span>9087473497 / 9566432818</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              <span>brand01craftmedia@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BrandCraft Media. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
