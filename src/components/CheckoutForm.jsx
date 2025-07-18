import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import axiosInstance from "../api/axiosInstance"; // Make sure this path is correct
import "./styles.css";

const CheckoutForm = ({ bookingDetails }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe is not ready. Please wait...");
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/payment-history`,
      },
      redirect: "if_required", // Prevents full redirect unless needed
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Manually send payment result to your backend
      try {
        await axiosInstance.post("/payment-success", {
          bookingId: bookingDetails.bookingId,
          transactionId: paymentIntent.id,
        });

        setMessage("Payment successful! Redirecting...");
        // Optionally redirect manually:
        window.location.href = "/dashboard/payment-history";
      } catch (err) {
        setMessage("Payment succeeded, but failed to save to database.");
        console.error("Payment save error:", err);
      }
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="stripe-button"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : `Pay $${bookingDetails.price}`}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

CheckoutForm.propTypes = {
  bookingDetails: PropTypes.shape({
    price: PropTypes.number.isRequired,
    bookingId: PropTypes.string.isRequired,
  }).isRequired,
};

export default CheckoutForm;
