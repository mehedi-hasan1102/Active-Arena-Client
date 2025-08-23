
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
import Loading from "../../../components/Loading";

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
    if (!coupon) {
      return Swal.fire("Oops!", "Please enter a coupon code.", "warning");
    }
    if (couponApplied) {
      return Swal.fire("Info", "A coupon has already been applied.", "info");
    }

    try {
      const res = await axiosInstance.post("/validate-coupon", {
        code: coupon,
      });
      const { discount } = res.data;

      const discountAmount = (booking.price * discount) / 100;
      setFinalPrice(booking.price - discountAmount);
      setCouponApplied(true); // Mark coupon as applied

      Swal.fire(
        "Success!",
        `Coupon applied! You received a ${discount}% discount.`,
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
     < Loading />
    );
  }

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
      <Helmet>
        <title>Payment | ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-6">
        💳 Complete Your Payment
      </h1>

      {/* Booking Summary */}
      <div className="space-y-4 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-6 rounded-lg shadow-md mb-6 border border-emerald-200 dark:border-emerald-700">
        <h2 className="text-xl font-semibold border-b border-emerald-300 dark:border-emerald-700 pb-2 text-emerald-600 dark:text-emerald-400">
          Booking Summary
        </h2>

        <div>
          <label className="block font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            Email
          </label>
          <input
            type="text"
            readOnly
            value={user?.email || ""}
            className="w-full bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 border border-emerald-300 dark:border-emerald-700 rounded-md p-2 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600"
          />
        </div>

        <div>
          <label className="block font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            Court
          </label>
          <input
            type="text"
            readOnly
            value={booking.courtName}
            className="w-full bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 border border-emerald-300 dark:border-emerald-700 rounded-md p-2 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600"
          />
        </div>

        <div>
          <label className="block font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            Date & Slots
          </label>
          <input
            type="text"
            readOnly
            value={`${new Date(booking.date).toLocaleDateString()} - ${booking.slots.join(", ")}`}
            className="w-full bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 border border-emerald-300 dark:border-emerald-700 rounded-md p-2 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600"
          />
        </div>

        <div className="pt-2">
          <label className="block font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-1">
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
          <label className="block mb-1 font-semibold text-emerald-600 dark:text-emerald-400">
            Have a Coupon?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-grow bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 border border-emerald-300 dark:border-emerald-700 rounded-md p-2 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600"
            />
            <button
              onClick={handleApplyCoupon}
              type="button"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Stripe Payment Form */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* <CheckoutForm bookingDetails={{ price: finalPrice }} /> */}
          <CheckoutForm bookingDetails={{ price: finalPrice, bookingId: booking._id }} />

        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
