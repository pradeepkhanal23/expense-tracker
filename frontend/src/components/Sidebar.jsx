import { Mountain, Home, Table, ChartPie, ChartColumnBig } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation(); // Hook to get the current route

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          to="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-purple-700 dark:bg-white text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Mountain className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Expense Tracker</span>
        </Link>

        {/* All the nav links */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent  md:h-8 md:w-8 ${
                  location.pathname === "/dashboard" ? "bg-accent" : ""
                } `}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard/table"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent md:h-8 md:w-8 ${
                  location.pathname === "/dashboard/table" ? "bg-accent" : ""
                } `}
              >
                <Table className="h-5 w-5" />
                <span className="sr-only">Tables</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Tables</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard/piechart"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent  md:h-8 md:w-8 ${
                  location.pathname === "/dashboard/piechart" ? "bg-accent" : ""
                } `}
              >
                <ChartPie className="h-5 w-5" />
                <span className="sr-only">Pie Chart</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">PieChart</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard/barchart"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent  md:h-8 md:w-8 ${
                  location.pathname === "/dashboard/barchart" ? "bg-accent" : ""
                } `}
              >
                <ChartColumnBig className="h-5 w-5" />
                <span className="sr-only">Bar Graph</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Bar Graph</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};
export default Sidebar;
