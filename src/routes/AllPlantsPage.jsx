import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const AllPlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get(
          "https://project-web-b11-a10-plant-care-serv.vercel.app/plants"
        );
        setPlants(res.data);
        setFilteredPlants(res.data);
      } catch (err) {
        Swal.fire({
          title: "Failed to fetch plants",
          icon: "error",
          draggable: true,
        });
        console.error("Error fetching plants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    let updatedPlants = [...plants];

    if (categoryFilter !== "all") {
      updatedPlants = updatedPlants.filter(
        (plant) => plant.category === categoryFilter
      );
    }

    updatedPlants.sort((a, b) => {
      if (a.plantName.toLowerCase() < b.plantName.toLowerCase()) return sortOrder === "asc" ? -1 : 1;
      if (a.plantName.toLowerCase() > b.plantName.toLowerCase()) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredPlants(updatedPlants);
  }, [plants, sortOrder, categoryFilter]);

  const categories = ["all", ...new Set(plants.map((p) => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loading />
      </div>
    );
  }

  return (
    <section
      className="mt-8 max-w-7xl mx-auto px-6 py-12 rounded-md shadow-md
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        transition-colors duration-300"
    >
      <Helmet>
        <title>All Plants - ActiveArena</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-10 text-center">
        All Plants
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
            Sort by Name:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full max-w-xs px-4 py-2 rounded-md border border-blue-400
              dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500
              transition"
          >
            <option value="asc">Ascending (A-Z)</option>
            <option value="desc">Descending (Z-A)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-semibold">
            Filter by Category:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full max-w-xs px-4 py-2 rounded-md border border-blue-400
              dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500
              transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all"
                  ? "All Categories"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No plants found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlants.map((plant) => (
            <article
              key={plant._id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-md shadow-md
                border border-blue-200 dark:border-blue-700
                flex flex-col hover:shadow-lg transition"
            >
              {plant.image && (
                <img
                  src={plant.image}
                  alt={plant.plantName || "Plant"}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-md mb-5 hover:scale-105 transition-transform duration-300"
                />
              )}

              <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-300 mb-2">
                {plant.plantName}
              </h3>

              <span
                className="inline-block bg-blue-100 dark:bg-blue-900
                text-blue-800 dark:text-blue-200 px-4 py-1 rounded-md text-sm mb-4"
              >
                {plant.category
                  ? plant.category.charAt(0).toUpperCase() + plant.category.slice(1)
                  : "No category"}
              </span>

              <p className="text-gray-700 dark:text-gray-300 flex-grow mb-6 leading-relaxed line-clamp-3 rounded-md">
                {plant.description || "No description available."}
              </p>

              <button
                onClick={() => navigate(`/dashboard/plant-details/${plant._id}`)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                View Details
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPlantsPage;
