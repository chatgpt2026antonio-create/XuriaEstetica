import { useState } from "react";
import { Menu, X, ShoppingBag, Star } from "lucide-react";
import TestimonialsDialog from "./TestimonialsDialog";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#productos", label: "Productos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#citas", label: "Citas" },
    { href: "#ubicacion", label: "Ubicación" },
    { href: "#contacto", label: "Contacto" },
    { href: "#comunidad", label: "Comunidad" },
  ];

  const TestimoniosButton = ({ className = "" }: { className?: string }) => (
    <TestimonialsDialog>
      <button
        className={`flex items-center gap-1 text-sm tracking-widest uppercase hover:text-accent transition-colors duration-300 ${className}`}
      >
        <Star className="w-4 h-4" />
        Testimonios
      </button>
    </TestimonialsDialog>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="font-display text-2xl tracking-wider">
            BELLA FORMA
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <TestimoniosButton />
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-6 border-t border-border mt-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-widest uppercase py-2 hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <TestimoniosButton className="py-2" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
