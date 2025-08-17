
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const upcomingEvents = [
  {
    id: 1,
    title: 'Summer Football Tournament',
    date: '2025-09-05',
    location: 'ActiveArena Stadium',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Football'
  },
  {
    id: 2,
    title: 'Basketball Friendly Match',
    date: '2025-09-12',
    location: 'Downtown Sports Complex',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Basketball'
  },
  {
    id: 3,
    title: 'Tennis Championship',
    date: '2025-09-20',
    location: 'Greenfield Tennis Court',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkrkzCqHD-vIcyw3olonzGWvCJjlET7oH5Q&s',
    category: 'Tennis'
  },
];

const UpcomingEvents = () => {
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
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300 rounded-xl"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300">
              Events Calendar
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Events</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Join our exciting sports events and tournaments happening soon
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
              <div className="relative h-full bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">{event.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                      {event.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </p>
                  </div>
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;
