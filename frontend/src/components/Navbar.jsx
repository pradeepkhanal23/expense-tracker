import { MountainIcon } from "lucide-react";
import AuthService from "../utils/auth.js";
import { Button } from "./ui/button.jsx";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header className="px-10 h-16 flex items-center border-b">
        <a href="/" className="flex items-center justify-center">
          <MountainIcon className="h-8 w-8" />
          <span className="ml-2 hidden md:block text-xl">Expense Tracker</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {AuthService.loggedIn() ? (
            <>
              <Button>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button>
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
