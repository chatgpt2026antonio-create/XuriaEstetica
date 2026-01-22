import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Instagram, Heart } from "lucide-react";

const Community = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://n8n.srv865543.hstgr.cloud/webhook/Produccion_correos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            source: "Bella Forma Community",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        toast.success("¡Bienvenida a la comunidad Bella Forma!");
        setEmail("");
      } else {
        toast.error("Hubo un error. Por favor intenta de nuevo.");
      }
    } catch (error) {
      toast.error("No se pudo conectar. Intenta más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="comunidad" className="py-24 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-8 h-8 mx-auto mb-6 text-accent" />
          
          <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/60 mb-4">
            Únete a Nosotras
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Sé parte de nuestra<br />
            <span className="italic">comunidad</span>
          </h2>
          <p className="text-primary-foreground/70 mb-10 max-w-md mx-auto">
            Recibe ofertas exclusivas, tips de bienestar y sé la primera en conocer nuestras nuevas colecciones.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Tu email"
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="secondary"
              className="tracking-widest uppercase text-xs px-8"
            >
              {isSubmitting ? "..." : "Unirme"}
            </Button>
          </form>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm tracking-wider">@bellaforma</span>
            </a>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-primary-foreground/10">
            <div>
              <p className="font-display text-3xl mb-1">5K+</p>
              <p className="text-sm text-primary-foreground/60">Seguidoras</p>
            </div>
            <div>
              <p className="font-display text-3xl mb-1">200+</p>
              <p className="text-sm text-primary-foreground/60">Reseñas 5★</p>
            </div>
            <div>
              <p className="font-display text-3xl mb-1">98%</p>
              <p className="text-sm text-primary-foreground/60">Recomiendan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
