import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Swal from 'sweetalert2';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        icon: 'warning',
        title: 'Please enter your email',
        background: isDark ? '#18181b' : '#fff',
        color: isDark ? '#facc15' : '#b45309',
      });
      return;
    }

    const isDark = document.documentElement.classList.contains('dark');
    Swal.fire({
      icon: 'success',
      title: 'Subscribed Successfully!',
      text: 'You will receive our next newsletter',
      background: isDark ? '#18181b' : '#fff',
      color: isDark ? '#4ade80' : '#166534',
      timer: 1500,
      showConfirmButton: false,
    });
    setEmail('');
  };

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

  const formVariants = {
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

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300">
              Stay Updated
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Subscribe to Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Newsletter</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
            Get updates about the latest events, membership plans, and featured courts directly to your inbox.
          </motion.p>

          <motion.form 
            variants={formVariants}
            onSubmit={handleSubscribe} 
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
          >
            <div className="relative flex-grow">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative w-full px-4 py-3 rounded-lg border border-blue-700 dark:border-blue-400 dark:bg-zinc-800 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900"
            >
              Subscribe
            </motion.button>
          </motion.form>
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

export default NewsletterSection;