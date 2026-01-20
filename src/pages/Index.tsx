import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import AppointmentsCTA from "@/components/AppointmentsCTA";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import { Pricing } from "@/components/ui/pricing";

const pricingPlans = [
  {
    name: "BÁSICO",
    price: "89",
    yearlyPrice: "71",
    period: "mes",
    features: [
      "1 faja de compresión",
      "Asesoría inicial gratuita",
      "Guía de cuidados",
      "Soporte por WhatsApp",
    ],
    description: "Ideal para comenzar tu transformación",
    buttonText: "Comenzar",
    href: "/citas",
    isPopular: false,
  },
  {
    name: "PROFESIONAL",
    price: "159",
    yearlyPrice: "127",
    period: "mes",
    features: [
      "2 fajas de compresión",
      "Asesoría personalizada",
      "Seguimiento mensual",
      "Descuentos exclusivos",
      "Prioridad en citas",
      "Guía de ejercicios",
    ],
    description: "Para resultados óptimos",
    buttonText: "Elegir Plan",
    href: "/citas",
    isPopular: true,
  },
  {
    name: "PREMIUM",
    price: "299",
    yearlyPrice: "239",
    period: "mes",
    features: [
      "3 fajas premium",
      "Asesoría VIP ilimitada",
      "Seguimiento semanal",
      "Acceso a nuevos productos",
      "Envío gratis siempre",
      "Garantía extendida",
      "Eventos exclusivos",
    ],
    description: "La experiencia completa",
    buttonText: "Contactar",
    href: "/citas",
    isPopular: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Pricing 
          plans={pricingPlans} 
          title="Nuestros Planes" 
          description="Elige el plan perfecto para ti. Todos incluyen productos de alta calidad y atención personalizada."
        />
        <AppointmentsCTA />
        <Location />
        <Contact />
        <Community />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
