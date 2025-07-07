import { Helmet } from "react-helmet-async";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePlant = () => {
  const {
    _id,
    plantName,
    category,
    description,
    careLevel,
    healthStatus,
    nextWateringDate,
    lastWateredDate,
    wateringFrequency,
  } = useLoaderData();

  const handleFormUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    fetch(`https://project-web-b11-a10-plant-care-serv.vercel.app/plants-update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          Swal.fire({
            title: "Update Successfully!",
            icon: "success",
            draggable: true,
            background: document.documentElement.classList.contains("dark")
              ? "#18181b"
              : "#fff",
            color: document.documentElement.classList.contains("dark")
              ? "#4ade80"
              : "#166534",
          });
        }
      });
  };

  return (
    <div
      className="bg-gradient-to-r from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        p-8 min-h-screen transition-colors duration-300"
    >
      <Helmet>
        <title>Update Plant - ActiveArena</title>
      </Helmet>
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-lg shadow-blue-200/50 dark:shadow-blue-600/50 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400">
          Update Plant
        </h2>
        <form onSubmit={handleFormUpdate} className="space-y-6">
          {/* Plant Image */}
          <div>
            <label className="block font-semibold mb-2">Plant Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/plant.jpg"
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <label className="block font-semibold mt-6 mb-2">Plant Name</label>
            <input
              type="text"
              name="plantName"
              defaultValue={plantName}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <select
              name="category"
              defaultValue={category}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select a category</option>
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flowering">Flowering</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={description}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              rows="3"
            />
          </div>

          {/* Care Level */}
          <div>
            <label className="block font-semibold mb-2">Care Level</label>
            <select
              name="careLevel"
              defaultValue={careLevel}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select care level</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>

          {/* Watering Frequency */}
          <div>
            <label className="block font-semibold mb-2">Watering Frequency</label>
            <input
              type="text"
              name="wateringFrequency"
              defaultValue={wateringFrequency}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Last Watered Date */}
          <div>
            <label className="block font-semibold mb-2">Last Watered Date</label>
            <input
              type="date"
              name="lastWateredDate"
              defaultValue={lastWateredDate ? lastWateredDate.slice(0, 10) : ""}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Next Watering Date */}
          <div>
            <label className="block font-semibold mb-2">Next Watering Date</label>
            <input
              type="date"
              name="nextWateringDate"
              defaultValue={nextWateringDate ? nextWateringDate.slice(0, 10) : ""}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Health Status */}
          <div>
            <label className="block font-semibold mb-2">Health Status</label>
            <input
              type="text"
              name="healthStatus"
              defaultValue={healthStatus}
              className="w-full p-3 border border-blue-700 rounded-2xl
                dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md transition"
            >
              Update Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlant;
