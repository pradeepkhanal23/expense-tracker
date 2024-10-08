import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import AuthService from "../utils/auth.js";
import ToggleTheme from "./ToggleTheme.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ user }) => {
  const { toast } = useToast();
  return (
    <header className="sticky top-0 z-30 mx-auto w-full flex h-20 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-end">
      <h2 className="text-xl md:text-2xl font-semibold justify-end w-full">
        Hello, {user.username}
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </h2>

      {/* Dark mode button */}
      <ToggleTheme />

      {/* logout button */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              toast({
                variant: "destructive",
                title: "User is loggin out..",
              });

              // resetting the welcome messsage flag on logout
              localStorage.setItem("hasSeenWelcome", "false");

              //delaying the logout slightly so that we can display the toast
              setTimeout(() => {
                AuthService.logout();
              }, 1000);
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
