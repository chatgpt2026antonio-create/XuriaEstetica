import { Link } from "react-router-dom";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppointmentsCTA = () => {
  const features = [
    {
      icon: Calendar,
      title: "Agenda Online",
      description: "Selecciona el día que mejor te convenga",
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Mañana: 8AM-12PM | Tarde: 4PM-9PM",
    },
    {
      icon: CheckCircle,
      title: "Confirmación Inmediata",
      description: "Recibe confirmación al instante",
    },
  ];

  return (
    <section id="citas" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest uppercase text-accent mb-4 block">
            Reservaciones
          </span>
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Agenda Tu Cita
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reserva tu cita de forma rápida y sencilla. Consulta disponibilidad en tiempo real 
            y elige el horario que mejor se adapte a tu agenda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-background rounded-xl shadow-sm border border-border/50"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/citas">
            <Button size="lg" className="text-lg px-8">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Cita Ahora
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Sin registro necesario • Disponibilidad en tiempo real
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsCTA;
