import { Outlet, useLocation } from "react-router-dom";
import Navbar from './Components/Navbar';
import './App.css';
import Footer from './Components/Footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "./Components/Loading";
import DarkModeSidebar from "./Components/DarkModeSidebar";




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
    <>
      <Navbar />
       <DarkModeSidebar />
      {loading ? (
        <Loading />
      ) : (
       
        <div className="min-h-[calc(100vh-180px)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <Outlet />
        </div>
      )}
     
      <ToastContainer position="top-center" autoClose={1000} />
      <Footer />
    </>
  );
}

export default App;
