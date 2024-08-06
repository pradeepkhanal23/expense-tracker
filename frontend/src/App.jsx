import "./index.css";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen gap-5">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default App;
