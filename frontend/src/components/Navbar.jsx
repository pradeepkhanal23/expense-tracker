import { MountainIcon } from "lucide-react";
const Navbar = () => {
  return (
    <>
      <header className="px-10  h-16 flex items-center border-b">
        <a href="/" className="flex items-center justify-center">
          <MountainIcon className="h-8 w-8" />
          <span className="ml-2 hidden md:block text-xl">Expense Tracker</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            href="/auth"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <button>Get Started</button>
          </a>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
