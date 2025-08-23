import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../context/firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import Loading from "../../../components/Loading";
import axiosInstance from '../../../api/axiosInstance';

const PaymentHistory = () => {
  const [view, setView] = useState("table");
  const [payments, setPayments] = useState([]);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchPayments = async () => {
      try {
        const res = await axiosInstance.get(
          `/bookings?userId=${user.uid}&paymentStatus=paid`
        );

        if (res.status !== 200) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = res.data;
        const bookings = data.bookings || [];

        const formatted = bookings.map((b) => ({
          id: b._id,
          date: new Date(b.date).toLocaleDateString("en-GB"),
          description: `Court Booking - ${b.courtName || "Unknown"}`,
          amount: b.price,
          status: b.paymentStatus?.charAt(0).toUpperCase() + b.paymentStatus.slice(1),
          transactionId: b.transactionId || "N/A",
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

  if (loading) {
    return (
      < Loading />
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
      <Helmet>
        <title>Payment History | ActiveArena</title>
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              💳 Payment History
            </h1>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Logged in as: <span className="font-medium">{user?.email}</span>
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex space-x-2 bg-emerald-50 dark:bg-zinc-900 p-1 rounded-md">
            <button
              onClick={() => setView("card")}
              className={`px-4 py-2 rounded-md font-medium transition ${
                view === "card"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow"
                  : "text-emerald-600 dark:text-emerald-400 hover:text-emerald-600"
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-4 py-2 rounded-md font-medium transition ${
                view === "table"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow"
                  : "text-emerald-600 dark:text-emerald-400 hover:text-emerald-600"
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Payment Content */}
        {payments.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-400">
            You have no completed payments.
          </p>
        ) : view === "table" ? (
          <div className="overflow-x-auto border border-emerald-300 dark:border-emerald-700 rounded-md">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-emerald-50 dark:bg-zinc-900 text-left">
                  <th className="py-3 px-4 border-b dark:border-emerald-700">Date</th>
                  <th className="py-3 px-4 border-b dark:border-emerald-700">Description</th>
                  <th className="py-3 px-4 border-b dark:border-emerald-700">Amount</th>
                  <th className="py-3 px-4 border-b dark:border-emerald-700">Transaction ID</th>
                  <th className="py-3 px-4 border-b dark:border-emerald-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-emerald-50 dark:hover:bg-zinc-900 transition"
                  >
                    <td className="py-3 px-4 border-b dark:border-emerald-700">
                      {payment.date}
                    </td>
                    <td className="py-3 px-4 border-b dark:border-emerald-700">
                      {payment.description}
                    </td>
                    <td className="py-3 px-4 border-b dark:border-emerald-700">
                      ৳{payment.amount}
                    </td>
                    <td className="py-3 px-4 border-b dark:border-emerald-700">
                      {payment.transactionId}
                    </td>
                    <td className="py-3 px-4 border-b dark:border-emerald-700">
                      <span className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-md text-xs font-semibold">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700 rounded-lg shadow-md p-5 space-y-2"
              >
                <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  {payment.description}
                </div>
                <p>
                  <span className="font-medium">Date:</span> {payment.date}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> ৳{payment.amount}
                </p>
                <p>
                  <span className="font-medium">Transaction ID:</span> {payment.transactionId}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-md text-xs font-semibold">
                    {payment.status}
                  </span>
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