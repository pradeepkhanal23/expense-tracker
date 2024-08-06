import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen gap-5">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <Hero />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
