import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://vxjaffnysitulaojvscz.supabase.co/storage/v1/object/public/Background/abstract_holographic_liquid_surface_with_flowing_iridescent.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-xl">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Nueva Colección
          </p>
          <h1 className="font-display text-5xl md:text-7xl mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Realza tu<br />
            <span className="italic">belleza natural</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Fajas premium diseñadas para moldear y realzar tu figura con comodidad y elegancia.
          </p>
          <div className="flex gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button variant="default" size="lg" className="tracking-widest uppercase text-xs px-8 py-6">
              Ver Colección
            </Button>
            <Button variant="outline" size="lg" className="tracking-widest uppercase text-xs px-8 py-6">
              Contactar
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="w-px h-16 bg-foreground/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
