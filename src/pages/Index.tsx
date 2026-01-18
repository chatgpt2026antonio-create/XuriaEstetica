import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import AppointmentsCTA from "@/components/AppointmentsCTA";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
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
