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

  if (loading)
    return (
      <p className="text-center py-10 text-gray-800 dark:text-gray-200">Loading...</p>
    );

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Helmet>
        <title>Payment History | ActiveArena</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            💳 Payment History
          </h1>
          <button
            onClick={() => setView(view === "table" ? "card" : "table")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            View: {view === "table" ? "Card" : "Table"}
          </button>
        </div>

        {payments.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-400">
            You have no completed payments.
          </p>
        ) : view === "table" ? (
          <div className="overflow-x-auto rounded-t-md border border-gray-300 dark:border-gray-700">
            <table className="min-w-full bg-white dark:bg-zinc-900">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-left">
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Date</th>
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Description</th>
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Amount</th>
                  <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                  >
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                      {payment.date}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                      {payment.description}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                      ৳{payment.amount}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-4 border border-gray-300 dark:border-gray-700"
              >
                <p>
                  <strong>Date:</strong> {payment.date}
                </p>
                <p>
                  <strong>Description:</strong> {payment.description}
                </p>
                <p>
                  <strong>Amount:</strong> ৳{payment.amount}
                </p>
                <p>
                  <strong>Status:</strong> {payment.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
