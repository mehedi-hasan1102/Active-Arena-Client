import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../context/firebase/firebase.config";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm";
import axiosInstance from "../../../api/axiosInstance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const stateData = location.state?.booking;
    if (!stateData) {
      Swal.fire("Error", "No booking information found.", "error");
      navigate("/dashboard/my-bookings");
    } else {
      setBooking(stateData);
      setFinalPrice(stateData.price);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (finalPrice > 0 && booking?._id) {
      axiosInstance
        .post("/create-payment-intent", {
          price: finalPrice,
          bookingId: booking._id,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          Swal.fire(
            "Error",
            "Could not initialize payment. Please try again.",
            "error"
          );
        });
    }
  }, [finalPrice, booking]);

  const handleApplyCoupon = async () => {
    if (!coupon)
      return Swal.fire("Oops!", "Please enter a coupon code.", "warning");
    if (couponApplied)
      return Swal.fire("Info", "A coupon has already been applied.", "info");

    try {
      const res = await axiosInstance.post("/validate-coupon", { code: coupon });
      const { discount } = res.data;

      const discountAmount = (booking.price * discount) / 100;
      setFinalPrice(booking.price - discountAmount);
      setCouponApplied(true);

      Swal.fire(
        "Success!",
        `Coupon applied! You saved ${discountAmount.toFixed(2)}.`,
        "success"
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to apply coupon.";
      Swal.fire("Invalid Coupon", errorMessage, "error");
    }
  };

  if (!booking) {
    return (
      <div className="text-center py-10 text-gray-800 dark:text-gray-200">
        <p>Loading booking details...</p>
      </div>
    );
  }

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Helmet>
        <title>Payment | ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        💳 Complete Your Payment
      </h1>

      {/* Booking Summary */}
      <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200">
          Booking Summary
        </h2>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="text"
            readOnly
            value={user?.email || ""}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Court
          </label>
          <input
            type="text"
            readOnly
            value={booking.courtName}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date & Slots
          </label>
          <input
            type="text"
            readOnly
            value={`${new Date(booking.date).toLocaleDateString()} - ${booking.slots.join(", ")}`}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <div className="pt-2">
          <label className="block font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
            Total Price
          </label>
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">
            ${finalPrice.toFixed(2)}
          </p>
          {couponApplied && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              (Original Price: ${booking.price.toFixed(2)})
            </p>
          )}
        </div>
      </div>

      {/* Coupon Code Input */}
      {!couponApplied && (
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            Have a Coupon?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-grow bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              onClick={handleApplyCoupon}
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Stripe Payment Form */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm bookingDetails={{ price: finalPrice }} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
