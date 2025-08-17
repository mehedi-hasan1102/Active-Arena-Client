import React from 'react';

const galleryImages = [
  'https://via.placeholder.com/400x300?text=Court+1',
  'https://via.placeholder.com/400x300?text=Event+2',
  'https://via.placeholder.com/400x300?text=Member+3',
  'https://via.placeholder.com/400x300?text=Event+4',
  'https://via.placeholder.com/400x300?text=Court+5',
  'https://via.placeholder.com/400x300?text=Member+6',
];

const GallerySection = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-700 dark:text-yellow-400">📸 Our Gallery</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md dark:shadow-yellow-800/20 transform transition duration-300 hover:scale-105"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;