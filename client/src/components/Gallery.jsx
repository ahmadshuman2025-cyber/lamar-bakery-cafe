import { useState, useEffect, useCallback } from "react";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      alt: "Fresh bread",
      title: "Artisan Breads",
    },
    {
      src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
      alt: "Croissants",
      title: "Fresh Pastries",
    },
    {
      src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      alt: "Chocolate cake",
      title: "Decadent Cakes",
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      alt: "Coffee",
      title: "Premium Coffee",
    },
    {
      src: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
      alt: "Cheesecake",
      title: "Creamy Desserts",
    },
    {
      src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop",
      alt: "Cupcakes",
      title: "Sweet Treats",
    },
  ];

  // Open lightbox at specific index
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  // Navigate to previous image
  const goToPrevious = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  }, []);

  // Navigate to next image
  const goToNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">A glimpse into our delicious world</p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-card cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-500/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-heading text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                </div>
              </div>

              {/* Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                  <i className="fas fa-search-plus text-secondary text-xl"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="btn-outline">View Full Gallery</button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white text-2xl hover:text-accent transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-white text-xl bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Next Button */}
          <button
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-white text-xl bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={goToNext}
            aria-label="Next image"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image */}
            <img
              src={galleryImages[currentIndex].src.replace(
                "w=400&h=300",
                "w=1200&h=800",
              )}
              alt={galleryImages[currentIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
              <h3 className="text-white font-heading text-xl font-semibold text-center">
                {galleryImages[currentIndex].title}
              </h3>
              <p className="text-gray-300 text-sm text-center mt-1">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
