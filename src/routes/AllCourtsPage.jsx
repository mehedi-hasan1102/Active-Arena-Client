
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Provider/AuthProvider';
import { useState } from 'react';
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

  const itemsPerPage = view === 'card' ? 6 : 10;
  const queryClient = useQueryClient();

  const { data: courts = [], isLoading, error } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const response = await axiosInstance.get('/courts');
      return response.data.courts || response.data;
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

  const totalPages = Math.ceil(courts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourts = courts.slice(startIndex, startIndex + itemsPerPage);

  const handleBookNow = (court) => {
    if (!user) {
      const isDark = document.documentElement.classList.contains('dark');
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
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
  if (error) return <div className="text-center text-red-500 dark:text-red-400">Error: {error.message}</div>;

  return (
    <div
      className="min-h-screen px-4 py-10
      bg-gradient-to-br from-blue-50 via-white to-blue-100
      dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
      transition-colors duration-300"
    >
      <Helmet><title>All Courts - ActiveArena</title></Helmet>

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400">🏟 Available Courts</h1>

     <div className="flex justify-center mb-4">
  <div className="flex space-x-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
    <button
      onClick={() => setView('card')}
      className={`px-4 py-2 rounded-full transition duration-200 ${
        view === 'card' ? 'bg-white dark:bg-gray-900' : 'text-gray-600 dark:text-gray-300'
      }`}
    >
      Card View
    </button>
    <button
      onClick={() => setView('table')}
      className={`px-4 py-2 rounded-full transition duration-200 ${
        view === 'table' ? 'bg-white dark:bg-gray-900' : 'text-gray-600 dark:text-gray-300'
      }`}
    >
      Table View
    </button>
  </div>
</div>


      {view === 'card' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourts.map(court => (
            <div key={court._id} className="p-4 bg-white dark:bg-zinc-900 shadow-md dark:shadow-blue-800/20 rounded-md transition">
              <img
                src={court.image || 'https://via.placeholder.com/300'}
                alt={court.type || 'Court Image'}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">{court.type}</h2>
              <p className="text-gray-800 dark:text-blue-200 mb-2">৳{court.price}</p>
              <select
                onChange={e => setSelectedSlots({ ...selectedSlots, [court._id]: e.target.value })}
                value={selectedSlots[court._id] || ''}
                className="w-full border border-blue-700 dark:border-blue-400 px-3 py-2 rounded mb-2 
                  dark:bg-zinc-800 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              <button
                onClick={() => handleBookNow(court)}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white dark:bg-zinc-900 text-blue-800 dark:text-blue-300">
            <thead className="bg-blue-100 dark:bg-zinc-800">
              <tr>
                <th className="border p-2">Type</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Slots</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCourts.map(court => (
                <tr key={court._id}>
                  <td className="border p-2">{court.type}</td>
                  <td className="border p-2">৳{court.price}</td>
                  <td className="border p-2">{(court.availableSlots || []).join(', ')}</td>
                  <td className="border p-2">
                    <select
                      onChange={e => setSelectedSlots({ ...selectedSlots, [court._id]: e.target.value })}
                      value={selectedSlots[court._id] || ''}
                      className="border p-1 rounded dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300"
                    >
                      <option value="" disabled>Select</option>
                      {court.availableSlots?.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleBookNow(court)}
                      className="ml-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded transition"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded font-semibold transition ${
              currentPage === i + 1
                ? 'bg-blue-700 text-white'
                : 'bg-gray-300 dark:bg-zinc-700 dark:text-blue-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
