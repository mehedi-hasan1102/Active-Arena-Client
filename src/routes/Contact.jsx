import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-10
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        transition-colors duration-300"
    >
      <Helmet>
        <title>Contact - ActiveArena</title>
      </Helmet>
      {/* Contact Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white dark:bg-zinc-900 shadow-md dark:shadow-blue-800/30 p-10 rounded-md space-y-6">
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
          Contact Us
        </h2>

        {submitted && (
          <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400 font-medium">
            <FaCheckCircle className="text-xl" />
            <p>Thank you for reaching out! We'll get back to you soon.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full px-5 py-3 border border-blue-700 rounded-md
              dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-5 py-3 border border-blue-700 rounded-md
              dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message"
            rows="4"
            className="w-full px-5 py-3 border border-blue-700 rounded-md
              dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/tp4VNg2r/Contact-us-amico.png"
          alt="Contact illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Contact;
