import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          to="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-purple-700 dark:bg-white text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Mountain className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Expense Tracker</span>
        </Link>
      </nav>
    </aside>
  );
};
export default Sidebar;
