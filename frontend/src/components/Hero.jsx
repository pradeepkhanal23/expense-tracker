import heroImg from "../assets/images/finance.jpg";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <main>
      <section className="max-w-7xl mx-auto h-full p-2 lg:p-5 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-10 lg:flex-row md:space-x-10 ">
            <div className="flex flex-col justify-center space-y-4 flex-1">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter ">
                  Take Control of Your Expenses
                </h1>
                <p className="text-justify text-muted-foreground md:text-lg">
                  Our expense tracker helps you stay on top of your finances and
                  make informed decisions about your spending.
                </p>
              </div>
              <Link to={`${AuthService.loggedIn() ? "/dashboard" : "/auth"}`}>
                <Button className="text-base tracking-wide w-full md:w-1/3 lg:w-1/2">
                  Start Tracking
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              <img
                src={heroImg}
                alt="Hero"
                className="w-full md:w-2/3 mx-auto lg:w-full lg:order-last  "
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Hero;
