
import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I add a new plant?",
    answer:
      "Go to the 'Add Plant' section in the dashboard and fill out the required details about your plant.",
  },
  {
    question: "Can I edit or delete my plants?",
    answer:
      "Yes, you can manage your plants in the 'My Plants' section, where you can update or remove entries.",
  },
  {
    question: "How do I change the app theme?",
    answer:
      "Use the toggle switch at the bottom of the sidebar to switch between light and dark mode.",
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
      {/* Left: Form + FAQs */}
      <div className="w-full md:w-1/2 max-w-xl bg-white dark:bg-zinc-900 p-10 rounded-md shadow-md dark:shadow-blue-800/30 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
            Support & Help
          </h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            Find answers to your questions or get in touch with us below.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-zinc-800 shadow-sm"
            >
              <button
                onClick={() => toggleCollapse(idx)}
                className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-blue-700 dark:text-blue-400 font-semibold text-base">
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
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
              ✅ Thanks for reaching out! We’ll get back to you soon.
            </p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-5 py-3 border border-blue-700 rounded-md dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Describe your issue or question"
            rows="4"
            className="w-full px-5 py-3 border border-blue-700 rounded-md dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right: Illustration */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/k2MQLycF/Active-Support-bro.png"
          alt="Support illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Support;
