
// import React from "react";
// import { motion as Motion } from "framer-motion";

// const promotions = [
//   {
//     id: 1,
//     title: "Summer Plant Sale - Up to 50% Off",
//     description:
//       "Get your favorite indoor and outdoor plants at amazing discounts this summer season.",
//     img: "https://freedesignfile.com/upload/2020/07/Summer-sale-up-to-50-off-Green-Background-Vector.jpg",
//   },
//   {
//     id: 2,
//     title: "Buy 2 Get 1 Free on Succulents",
//     description:
//       "Decorate your space with beautiful succulents. Buy two and get one absolutely free!",
//     img: "https://www.thefoodstatecompany.com/content/images/thumbs/0001088_900.jpeg",
//   },
//   {
//     id: 3,
//     title: "Free Shipping on Orders Over $50",
//     description:
//       "Shop now and enjoy free shipping on all orders over $50. Limited time offer!",
//     img: "https://st5.depositphotos.com/82875930/69062/v/450/depositphotos_690621590-stock-illustration-free-shipping-all-orders-tag.jpg",
//   },
//   {
//     id: 4,
//     title: "Exclusive Gift Packs for Plant Lovers",
//     description:
//       "Surprise your loved ones with curated gift packs that include plants and accessories.",
//     img: "https://www.paloverdebotanicals.com/cdn/shop/files/Paloverde-Custom-Gift-Boxes.jpg?v=1683484220&width=1920",
//   },
// ];

// const PromotionalOffers = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-14 bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400">
//           Promotional Offers
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 mt-3 text-base max-w-xl mx-auto">
//           Check out our latest promotions and special deals to help your plants thrive.
//         </p>
//       </div>

//       <Motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         {promotions.map((offer, index) => (
//           <Motion.article
//             key={offer.id}
//             className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-blue-200 dark:border-zinc-700 p-4 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[300px] group focus-within:ring-2 focus-within:ring-blue-500"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             tabIndex={0}
//             aria-label={`Promotion: ${offer.title}`}
//           >
//             <img
//               src={offer.img}
//               alt={offer.title}
//               className="w-full h-36 object-cover rounded-md mb-3 transition-transform duration-500 ease-in-out group-hover:scale-105"
//               loading="lazy"
//             />

//             <div className="flex-1">
//               <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-1">
//                 {offer.title}
//               </h3>

//               <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
//                 {offer.description}
//               </p>
//             </div>
//           </Motion.article>
//         ))}
//       </Motion.div>
//     </section>
//   );
// };

// export default PromotionalOffers;
import React from "react";

const LocationSection = () => {
  return (
    <section
      id="location"
      className="max-w-7xl mx-auto px-6 py-16 bg-blue-50 dark:bg-gray-900 rounded-lg shadow-lg "
    >
      <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 text-center mb-8">
        Location
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        {/* Address */}
        <div className="text-blue-900 dark:text-blue-100">
          <h3 className="text-2xl font-semibold mb-4">ActiveArena Sports Club</h3>
          <p className="mb-2">123 Sports Avenue, Greenfield City,</p>
          <p className="mb-2">Dhaka, Bangladesh - 1212</p>
          <p className="mb-2">Phone: +880 1700-123456</p>
          <p className="mb-6">Email: info@activearena.com</p>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=123+Sports+Avenue,+Greenfield+City,+Dhaka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Navigate on Google Maps
          </a>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
          <iframe
            title="ActiveArena Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.912312005212!2d90.39401271541404!3d23.750903094163033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b0cc2304a3%3A0xf5f6ad0121a79190!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
