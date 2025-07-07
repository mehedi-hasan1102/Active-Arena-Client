import { Helmet } from "react-helmet-async";
import React from "react";
import { FaLeaf } from "react-icons/fa";

const About = () => {
  return (
    <section
      className="mt-8 max-w-7xl mx-auto px-6 py-12 rounded-3xl shadow-md
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        transition-colors duration-300"
    >
      <Helmet>
        <title>About - ActiveArena</title>
      </Helmet>
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <FaLeaf className="text-blue-700 dark:text-blue-400 text-4xl" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          About assignment 12
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          Growing plants. Growing people. One leaf at a time.
        </p>
      </div>

      <div className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
        <p>
          Welcome to <span className="font-semibold text-blue-700 dark:text-blue-400">assignment 12</span> —
          your trusted companion in the world of houseplants, gardening, and green well-being.
          Whether you're nurturing a tiny succulent on your desk or managing a lush balcony jungle,
          we’re here to guide you every step of the way.
        </p>

        <p>
          Our mission is to make plant care simple, joyful, and rewarding. With expert-curated tips,
          plant tracking tools, watering reminders, and a thriving plant-lover community, assignment 12
          helps you build a greener, healthier living space.
        </p>

        <p>
          From beginners to seasoned growers, we celebrate every plant parent’s journey.
          Because we believe that nurturing plants is more than just a hobby — it's a way
          to slow down, connect with nature, and.
        </p>

        <p className="italic text-sm text-gray-600 dark:text-gray-400">
          🌱 Join us, and let’s grow together.
        </p>
      </div>
    </section>
  );
};

export default About;
