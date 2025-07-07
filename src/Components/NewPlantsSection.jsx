

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion as Motion } from "framer-motion";
// import Loading from "./Loading";

// const NewPlantsSection = () => {
//   const [visiblePlants, setVisiblePlants] = useState([]);
//   const [allPlants, setAllPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://project-web-b11-a10-plant-care-serv.vercel.app/plants")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         const sorted = [...data].reverse();
//         setAllPlants(sorted);
//         setVisiblePlants(sorted.slice(0, 4));
//         setLoading(false);
//         setFetchError(null);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch plants data", err);
//         setFetchError("Failed to load plants. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   const handleShowAll = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setVisiblePlants(allPlants);
//       setLoading(false);
//       setShowAll(true);
//     }, 800);
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-14 bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-800 transition-colors duration-300">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400">
//           New Arrivals
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 mt-3 text-base max-w-xl mx-auto">
//           Discover beautiful and healthy plants freshly added to our collection.
//           Perfect for home, office, or gifts.
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loading />
//         </div>
//       ) : fetchError ? (
//         <p className="text-center text-red-600 dark:text-red-400">{fetchError}</p>
//       ) : (
//         <Motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           {visiblePlants.map((plant, index) => (
//             <Motion.div
//               key={plant._id || index}
//               className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-blue-200 dark:border-zinc-700 p-4 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[380px] group"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               {plant.image && (
//                 <Motion.img
//                   src={plant.image}
//                   alt={plant.plantName || "Plant image"}
//                   className="w-full h-36 object-cover rounded-md mb-3 transition-transform duration-500 ease-in-out group-hover:scale-105"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                   loading="lazy"
//                 />
//               )}

//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-1">
//                   {plant.plantName || "Unnamed Plant"}
//                 </h3>

//                 <p className="text-xs inline-block px-2 py-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white mb-2">
//                   {plant.category || "No category"}
//                 </p>

//                 <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3 leading-relaxed rounded-md">
//                   {plant.description?.slice(0, 80) || "No description available..."}
//                 </p>
//               </div>

//               <button
//                 disabled={!plant._id}
//                 className={`mt-auto px-4 py-2 rounded-md text-sm font-medium transition
//                   ${plant._id
//                     ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
//                     : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                   }`}
//                 onClick={() => plant._id && navigate(`/dashboard/plant-details/${plant._id}`)}
//                 aria-disabled={!plant._id}
//               >
//                 See More
//               </button>
//             </Motion.div>
//           ))}
//         </Motion.div>
//       )}

//       {!showAll && !loading && allPlants.length > 4 && (
//         <div className="flex justify-center mt-12">
//           <button
//             onClick={handleShowAll}
//             className="px-6 py-2 rounded-md border border-blue-500 text-blue-700 dark:text-white dark:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//           >
//             View All Plants
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default NewPlantsSection;
import React from "react";

const AboutClub = () => {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-16 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4">
          About Our Sports Club
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
          At <span className="font-semibold text-blue-600">ActiveArena</span>, our
          mission is to foster a vibrant sports community where passion meets
          excellence. We provide world-class facilities and programs to
          empower athletes of all levels.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* History */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-3">
            Our History
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded in 1995, ActiveArena has grown from a small community club to
            one of the leading sports facilities in the region. We have hosted
            numerous tournaments and continue to nurture talent across various
            sports including tennis, badminton, squash, and more.
          </p>
        </div>

        {/* Mission */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to provide an inclusive and motivating environment
            for athletes to develop their skills, promote healthy lifestyles,
            and build a strong community spirit. We believe in excellence,
            teamwork, and lifelong sportsmanship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
