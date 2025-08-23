import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Provider/AuthProvider';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Loading from '../components/Loading';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import axiosInstance from '../api/axiosInstance';

export default function AllCourtsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSlots, setSelectedSlots] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('card');
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const itemsPerPage = view === 'card' ? 4 : 4;
  const queryClient = useQueryClient();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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
    hidden: { scale: 0.96, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const { data: courts = [], isLoading, error } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const response = await axiosInstance.get('/courts');
      return response.data.courts || response.data;
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
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

  const totalPages = Math.ceil(courts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourts = courts.slice(startIndex, startIndex + itemsPerPage);

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
        <div className="max-w-7xl mx-auto text-center py-12 px-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Courts</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (


   


     <div
      ref={sectionRef}
      className="relative py-16 px-6 md:py-20 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >


      {/* Animated background elements */}
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
        <Helmet><title>All Courts - ActiveArena</title></Helmet>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 transition-colors duration-300 shadow-sm">
              Sports Facilities
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Courts</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Book our professional-grade sports facilities with optimal playing conditions
          </motion.p>
        </motion.div>

        {/* View Toggle */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="flex space-x-2 bg-gray-200 dark:bg-zinc-700 p-1 rounded-full">
            
<div className="relative inline-flex p-1 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-full shadow-sm text-sm w-44">
  {/* Sliding indicator */}
  <div
    className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 rounded-full shadow-md transition-all duration-300 transform ${
      view === 'table' ? 'translate-x-full' : ''
    }`}
  ></div>

  {/* Card Button */}
  <button
    onClick={() => setView('card')}
    className={`relative z-10 flex-1 text-center py-2 font-semibold transition-colors duration-300 ${
      view === 'card'
        ? 'text-white dark:text-gray-900'
        : 'text-gray-600 dark:text-gray-300'
    }`}
  >
    Card
  </button>

  {/* Table Button */}
  <button
    onClick={() => setView('table')}
    className={`relative z-10 flex-1 text-center py-2 font-semibold transition-colors duration-300 ${
      view === 'table'
        ? 'text-white dark:text-gray-900'
        : 'text-gray-600 dark:text-gray-300'
    }`}
  >
    Table
  </button>
</div>


          </div>
        </motion.div>

        {view === 'card' ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"

          >
            {currentCourts.map((court, index) => (
              <motion.div
                key={court._id}
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition-all duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
                <div className="relative h-full bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    src={court.image || '/images/court-placeholder.jpg'}
                    alt={court.type || 'Court Image'}
                    className="h-48 w-full object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-2">{court.type}</h2>
                  <p className="text-gray-800 dark:text-gray-200 mb-3">
                    <span className="font-bold text-lg">৳{court.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">per hour</span>
                  </p>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="mb-4"
                  >
                    <select
                      onChange={e => setSelectedSlots({ ...selectedSlots, [court._id]: e.target.value })}
                      value={selectedSlots[court._id] || ''}
                      className="w-full border border-emerald-500 dark:border-emerald-400 px-3 py-2 rounded-md text-gray-800 dark:text-gray-200 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
                    >
                      <option value="" disabled>Select a slot</option>
                      {court.availableSlots?.length > 0 ? (
                        court.availableSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))
                      ) : (
                        <option value="" disabled>No slots available</option>
                      )}
                    </select>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleBookNow(court)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white py-2 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="overflow-x-auto rounded-xl shadow-md border border-emerald-200 dark:border-emerald-700 overflow-hidden"
          >
            <table className="w-full border-collapse text-sm">
              <thead className="bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Available Slots</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                {currentCourts.map((court) => (
                  <tr
                    key={court._id}
                    className="even:bg-emerald-50 dark:even:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-700 dark:text-emerald-400">{court.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">৳{court.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {court.availableSlots?.join(', ') || 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <select
                          onChange={e => setSelectedSlots({ ...selectedSlots, [court._id]: e.target.value })}
                          value={selectedSlots[court._id] || ''}
                          className="border border-emerald-500 dark:border-emerald-400 px-3 py-1 rounded-md text-gray-800 dark:text-gray-200 dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
                        >
                          <option value="" disabled>Select slot</option>
                          {court.availableSlots?.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleBookNow(court)}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-md font-medium transition-all duration-300 shadow-sm"
                        >
                          Book
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8 space-x-2"
          >
            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600'
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </motion.div>
        )}
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
    </div>
  );
}