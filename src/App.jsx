import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';

import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import DarkModeSidebar from "./components/DarkModeSidebar";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="bg-emerald-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <DarkModeSidebar />
      </div>
      {
        loading ? (
          <Loading />
        ) : (
          <div className="min-h-[calc(100vh-180px)]">
            <Outlet />
          </div>
        )
      }
      <div className="max-w-7xl mx-auto">
        <ToastContainer position="top-center" autoClose={1000} />
        <Footer />
      </div>
    </div>
  );
}

export default App;