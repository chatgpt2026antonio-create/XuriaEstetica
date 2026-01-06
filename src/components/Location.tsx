import { MapPin, Clock, Phone } from "lucide-react";

const Location = () => {
  return (
    <section id="ubicacion" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Map Placeholder */}
          <div className="aspect-square lg:aspect-auto bg-cream relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.0876716817847!2d-77.03723902481754!3d-12.06825094215485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c6a0d29e9d%3A0x1ddc7b4a9e0e5b8c!2sMiraflores%2C%20Lima!5e0!3m2!1ses!2spe!4v1699999999999!5m2!1ses!2spe"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Bella Forma"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Location Info */}
          <div className="flex flex-col justify-center">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Encuéntranos
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-8">
              Nuestra<br />
              <span className="italic">Ubicación</span>
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 border border-foreground flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Dirección</h3>
                  <p className="text-muted-foreground">
                    Av. Larco 1234, Miraflores<br />
                    Lima, Perú
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 border border-foreground flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Horario de Atención</h3>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 10:00 AM - 7:00 PM<br />
                    Sábados: 10:00 AM - 3:00 PM
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 border border-foreground flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Teléfono</h3>
                  <p className="text-muted-foreground">
                    +51 999 888 777<br />
                    WhatsApp disponible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
