import { Outlet, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';

import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import DarkModeSidebar from "./components/DarkModeSidebar";
import BackToTopButton from "./components/BackToTopButton";

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
    <div >
      <div >
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
      <div >
        <ToastContainer position="top-center" autoClose={1000} />
        <Footer />
      </div>
      <BackToTopButton />
    </div>
  );
}

export default App;
