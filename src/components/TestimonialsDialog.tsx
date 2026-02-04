import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Las fajas de Bella Forma me han ayudado muchísimo en mi recuperación postparto. La calidad es increíble y el servicio personalizado hace toda la diferencia.",
    name: "María González",
    designation: "Clienta Satisfecha",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
  },
  {
    quote:
      "Después de mi cirugía, necesitaba una faja de calidad. María Elena me asesoró perfectamente y encontré exactamente lo que necesitaba. ¡100% recomendado!",
    name: "Carolina Mendez",
    designation: "Clienta Frecuente",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
  },
  {
    quote:
      "La atención personalizada es lo que más valoro de Bella Forma. Me tomaron las medidas perfectas y la faja me queda como un guante. Excelente experiencia.",
    name: "Ana Patricia Ruiz",
    designation: "Clienta VIP",
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&auto=format&fit=crop",
  },
];

interface TestimonialsDialogProps {
  children: React.ReactNode;
}

const TestimonialsDialog = ({ children }: TestimonialsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            Testimonios de Nuestras Clientas
            <Star className="w-5 h-5 text-primary fill-primary" />
          </DialogTitle>
        </DialogHeader>
        <CircularTestimonials testimonials={testimonials} autoplay={true} />
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsDialog;
