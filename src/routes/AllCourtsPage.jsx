// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/Provider/AuthProvider';
// import CourtBookingModal from '../Components/CourtBookingModal';
// import { useState } from 'react';
// import Loading from '../Components/Loading';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';

// export default function AllCourtsPage() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [selectedCourt, setSelectedCourt] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState('');

//   const { data: courts = [], isLoading, error } = useQuery({
//     queryKey: ['courts'],
//     queryFn: async () => {
//       // Replace this mock API with your real API call
//       return [
//         {
//           _id: '1',
//           type: 'Tennis',
//           price: 500,
//           image: 'https://via.placeholder.com/300',
//           availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM'],
//         },
//         {
//           _id: '2',
//           type: 'Badminton',
//           price: 300,
//           image: 'https://via.placeholder.com/300',
//           availableSlots: ['01:00 PM', '02:00 PM', '03:00 PM'],
//         },
//         {
//           _id: '3',
//           type: 'Squash',
//           price: 400,
//           image: 'https://via.placeholder.com/300',
//           availableSlots: ['04:00 PM', '05:00 PM'],
//         },
//       ];
//     },
//   });

//   const handleBookNow = (court) => {
//     if (!user) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Login Required',
//         text: 'Please log in to book a court.',
//         confirmButtonText: 'Go to Login',
//       }).then(() => navigate('/login'));
//       return;
//     }

//     if (!selectedSlot) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Select a Slot',
//         text: 'Please select a session slot before booking.',
//       });
//       return;
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Slot Selected',
//       text: `You selected ${selectedSlot}. Proceeding to booking modal.`,
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     setSelectedCourt({ ...court, slot: selectedSlot });
//   };

//   if (isLoading) return <Loading />;

//   if (error)
//     return (
//       <div className="text-center text-red-500">
//         An error occurred: {error.message}
//       </div>
//     );

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Helmet>
//         <title>All Courts - ActiveArena</title>
//       </Helmet>

//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400">
//         🏟 Available Courts
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {courts.map((court) => (
//           <div
//             key={court._id}
//             className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between p-4"
//           >
//             <img
//               src={court.image}
//               alt={court.type}
//               className="h-48 w-full object-cover rounded-md mb-4"
//             />
//             <div>
//               <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-1">
//                 {court.type}
//               </h2>
//               <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
//                 Price per session:{' '}
//                 <span className="font-medium text-blue-600 dark:text-blue-400">
//                   ৳{court.price}
//                 </span>
//               </p>

//               <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
//                 Select Slot
//               </label>
//               <select
//                 onChange={(e) => setSelectedSlot(e.target.value)}
//                 className="w-full p-2 border rounded bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white mb-4"
//                 defaultValue=""
//                 aria-label={`Select slot for ${court.type}`}
//               >
//                 <option value="" disabled>
//                   Select a slot
//                 </option>
//                 {court.availableSlots.map((slot) => (
//                   <option key={slot} value={slot}>
//                     {slot}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => handleBookNow(court)}
//                 className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedCourt && (
//         <CourtBookingModal
//           court={selectedCourt}
//           closeModal={() => {
//             setSelectedCourt(null);
//             setSelectedSlot('');
//           }}
//         />
//       )}
//     </div>
//   );
// }
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Provider/AuthProvider';
import CourtBookingModal from '../Components/CourtBookingModal';
import { useState } from 'react';
import Loading from '../Components/Loading';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

export default function AllCourtsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const { data: courts = [], isLoading, error } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/courts'); // your real API URL
      if (!response.ok) {
        throw new Error('Failed to fetch courts');
      }
      const data = await response.json();
      return data.courts || data; // depending on your API response shape
    },
  });

  const handleBookNow = (court) => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to book a court.',
        confirmButtonText: 'Go to Login',
      }).then(() => navigate('/login'));
      return;
    }

    if (!selectedSlot) {
      Swal.fire({
        icon: 'warning',
        title: 'Select a Slot',
        text: 'Please select a session slot before booking.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Slot Selected',
      text: `You selected ${selectedSlot}. Proceeding to booking modal.`,
      showConfirmButton: false,
      timer: 1500,
    });

    setSelectedCourt({ ...court, slot: selectedSlot });
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-red-500">
        An error occurred: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>All Courts - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400">
        🏟 Available Courts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden flex flex-col justify-between p-4"
          >
            <img
              src={court.image}
              alt={court.type}
              className="h-48 w-full object-cover rounded-md mb-4"
            />
            <div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-1">
                {court.type}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Price per session:{' '}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  ৳{court.price}
                </span>
              </p>

              <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                Select Slot
              </label>
              <select
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white mb-4"
                defaultValue=""
                aria-label={`Select slot for ${court.type}`}
              >
                <option value="" disabled>
                  Select a slot
                </option>
                {court.availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleBookNow(court)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCourt && (
        <CourtBookingModal
          court={selectedCourt}
          closeModal={() => {
            setSelectedCourt(null);
            setSelectedSlot('');
          }}
        />
      )}
    </div>
  );
}
