import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
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
        <Location />
        <Contact />
        <Community />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
