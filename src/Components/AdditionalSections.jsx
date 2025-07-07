
// import React from "react";
// import { FaSeedling } from "react-icons/fa";

// const beginnerPlants = [
//   {
//     name: "Snake Plant",
//     description: "Thrives on neglect and low light. Perfect for busy beginners.",
//   },
//   {
//     name: "Spider Plant",
//     description: "Air-purifying, resilient, and quick-growing with minimal care.",
//   },
//   {
//     name: "Pothos",
//     description: "Versatile, low-maintenance vine ideal for shelves or hanging baskets.",
//   },
// ];

// const AdditionalSections = () => {
//   return (
//     <section className="px-6 py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
//           Beginner-Friendly Plants
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-12 text-lg">
//           Start your plant care journey with these hassle-free and rewarding green companions.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {beginnerPlants.map((plant, idx) => (
//             <div
//               key={idx}
//               tabIndex={0}
//               className="bg-gradient-to-br from-white to-blue-50 dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-md shadow-xl transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl focus:-translate-y-2 focus:shadow-2xl focus:outline-none group"
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div
//                   aria-hidden="true"
//                   className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4 shadow-inner ring-2 ring-blue-400 dark:ring-blue-500 transition-all"
//                 >
//                   <FaSeedling className="text-blue-600 dark:text-blue-300 text-3xl group-hover:scale-110 transition-transform" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                   {plant.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {plant.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AdditionalSections;
import React from "react";

const coupons = [
  { code: "ABC", discount: 5 },
  { code: "SUMMER20", discount: 20 },
  { code: "WELCOME10", discount: 10 },
  { code: "SPORTS5", discount: 5 },
];

const PromotionsSection = () => {
  return (
    <section
      id="promotions"
      className="max-w-7xl mx-auto px-6 py-16 bg-blue-50 dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-300"
    >
      <h2 className="text-4xl font-extrabold text-center text-blue-900 dark:text-blue-300 mb-12">
        Special Promotions & Discount Coupons
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {coupons.map(({ code, discount }) => (
          <div
            key={code}
            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
              Coupon Code
            </p>
            <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-4 tracking-widest">
              {code}
            </p>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Get <span className="font-bold">{discount}%</span> OFF
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionsSection;
