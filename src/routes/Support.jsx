import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaPaperPlane } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setFormData({ email: "", message: "" });
    setIsLoading(false);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-screen p-4
         pt-12"
    >
      <Helmet>
        <title>Support - ActiveArena</title>
      </Helmet>

      {/* Unified Card */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-6xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
          rounded-2xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
          border border-gray-200 dark:border-zinc-700"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10"
          >
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                Help & Support
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Browse FAQs or contact our team for personalized help
              </p>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4 mb-10">
              {faqs.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleCollapse(idx)}
                    className="w-full px-4 py-3 flex justify-between items-center text-left
                      bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {item.question}
                    </span>
                    {openIndex === idx ? (
                      <FaChevronUp className="text-gray-500 dark:text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="px-4 overflow-hidden"
                    >
                      <div className="py-3 text-gray-600 dark:text-gray-300 text-sm">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                Still need help?
              </h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg"
                >
                  <FaPaperPlane className="text-emerald-600 dark:text-emerald-400" />
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                    Thanks for reaching out! We'll contact you shortly.
                  </p>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg
                    bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="Describe your issue..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg
                    bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600
                  text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all
                  flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FaPaperPlane className="text-lg" />
                    Submit Ticket
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-emerald-100 to-cyan-100
              dark:from-emerald-900/30 dark:to-cyan-900/30 p-8 flex items-center justify-center"
          >
            <motion.img
              src="https://i.ibb.co/k2MQLycF/Active-Support-bro.png"
              alt="Support illustration"
              className="w-full max-w-md h-auto object-contain"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Support;