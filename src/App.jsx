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
    <div className="max-w-7xl mx-auto ">
       
      <Navbar />
       <DarkModeSidebar />
      {loading ? (
        <Loading />
      ) : (
       
        <div className="min-h-[calc(100vh-180px)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300 pt-08">
          <Outlet />
        </div>
      )}
     
      <ToastContainer position="top-center" autoClose={1000} />
      <Footer />
    </div>
  );
}

export default App;
