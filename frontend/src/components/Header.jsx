import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import AuthService from "../utils/auth.js";

const Header = ({ user }) => {
  return (
    <header className="sticky top-0 z-30 mx-auto w-full flex h-20 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-end">
      <h2 className="text-xl md:text-2xl font-semibold justify-end w-full">
        Hello, {user.username}
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </h2>

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
