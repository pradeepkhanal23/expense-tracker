import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";
import { Button } from "./ui/button.jsx";
import { User, Moon, Sun } from "lucide-react";
import AuthService from "../utils/auth.js";

const Header = ({ user }) => {
  const { setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-30 mx-auto w-full flex h-20 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-end">
      <h2 className="text-xl md:text-2xl font-semibold justify-end w-full">
        Hello, {user.username}
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </h2>

      {/* Dark mode button */}

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      {/* logout button */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="h-8 w-8 bg-gray-100 p-1 rounded-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              AuthService.logout();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
export default Header;
