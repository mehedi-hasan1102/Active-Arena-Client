
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const testimonials = [
  { name: 'John Doe', role: 'Professional Player', message: 'ActiveArena has the best courts and facilities I have ever used. The maintenance is top-notch and the booking system is seamless. Highly recommended!', avatar: 'https://i.pravatar.cc/150?img=1', rating: 5 },
  { name: 'Jane Smith', role: 'Member', message: 'Booking courts is super easy and the staff is really helpful. The mobile app makes it convenient to manage my schedule. Love it!', avatar: 'https://i.pravatar.cc/150?img=2', rating: 4 },
  { name: 'Ali Hasan', role: 'Amateur Player', message: 'Great experience and friendly environment. The coaching programs helped me improve my game significantly. Definitely coming back!', avatar: 'https://i.pravatar.cc/150?img=3', rating: 5 },
];

const TestimonialSection = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [controls]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
  const cardVariants = { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: 'spring', stiffness: 100 } } };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-6 md:py-20 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-xl"
    >
      {/* Blob background */}
      <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 0.1 } : { opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center max-w-4xl mx-auto mb-12">
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300">
              Testimonials
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Members Say</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Hear from our community of athletes and sports enthusiasts about their experiences at ActiveArena.
          </motion.p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={cardVariants} transition={{ delay: i * 0.1 }} className="relative group" whileHover={{ y: -5 }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
              <div className="relative h-full bg-white dark:bg-zinc-800 p-8 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-6 border-4 border-emerald-200 dark:border-emerald-800 object-cover" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className={`w-5 h-5 ${j < t.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic text-center mb-6">"{t.message}"</p>
                <div className="mt-auto text-center">
                  <h3 className="font-semibold text-lg text-emerald-700 dark:text-emerald-400 mb-1">{t.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Blob animation styles */}
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

export default TestimonialSection;
