
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Provider/AuthProvider';
import Loading from './Loading';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';

const FeaturedCourts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState({});
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const queryClient = useQueryClient();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: 'spring', stiffness: 100 } },
  };

  const { data: courts = [], isLoading, error } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/courts');
      return res.data.courts || res.data;
    },
  });

  const bookCourtMutation = useMutation({
    mutationFn: async (bookingDetails) => {
      const response = await axiosInstance.post('/bookings', bookingDetails);
      return response.data;
    },
    onSuccess: () => {
      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        icon: 'success',
        title: 'Booking Successful!',
        background: isDark ? '#18181b' : '#fff',
        color: isDark ? '#4ade80' : '#166534',
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(['courts']);
      setSelectedSlots({});
    },
    onError: (err) => {
      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: err.response?.data?.error || 'Something went wrong during booking.',
        background: isDark ? '#18181b' : '#fff',
        color: isDark ? '#f87171' : '#b91c1c',
      });
    },
  });

  const featuredCourts = courts.slice(0, 4); // fetch 8 courts to show 4 per row

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const handleBookNow = (court) => {
    if (!user) {
      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to book a court',
        confirmButtonText: 'Go to Login',
        background: isDark ? '#18181b' : '#fff',
        color: isDark ? '#4ade80' : '#166534',
      }).then(() => navigate('/login'));
      return;
    }

    const selectedSlot = selectedSlots[court._id];
    if (!selectedSlot) {
      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        icon: 'warning',
        title: 'Select a Slot',
        text: 'Please select a time slot before booking',
        background: isDark ? '#18181b' : '#fff',
        color: isDark ? '#facc15' : '#b45309',
      });
      return;
    }

    const bookingDetails = {
      courtId: court._id,
      slots: [selectedSlot],
      date: new Date().toISOString().split('T')[0],
      price: court.price,
      userId: user.uid,
      userEmail: user.email,
    };

    bookCourtMutation.mutate(bookingDetails);
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 rounded-xl shadow-md bg-white/80 dark:bg-zinc-900/70">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Courts</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error.message}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg text-white font-semibold">Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-6 md:py-20 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      {/* Animated blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center max-w-4xl mx-auto mb-12">
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300">
              Premium Facilities
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Courts</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Experience our state-of-the-art sports facilities with professional-grade equipment and optimal playing conditions.
          </motion.p>
        </motion.div>

        {/* Grid: 4 per row */}
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {featuredCourts.map((court, index) => (
            <motion.div key={court._id} variants={cardVariants} transition={{ delay: index * 0.1 }} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
              <div className="relative h-full bg-white/80 dark:bg-zinc-800/70 p-6 rounded-xl border border-[#0FB9D7] shadow-sm hover:shadow-md transition-all duration-300">
                <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + index * 0.1 }} src={court.image || 'https://via.placeholder.com/300'} alt={court.type || 'Court Image'} className="h-48 w-full object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-2">{court.type}</h3>
                <p className="text-gray-800 dark:text-gray-200 mb-3">৳{court.price} <span className="text-sm text-gray-500 dark:text-gray-400">per hour</span></p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + index * 0.1 }} className="mb-4">
                  <select value={selectedSlots[court._id] || ''} onChange={(e) => setSelectedSlots({ ...selectedSlots, [court._id]: e.target.value })} className="w-full border border-emerald-500 dark:border-emerald-400 px-3 py-2 rounded-md dark:bg-zinc-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200">
                    <option value="" disabled>Select a slot</option>
                    {court.availableSlots?.length > 0 ? court.availableSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>) : <option value="" disabled>No slots available</option>}
                  </select>
                </motion.div>
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleBookNow(court)} className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900">
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button onClick={() => navigate('/all-courts')} className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900">
            View All Courts
          </button>
        </div>
      </div>

      {/* Blob animation */}
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

export default FeaturedCourts;
