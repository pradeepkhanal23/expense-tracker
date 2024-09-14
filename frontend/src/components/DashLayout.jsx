import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { welcomeMessage } from "@/utils/helpers";
import Skeleton from "@/components/Skeleton";

const DashLayout = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({});

  const { loading, data } = useQuery(GET_ME, {
    pollInterval: 1000,
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);

      if (!welcomeMessage()) {
        toast({
          variant: "success",
          title: `Welcome, ${data.me.username}`,
          description: "Let's get tracking!",
        });
        localStorage.setItem("hasSeenWelcome", "true");
      }
    }
  }, [data, toast]);

  if (loading) return <Skeleton />;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header user={user} />
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8 container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
