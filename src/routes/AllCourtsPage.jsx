import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Provider/AuthProvider';
import CourtBookingModal from '../Components/CourtBookingModal';
import { useState } from 'react';
import Loading from '../Components/Loading'; // Assuming you have a Loading component

export default function AllCourtsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);

  const { data: courts = [], isLoading, error } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      // This is a mock API call. Replace with your actual API endpoint.
      // I'm returning some dummy data for demonstration purposes.
      return [
        { _id: '1', type: 'Tennis', price: 500, image: 'https://via.placeholder.com/300', availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'] },
        { _id: '2', type: 'Badminton', price: 300, image: 'https://via.placeholder.com/300', availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'] },
        { _id: '3', type: 'Squash', price: 400, image: 'https://via.placeholder.com/300', availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'] },
      ];
    }
  });

  const handleBookNow = (court) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCourt(court);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500">An error occurred: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Courts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courts.map(court => (
          <div key={court._id} className="card shadow-xl p-4 bg-white dark:bg-zinc-800 rounded-lg">
            <img src={court.image} alt={court.type} className="rounded-xl mb-4 h-56 w-full object-cover" />
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">{court.type}</h2>
            <p className="text-zinc-600 dark:text-zinc-300 mb-4">Price per session: ৳{court.price}</p>
            <div className="mb-4">
              <label className="block text-zinc-700 dark:text-zinc-300 mb-2">Select Slot</label>
              <select className="w-full p-2 border rounded">
                {court.availableSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <button onClick={() => handleBookNow(court)} className="btn btn-primary w-full mt-2">Book Now</button>
          </div>
        ))}
      </div>

      {selectedCourt && (
        <CourtBookingModal
          court={selectedCourt}
          closeModal={() => setSelectedCourt(null)}
        />
      )}
    </div>
  );
}