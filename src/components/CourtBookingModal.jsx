import React, { useState } from 'react';
import { useAuth } from '../context/Provider/AuthProvider';
import { toast } from 'react-toastify';

const CourtBookingModal = ({ court, closeModal }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  if (!court) return null;

  const handleSlotChange = (slot) => {
    const newSelectedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter(s => s !== slot)
      : [...selectedSlots, slot];
    setSelectedSlots(newSelectedSlots);
    setTotalPrice(newSelectedSlots.length * (court.price || 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.userId) {
      toast.error('You must be logged in to book a court.');
      return;
    }

    if (!selectedDate || selectedSlots.length === 0) {
      toast.error('Please select a date and at least one slot.');
      return;
    }

    const bookingDetails = {
      courtId: court._id,
      courtType: court.courtType || 'Unknown',
      date: selectedDate,
      slots: selectedSlots,
      price: totalPrice,
      userId: user.userId,
      status: 'pending',
       userEmail: user.email,
    };

    try {
      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        toast.success('Booking request sent successfully!');
        closeModal();
      } else {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const err = isJson ? await response.json() : { error: 'Unknown error occurred.' };
        toast.error(err.error || 'Failed to send booking request.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred while sending the booking request.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Book {court.courtType || 'Court'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300">Court Type</label>
            <input
              type="text"
              value={court.courtType || 'Unknown'}
              readOnly
              className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300">Price per Session</label>
            <input
              type="text"
              value={`৳${court.price || 0}`}
              readOnly
              className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300">Available Slots</label>
            <div className="grid grid-cols-3 gap-2">
              {(court.availableSlots || []).map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleSlotChange(slot)}
                  className={`p-2 border rounded text-center ${
                    selectedSlots.includes(slot)
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300">Total Price</label>
            <input
              type="text"
              value={`৳${totalPrice}`}
              readOnly
              className="w-full p-2 border rounded bg-zinc-100 dark:bg-zinc-700"
            />
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button type="button" onClick={closeModal} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourtBookingModal;
