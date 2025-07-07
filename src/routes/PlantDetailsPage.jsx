import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import NextWateringReminder from "../Components/NextWateringReminder";
import Loading from "../Components/Loading";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const PlantDetailsPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await fetch(
          `https://project-web-b11-a10-plant-care-serv.vercel.app/plants/${id}`
        );
        const data = await res.json();
        setPlant(data);
      } catch (error) {
        console.error("Failed to fetch plant data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!plant) {
    return <div>Plant not found</div>;
  }

  const wateringFreq = Number(plant.wateringFrequency) || 1;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen
      bg-gradient-to-br from-blue-50 via-white to-blue-100
      dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
      transition-colors duration-300 py-10 px-6 flex flex-col items-center"
    >
      <Helmet>
        <title>{plant.plantName} Details - ActiveArena</title>
      </Helmet>

      <Motion.div
        className="max-w-5xl w-full
          bg-white dark:bg-zinc-900
          rounded-md shadow-lg shadow-blue-200/50 dark:shadow-blue-600/50
          p-8 ring-1 ring-blue-100 dark:ring-blue-700"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400
          mb-8 text-center tracking-tight drop-shadow-md"
        >
          Plant Details
        </h2>

        {/* Plant Image */}
        <div
          className="w-full h-80 md:h-96 rounded-md overflow-hidden mb-8
          shadow-lg border-4 border-blue-200 dark:border-blue-700
          transition-transform duration-300 hover:scale-105 cursor-auto"
        >
          <img
            src={
              plant.image || "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={plant.plantName || "Plant Image"}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Plant Name */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-300
          mb-8 text-center tracking-wide"
        >
          {plant.plantName}
        </h1>

        {/* Divider */}
        <hr className="border-blue-200 dark:border-blue-700 mb-10" />

        {/* Plant Info Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8
          text-gray-800 dark:text-gray-300 text-lg leading-relaxed"
        >
          <section>
            <p className="mb-5">
              <span className="font-semibold text-blue-700 dark:text-blue-400  tracking-wide">
                Category:
              </span>{" "}
              <span className="capitalize">{plant.category}</span>
            </p>

            <article className="prose prose-blue dark:prose-invert prose-lg max-w-none mb-6">
              <h3 className="font-semibold text-blue-700 dark:text-sky-400 mb-2">
                Description:
              </h3>
              <p>{plant.description}</p>
            </article>

            <p className="mb-5">
              <span className="font-semibold text-blue-700 dark:text-blue-400  tracking-wide">
                Care Level:
              </span>{" "}
              {plant.careLevel}
            </p>
          </section>

          <section>
            <p className="mb-5">
              <span className="font-semibold text-blue-700 dark:text-blue-400 tracking-wide">
                Watering Frequency:
              </span>{" "}
              Every {wateringFreq} day{wateringFreq > 1 ? "s" : ""}
            </p>

            <p className="mb-5">
              <span className="font-semibold text-blue-700 dark:text-blue-400 tracking-wide">
                Last Watered:
              </span>{" "}
              {formatDate(plant.lastWateredDate)}
            </p>

            <p>
              <span className="font-semibold text-blue-700 dark:text-blue-400 tracking-wide">
                Health Status:
              </span>{" "}
              {plant.healthStatus || "N/A"}
            </p>
          </section>
        </div>

        <p className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400 italic tracking-wide break-words overflow-hidden">
          <strong>Added by:</strong> {plant.email || "No email"}
        </p>
      </Motion.div>

      {/* Next Watering Reminder */}
      <div className="max-w-5xl w-full mt-16">
        <NextWateringReminder
          plantName={plant.plantName}
          lastWateredDate={plant.lastWateredDate}
          wateringIntervalDays={wateringFreq}
        />
      </div>
    </div>
  );
};

export default PlantDetailsPage;
