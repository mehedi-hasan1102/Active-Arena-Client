
import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const AllPlantsDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get(
          "https://project-web-b11-a10-plant-care-serv.vercel.app/plants"
        );
        setPlants(res.data);
      } catch (err) {
        Swal.fire({
          title: "Failed to fetch plants",
          icon: "error",
          draggable: true,
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#f3f4f6" : "#111",
        });
        console.error("Error fetching plants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500 py-10 px-4">
      <Helmet>
        <title>All Plants Dashboard - ActiveArena</title>
      </Helmet>
      <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-md shadow-xl dark:shadow-blue-800/30 p-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 text-center">
          All Plants Dashboard
        </h1>

        {plants.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg py-20">
            No plants found.
          </p>
        ) : (
          <>
            {/* ✅ Desktop Table Layout */}
            <div className="overflow-x-auto rounded-md hidden md:block">
              <table className="min-w-full text-left text-sm text-gray-700 dark:text-gray-300 border-collapse border border-gray-200 dark:border-zinc-700 rounded-md">
                <thead className="bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-100 rounded-t-md">
                  <tr>
                    <th className="p-4 font-semibold rounded-tl-md">Plant Name</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Watering Frequency</th>
                    <th className="p-4 font-semibold rounded-tr-md">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map((plant, idx) => (
                    <tr
                      key={plant._id}
                      className={`border-t border-gray-200 dark:border-zinc-700 ${
                        idx % 2 === 0
                          ? "bg-blue-50 dark:bg-zinc-700"
                          : "bg-white dark:bg-zinc-800"
                      } hover:bg-blue-100 dark:hover:bg-blue-900 transition`}
                    >
                      <td className="p-4 font-semibold">{plant.plantName}</td>
                      <td className="p-4 capitalize">{plant.category}</td>
                      <td className="p-4">{plant.wateringFrequency}</td>
                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/dashboard/plant-details/${plant._id}`)}
                          className="btn btn-info btn-sm text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md"
                          aria-label={`View details of ${plant.plantName}`}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Card Layout */}
            <div className="md:hidden space-y-6 mt-6">
              {plants.map((plant) => (
                <div
                  key={plant._id}
                  className="bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-700 rounded-md shadow p-5"
                >
                  {/* 🌿 Image */}
                  <img
                    src={plant.image || "https://via.placeholder.com/300x200?text=Plant+Image"}
                    alt={plant.plantName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />

                  {/* 📝 Info */}
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">
                    {plant.plantName}
                  </h3>
                  <div className="text-sm space-y-2 text-gray-800 dark:text-gray-300">
                    <p>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Category:</span>{" "}
                      <span className="capitalize">{plant.category}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Watering:</span>{" "}
                      {plant.wateringFrequency}
                    </p>
                  </div>

                  {/* 🔘 Button */}
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => navigate(`/dashboard/plant-details/${plant._id}`)}
                      className="btn btn-info btn-sm text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md px-5 py-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllPlantsDashboard;
