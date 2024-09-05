import { MountainIcon, Sun, Moon } from "lucide-react";
import AuthService from "../utils/auth.js";
import { Button } from "./ui/button.jsx";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme.jsx";

const Navbar = () => {
  return (
    <>
      <header className="px-10 h-20 flex items-center border-b dark:border-b-gray-100 ">
        <Link href="/" className="flex items-center justify-center">
          <MountainIcon className="h-8 w-8" />
          <span className="ml-2 hidden md:block text-xl font-medium capitalize mt-1">
            Expense Tracker
          </span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          {/* dark mode toggle button */}
          <ToggleTheme />

          {/* login or dashboard button */}
          {AuthService.loggedIn() ? (
            <>
              <Button className="text-base tracking-wide">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button className="text-base tracking-wide">
                <Link to="/auth">Get started</Link>
              </Button>
            </>
          )}
        </nav>
      </header>
    </>
  );
};
export default Navbar;
