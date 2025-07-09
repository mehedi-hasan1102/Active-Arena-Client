import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a court session?",
    answer: "Visit the Courts page, choose your preferred time slot, and submit a booking request. Your booking will be marked as pending until approved by the admin.",
  },
  {
    question: "Can I cancel a pending or approved booking?",
    answer: "Yes, go to your dashboard > Pending or Approved bookings section, and click the cancel button to remove the request.",
  },
  {
    question: "How do I apply a discount coupon during payment?",
    answer: "On the payment page, enter the coupon code in the 'Apply Coupon' section. If the code is valid, the price will be automatically adjusted.",
  },
];

const Support = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-12
      bg-gradient-to-br from-blue-50 via-white to-blue-100
      dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
      transition-colors duration-300"
    >
      <Helmet>
        <title>Support - ActiveArena</title>
      </Helmet>

      {/* Left Column */}
      <div className="w-full md:w-1/2 max-w-xl bg-white dark:bg-zinc-900 p-10 rounded-xl shadow-lg dark:shadow-blue-800/40 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            Help & Support
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Browse FAQs or contact our team if you need personalized help.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="border border-blue-200 dark:border-blue-600 rounded-md bg-white dark:bg-zinc-800"
            >
              <button
                onClick={() => toggleCollapse(idx)}
                className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-blue-700 dark:text-blue-300 font-semibold">
                  {item.question}
                </span>
                {openIndex === idx ? (
                  <FaChevronUp className="text-gray-500 dark:text-gray-300" />
                ) : (
                  <FaChevronDown className="text-gray-500 dark:text-gray-300" />
                )}
              </button>
              {openIndex === idx && (
                <div
                  id={`faq-panel-${idx}`}
                  className="px-5 pb-4 text-gray-600 dark:text-gray-300 text-sm"
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
            Still need help?
          </h3>

          {submitted && (
            <p className="text-blue-600 dark:text-blue-300 text-sm font-medium">
              ✅ Thanks for reaching out! We'll contact you shortly.
            </p>
          )}

          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-blue-600 rounded-md dark:bg-zinc-800 dark:border-blue-500 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <textarea
            name="message"
            required
            rows="4"
            placeholder="Write your issue here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-blue-600 rounded-md dark:bg-zinc-800 dark:border-blue-500 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Right Column: Illustration */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/k2MQLycF/Active-Support-bro.png"
          alt="Support"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Support;
