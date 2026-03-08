const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full bg-secondary/10 rounded-xl"></div>
            <div className="relative overflow-hidden rounded-xl shadow-card">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop"
                alt="Fresh pastries"
                className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="section-title text-left">Our Story</h2>
            <div className="w-24 h-1 bg-accent rounded-full"></div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Welcome to Lamar Bakery Cafe, where every bite tells a story of
              passion and tradition. Since our inception, we've been dedicated
              to crafting the finest baked goods using time-honored recipes and
              the freshest ingredients.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Our skilled artisans wake before dawn to ensure that every
              croissant, every loaf of bread, and every pastry that leaves our
              kitchen is nothing short of perfection. We believe that great food
              brings people together, and we're honored to be part of your daily
              moments of joy.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're here for your morning coffee, a leisurely afternoon
              treat, or a special celebration, our team is ready to welcome you
              with warm smiles and delicious creations.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-leaf text-accent"></i>
                </div>
                <span className="font-medium text-gray-700">
                  Fresh Ingredients
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-heart text-accent"></i>
                </div>
                <span className="font-medium text-gray-700">
                  Made with Love
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-clock text-accent"></i>
                </div>
                <span className="font-medium text-gray-700">Baked Daily</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-coffee text-accent"></i>
                </div>
                <span className="font-medium text-gray-700">
                  Premium Coffee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
