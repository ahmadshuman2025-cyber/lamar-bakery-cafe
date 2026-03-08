const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.querySelector("#menu");
    if (menuSection) {
      const headerOffset = 80;
      const elementPosition = menuSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brown-500/80 to-accent/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          Freshly Baked Happiness
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-10 font-light animate-fade-in-up animate-delay-200">
          Welcome to Lamar Bakery Cafe
        </p>
        <button
          onClick={scrollToMenu}
          className="btn-primary animate-fade-in-up animate-delay-300"
        >
          View Our Menu
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white text-3xl">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
