// import React, { useState } from 'react';

// const PaymentHistory = () => {
//   const [view, setView] = useState('table'); // 'table' or 'card'

//   // Mock data for payment history
//   const payments = [
//     { id: 1, date: '2025-06-01', description: 'Court Booking - Tennis', amount: 500, status: 'Completed' },
//     { id: 2, date: '2025-06-05', description: 'Membership Fee', amount: 1500, status: 'Completed' },
//     { id: 3, date: '2025-06-10', description: 'Court Booking - Badminton', amount: 300, status: 'Pending' },
//     { id: 4, date: '2025-06-15', description: 'Court Booking - Squash', amount: 400, status: 'Completed' },
//     { id: 5, date: '2025-06-20', description: 'Pro Shop Purchase', amount: 250, status: 'Completed' },
//   ];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Payment History</h1>

//       <div className="mb-4 flex justify-end">
//         <button
//           onClick={() => setView(view === 'table' ? 'card' : 'table')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           View {view === 'table' ? 'Card' : 'Table'}
//         </button>
//       </div>

//       {view === 'table' ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Date</th>
//                 <th className="py-2 px-4 border-b">Description</th>
//                 <th className="py-2 px-4 border-b">Amount</th>
//                 <th className="py-2 px-4 border-b">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((payment) => (
//                 <tr key={payment.id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b text-center">{payment.date}</td>
//                   <td className="py-2 px-4 border-b text-center">{payment.description}</td>
//                   <td className="py-2 px-4 border-b text-center">৳{payment.amount}</td>
//                   <td className="py-2 px-4 border-b text-center">{payment.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {payments.map((payment) => (
//             <div key={payment.id} className="bg-white p-4 rounded-lg shadow-md">
//               <p><strong>Date:</strong> {payment.date}</p>
//               <p><strong>Description:</strong> {payment.description}</p>
//               <p><strong>Amount:</strong> ৳{payment.amount}</p>
//               <p><strong>Status:</strong> {payment.status}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../context/firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const [view, setView] = useState("table");
  const [payments, setPayments] = useState([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/bookings?userId=${user.uid}&status=Approved&paymentStatus=completed`
        );
        const data = await res.json();
        const formatted = data.bookings.map((b) => ({
          id: b._id,
          date: new Date(b.date).toLocaleDateString("en-GB"),
          description: `Court Booking - ${b.courtName || "Unknown"}`,
          amount: b.price,
          status: b.paymentStatus.charAt(0).toUpperCase() + b.paymentStatus.slice(1),
        }));
        setPayments(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user?.uid]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Payment History | ActiveArena</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            💳 Payment History
          </h1>
          <button
            onClick={() => setView(view === "table" ? "card" : "table")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View: {view === "table" ? "Card" : "Table"}
          </button>
        </div>

        {payments.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            You have no completed payments.
          </p>
        ) : view === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
              <thead>
                <tr className="bg-blue-100 dark:bg-zinc-700 text-left">
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                    <td className="py-2 px-4 border-b">{payment.date}</td>
                    <td className="py-2 px-4 border-b">{payment.description}</td>
                    <td className="py-2 px-4 border-b">৳{payment.amount}</td>
                    <td className="py-2 px-4 border-b">{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {payments.map((payment) => (
              <div key={payment.id} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
                <p><strong>Date:</strong> {payment.date}</p>
                <p><strong>Description:</strong> {payment.description}</p>
                <p><strong>Amount:</strong> ৳{payment.amount}</p>
                <p><strong>Status:</strong> {payment.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
