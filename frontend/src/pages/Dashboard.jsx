import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyTable from "../components/MyTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";
import MyCard from "@/components/MyCard";
import AuthService from "../utils/auth";
import Form from "@/components/Form";

const Dashboard = () => {
  const [user, setUser] = useState({});

  //fetching the user data
  const { loading, data } = useQuery(GET_ME);

  // fetch the user details on component render
  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [data]);

  if (loading) {
    return (
      <>
        <h1>Loading..</h1>
      </>
    );
  }

  return (
    <>
      {user && (
        <>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
              <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <a
                  href="/dashboard"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-purple-700 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  <Mountain className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">Expense Tracker</span>
                </a>
              </nav>
            </aside>
            <div className="flex flex-col  sm:gap-4 sm:py-4 sm:pl-14 ">
              {/* Sticky Header */}
              <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-end">
                <h2 className="text-2xl font-semibold justify-end w-full">
                  Hello, {user.username}
                </h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <img
                        src="/placeholder-user.jpg"
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
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

              {/* Main Section */}
              <main className=" p-4 sm:px-6 sm:py-0 md:gap-8  ">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                  <div className="grid gap-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
                    <MyCard title="Total Expenses" amount="2000" bg="red" />
                    <MyCard title="Total Income" amount="5000" bg="green" />
                    <MyCard title="Balance" amount="3000" bg="purple" />
                  </div>
                  <div className="grid gap-4  grid-cols-1   ">
                    <MyTable expenses={user.expenses} {...user} />
                  </div>
                  <div className="w-full ">
                    <Form />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Dashboard;
