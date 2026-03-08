import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-soft py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-secondary" : "text-white"
            }`}
          >
            Lamar Bakery Cafe
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium transition-all duration-300 relative group ${
                  isScrolled
                    ? "text-gray-700 hover:text-accent"
                    : "text-white hover:text-cream"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className={`relative p-2 transition-colors duration-300 ${
                isScrolled
                  ? "text-secondary hover:text-accent"
                  : "text-white hover:text-cream"
              }`}
              aria-label="Open cart"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-2xl transition-colors duration-300 ${
              isScrolled ? "text-secondary" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <i
              className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-soft py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-6 py-3 text-gray-700 hover:text-accent hover:bg-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Cart Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleCart();
              }}
              className="w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:text-accent hover:bg-primary transition-colors duration-300"
            >
              <span>Cart</span>
              <div className="relative">
                <i className="fas fa-shopping-cart"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
