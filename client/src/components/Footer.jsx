const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: "facebook-f",
      href: "https://www.facebook.com/share/18GvTLeRsJ/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: "instagram",
      href: "https://www.instagram.com/lamarbakery.ghazzeh?igsh=MTBnYnR2bHF3OG5vZg==",
      label: "Instagram",
    },
    {
      icon: "tiktok",
      href: "https://www.tiktok.com/@lamar.bakery?_r=1&_t=ZS-94WlgDEpi6y",
      label: "TikTok",
    },
    {
      icon: "pinterest-p",
      href: "https://www.pinterest.com/yourusername",
      label: "Pinterest",
    },
  ];

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Lamar Bakery Cafe
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Freshly baked happiness since 2020. We craft delicious pastries
              and serve premium coffee with love.
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all duration-300 hover:-translate-y-1"
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Menu", href: "#menu" },
                { name: "About Us", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-accent transition-colors duration-300 flex items-center gap-2"
                  >
                    <i className="fas fa-chevron-right text-xs text-accent"></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-white/80">
                <span>Monday - Friday</span>
                <span className="text-white">7AM - 9PM</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Saturday</span>
                <span className="text-white">8AM - 10PM</span>
              </li>
              <li className="flex justify-between text-white/80">
                <span>Sunday</span>
                <span className="text-white">8AM - 10PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-accent mt-1"></i>
                <a
                  href="https://maps.app.goo.gl/Zfd8yhdEk9JL1uSGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  Beqaa, Ghazze, main road
                  <br />
                  Beqaa , Lebanon
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-accent"></i>
                <span className="text-white/80">76 800 115</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-accent"></i>
                <span className="text-white/80">hello@lamarbakerycafe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Lamar Bakery Cafe. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a
                href="/admin/login"
                className="hover:text-accent transition-colors"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
