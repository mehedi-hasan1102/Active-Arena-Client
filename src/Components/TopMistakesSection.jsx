
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaExclamationTriangle } from "react-icons/fa";

const mistakes = [
  {
    title: "Overwatering your plants",
    description:
      "Too much water can lead to root rot and other diseases. Make sure to understand each plant's specific watering needs.",
  },
  {
    title: "Placing plants in low light without proper knowledge",
    description:
      "Not all plants can thrive in low light. Research your plant's light requirements before placement.",
  },
  {
    title: "Ignoring signs of pests or disease",
    description:
      "Yellowing leaves, spots, or holes can be early signs of trouble. Act quickly to treat infestations or infections.",
  },
  {
    title: "Using the wrong soil type",
    description:
      "Soil type affects drainage and nutrient availability. Use appropriate soil mixes for different plant species.",
  },
  {
    title: "Not repotting when needed",
    description:
      "Plants outgrow their pots over time. Repotting allows roots to expand and supports healthier growth.",
  },
];

const TopMistakesSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-14  shadow-lg
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 tracking-wide">
          Top Plant Care Mistakes
        </h2>
        <p className="text-gray-700 dark:text-gray-400 mt-3 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Avoid these common pitfalls to keep your plants healthy and thriving.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {mistakes.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-700 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => toggleCollapse(idx)}
              className="w-full flex items-center justify-between text-lg font-semibold text-blue-800 dark:text-blue-300 focus:outline-none rounded-md"
              aria-expanded={openIndex === idx}
              aria-controls={`desc-${idx}`}
            >
              <span className="flex items-center gap-3">
                <FaExclamationTriangle className="text-blue-500 dark:text-blue-400" />
                {item.title}
              </span>
              {openIndex === idx ? (
                <FaChevronUp className="text-gray-500 dark:text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {openIndex === idx && (
              <p
                id={`desc-${idx}`}
                className="mt-4 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed"
              >
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopMistakesSection;
