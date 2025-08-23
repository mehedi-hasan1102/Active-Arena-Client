
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { useRole } from "../../hooks/useRole";
import { useAuth } from "../../context/Provider/AuthProvider";
import Loading from '../../components/Loading';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from '../../api/axiosInstance';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const numberPulse = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { yoyo: Infinity, duration: 0.6, ease: "easeInOut" },
  },
};

const Overview = () => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: loadingRole } = useRole();
  const [stats, setStats] = useState({ totalBookings: 0, myBookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid || authLoading) return;

    async function fetchBookings() {
      setLoading(true);
      try {
        const res = await axios.get("/bookings");
        const data = res.data;
        const myBookings = data.bookings.filter(
          (booking) => booking.userEmail === user.email
        );
        setStats({ totalBookings: data.bookings.length, myBookings: myBookings.length });
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user?.uid, user?.email, authLoading]);

  if (authLoading || loadingRole || loading) return <Loading />;

  // Neutral gradient chart
  const chartData = {
    labels: ["Total Bookings", "My Bookings"],
    datasets: [
      {
        label: "Bookings",
        data: [stats.totalBookings, stats.myBookings],
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "transparent";
          const gradient = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#34D399"); // soft green
          gradient.addColorStop(1, "#10B981"); // strong green
          return gradient;
        },
        borderRadius: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)", // dark translucent
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#10B981",
        borderWidth: 1,
      },
      title: {
        display: true,
        text: "Bookings Overview",
        color: "#10B981",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "rgba(0,0,0,0.7)", font: { size: 14, weight: "bold" } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        ticks: { color: "rgba(0,0,0,0.7)", stepSize: 1, font: { weight: "bold" } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="rounded-2xl min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300  px-4 py-12 ">
      <Helmet>
        <title>Dashboard Overview - ActiveArena</title>
      </Helmet>

      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Welcome */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center "
        >
          <h1 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">
            Welcome to ActiveArena Dashboard!
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Here’s a quick look at your court booking stats.
          </p>
        </Motion.div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar */}
          <Motion.div
            className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-xl p-6 shadow-xl backdrop-blur-sm cursor-default text-center"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Motion.img
                src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
                alt="User Avatar"
                className="w-full h-full rounded-full border-4 border-emerald-300 dark:border-emerald-700 object-cover shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                 {role || "User"}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {user?.displayName || "Anonymous"}
            </h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">{user?.email}</p>
          </Motion.div>

          {/* Total Bookings */}
          <Motion.div
            className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-xl p-6 shadow-xl backdrop-blur-sm text-center cursor-default"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
              🏟 Total Bookings
            </h3>
            <Motion.p
              className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={numberPulse}
            >
              {stats.totalBookings}
            </Motion.p>
          </Motion.div>

          {/* My Bookings */}
          <Motion.div
            className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-xl p-6 shadow-xl backdrop-blur-sm text-center cursor-default"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
              🎯 My Bookings
            </h3>
            <Motion.p
              className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={numberPulse}
            >
              {stats.myBookings}
            </Motion.p>
          </Motion.div>
        </div>

        {/* Chart */}
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 text-emerald-600 dark:text-emerald-400 rounded-xl p-6 shadow-xl backdrop-blur-sm mt-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Overview;