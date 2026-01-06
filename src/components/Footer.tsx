const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <a href="#" className="font-display text-xl tracking-wider">
            BELLA FORMA
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#productos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Productos
            </a>
            <a href="#nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Nosotros
            </a>
            <a href="#ubicacion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Ubicación
            </a>
            <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Bella Forma. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
