import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  // Latinoamérica
  { code: "+54", country: "Argentina" },
  { code: "+591", country: "Bolivia" },
  { code: "+55", country: "Brasil" },
  { code: "+56", country: "Chile" },
  { code: "+57", country: "Colombia" },
  { code: "+506", country: "Costa Rica" },
  { code: "+53", country: "Cuba" },
  { code: "+593", country: "Ecuador" },
  { code: "+503", country: "El Salvador" },
  { code: "+502", country: "Guatemala" },
  { code: "+504", country: "Honduras" },
  { code: "+52", country: "México" },
  { code: "+505", country: "Nicaragua" },
  { code: "+507", country: "Panamá" },
  { code: "+595", country: "Paraguay" },
  { code: "+51", country: "Perú" },
  { code: "+1809", country: "República Dominicana" },
  { code: "+598", country: "Uruguay" },
  { code: "+58", country: "Venezuela" },
  // Europa (sin España)
  { code: "+33", country: "Francia" },
  { code: "+49", country: "Alemania" },
  { code: "+39", country: "Italia" },
  { code: "+351", country: "Portugal" },
  { code: "+44", country: "Reino Unido" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("+51");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullPhone = formData.phone ? `${countryCode} ${formData.phone}` : "";
      
      const response = await fetch(
        "https://n8n.srv865543.hstgr.cloud/webhook-test/35fddf6f-5a86-4737-a798-3e195f81aee7",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: fullPhone,
            message: formData.message.trim(),
            source: "Bella Forma Contact",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        toast.success("¡Mensaje enviado! Te contactaremos pronto.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Hubo un error. Por favor intenta de nuevo.");
      }
    } catch (error) {
      toast.error("No se pudo conectar. Intenta más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const whatsappNumber = "51999888777";
  const whatsappMessage = encodeURIComponent(
    "Hola, me interesa conocer más sobre sus fajas. ¿Podrían darme más información?"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contacto" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Contáctanos
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              ¿Tienes <span className="italic">preguntas</span>?
            </h2>
            <p className="text-muted-foreground">
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
            </p>
          </div>

          {/* WhatsApp Button */}
          <div className="text-center mb-10">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="tracking-widest uppercase text-sm">Escríbenos por WhatsApp</span>
            </a>
          </div>

          <div className="text-center mb-10">
            <span className="text-sm text-muted-foreground">o envíanos un mensaje</span>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-sm tracking-wide block mb-2">
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-foreground"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm tracking-wide block mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-foreground"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="text-sm tracking-wide block mb-2">
                Teléfono (opcional)
              </label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-[180px] bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border max-h-[300px]">
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-foreground flex-1"
                  placeholder="999 888 777"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm tracking-wide block mb-2">
                Mensaje
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-background border-border focus:border-foreground resize-none"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full tracking-widest uppercase text-xs py-6"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
