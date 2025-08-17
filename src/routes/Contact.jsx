

import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);
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
    setFormData({ name: "", email: "", message: "" });
    setIsLoading(false);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-screen p-4
        bg-gradient-to-br from-emerald-50 via-white to-cyan-50
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pt-12"
    >
      <Helmet>
        <title>Contact - ActiveArena</title>
      </Helmet>

      {/* Unified Card */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-4xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
          rounded-2xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
          border border-gray-200 dark:border-zinc-700"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 p-8 md:p-10"
          >
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Have questions? We're here to help!
              </p>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg"
              >
                <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-xl" />
                <p className="text-emerald-700 dark:text-emerald-300">
                  Thank you for reaching out! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg
                      bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
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
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-lg
                      bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                  />
                </div>
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
                    Send Message
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
              src="https://i.ibb.co/tp4VNg2r/Contact-us-amico.png"
              alt="Contact illustration"
              className="w-full max-w-xs h-auto object-contain"
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

export default Contact;