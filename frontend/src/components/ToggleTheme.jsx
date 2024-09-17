import { useTheme } from "@/context/theme-provider.jsx";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </>
  );
};
export default ToggleTheme;
