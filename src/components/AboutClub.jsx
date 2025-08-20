// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// const AboutClub = () => {
//   const controls = useAnimation();
//   const sectionRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           controls.start("visible");
//         }
//       },
//       {
//         root: null,
//         rootMargin: "0px",
//         threshold: 0.2,
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, [controls]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.1, 0.25, 1]
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { scale: 0.95, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   return (
//     <section
//       id="about"
//       ref={sectionRef}
//       className="relative mx-auto px-6 py-24 md:py-32 overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-300 rounded-xl"
//     >
//       {/* Animated background elements - different for light/dark */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={isVisible ? { opacity: 0.1 } : { opacity: 0 }}
//         transition={{ duration: 1.5 }}
//         className="absolute inset-0 overflow-hidden pointer-events-none"
//       >
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
//         <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
//       </motion.div>

//       <div className="relative max-w-7xl mx-auto">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate={controls}
//           className="text-center max-w-4xl mx-auto mb-20"
//         >
//           <motion.div variants={itemVariants} className="inline-block mb-6">
//             <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300">
//               About Us
//             </span>
//           </motion.div>
          
//           <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
//             Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Sports Excellence</span>
//           </motion.h2>
          
//           <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
//             At ActiveArena, we don't just build athletes - we cultivate champions of character through innovative programs and world-class facilities.
//           </motion.p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {/* History Card */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate={controls}
//             className="relative group"
//           >
//             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
//             <div className="relative h-full bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
//               <div className="flex items-center mb-6">
//                 <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 mr-4 transition-colors duration-300">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Our Journey</h3>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
//                 From our humble 1995 beginnings as a community initiative to becoming a regional sports hub, our evolution mirrors the growth of the athletes we nurture. Today, we host international tournaments while staying true to our grassroots mission.
//               </p>
//               <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 transition-colors duration-300">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((item) => (
//                     <img
//                       key={item}
//                       className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-800 transition-colors duration-300"
//                       src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
//                       alt="Member"
//                     />
//                   ))}
//                   <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-300 text-xs font-medium ring-2 ring-white dark:ring-zinc-800 transition-colors duration-300">
//                     +12
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Vision Card */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate={controls}
//             transition={{ delay: 0.2 }}
//             className="relative group"
//           >
//             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-cyan-500 dark:to-blue-500"></div>
//             <div className="relative h-full bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
//               <div className="flex items-center mb-6">
//                 <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400 mr-4 transition-colors duration-300">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Our Vision</h3>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
//                 We're pioneering a new standard in sports development where technology meets tradition. Our smart facilities and data-driven training complement our core values of discipline, resilience, and community spirit.
//               </p>
//               <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 transition-colors duration-300">
//                 <div className="flex flex-wrap gap-2">
//                   {['Innovation', 'Community', 'Excellence', 'Wellness'].map((tag) => (
//                     <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 transition-colors duration-300">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Add this to your globals.css for the blob animation */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default AboutClub;

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const AboutClub = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [controls]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
  const cardVariants = { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } } };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto px-6 py-24 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-xl"
    >
      {/* Animated blobs */}
      <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 0.1 } : { opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center max-w-4xl mx-auto mb-20">
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300">
              About Us
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Sports Excellence</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            At ActiveArena, we don't just build athletes - we cultivate champions of character through innovative programs and world-class facilities.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Our Journey */}
          <motion.div variants={cardVariants} initial="hidden" animate={controls} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
            <div className="relative h-full bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 mr-4 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Our Journey</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                From our humble 1995 beginnings as a community initiative to becoming a regional sports hub, our evolution mirrors the growth of the athletes we nurture. Today, we host international tournaments while staying true to our grassroots mission.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 transition-colors duration-300">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((item) => (
                    <img
                      key={item}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-800 transition-colors duration-300"
                      src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                      alt="Member"
                    />
                  ))}
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-300 text-xs font-medium ring-2 ring-white dark:ring-zinc-800 transition-colors duration-300">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our Vision */}
          <motion.div variants={cardVariants} initial="hidden" animate={controls} transition={{ delay: 0.2 }} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-cyan-500 dark:to-blue-500"></div>
            <div className="relative h-full bg-white dark:bg-zinc-800 p-8 rounded-2xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400 mr-4 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Our Vision</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                We're pioneering a new standard in sports development where technology meets tradition. Our smart facilities and data-driven training complement our core values of discipline, resilience, and community spirit.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 transition-colors duration-300">
                <div className="flex flex-wrap gap-2">
                  {['Innovation', 'Community', 'Excellence', 'Wellness'].map((tag) => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default AboutClub;
