import sellerPortrait from "@/assets/seller-portrait.jpg";

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img
                src={sellerPortrait}
                alt="María Elena - Fundadora de Bella Forma"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-foreground/20 -z-10" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Nuestra Historia
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Conoce a<br />
              <span className="italic">María Elena</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hola, soy María Elena, fundadora de Bella Forma. Mi pasión por ayudar a las mujeres a sentirse seguras y hermosas me llevó a crear esta marca hace más de 5 años.
              </p>
              <p>
                Cada faja que ofrecemos ha sido cuidadosamente seleccionada pensando en la comodidad, calidad y resultados. Creo firmemente que toda mujer merece sentirse increíble en su propia piel.
              </p>
              <p>
                Mi compromiso es brindarte productos de la más alta calidad con un servicio personalizado. No vendemos solo fajas, vendemos confianza.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-border">
              <div>
                <p className="font-display text-3xl mb-1">5+</p>
                <p className="text-sm text-muted-foreground">Años de experiencia</p>
              </div>
              <div>
                <p className="font-display text-3xl mb-1">2K+</p>
                <p className="text-sm text-muted-foreground">Clientas felices</p>
              </div>
              <div>
                <p className="font-display text-3xl mb-1">100%</p>
                <p className="text-sm text-muted-foreground">Calidad garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
