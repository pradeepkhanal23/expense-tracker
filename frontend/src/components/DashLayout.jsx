import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useToast } from "@/components/ui/use-toast";
import { welcomeMessage } from "@/utils/helpers";
import Skeleton from "@/components/Skeleton";
import Breadcrumb from "@/components/Breadcrumb";

const DashLayout = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({});
  const [chartData, setChartData] = useState([]);
  const [cardValues, setCardValues] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const { loading, data } = useQuery(GET_ME, {
    pollInterval: 1000,
    nextFetchPolicy: "cache-first",
  });

  const calculateTotals = (expenses) => {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalInvestment = 0;

    expenses.forEach((expense) => {
      if (expense.category === "income") {
        totalIncome += expense.amount;
      } else if (expense.category === "expense") {
        totalExpense += expense.amount;
      } else if (expense.category === "investment") {
        totalInvestment += expense.amount;
      }
    });

    const totalExpenses = totalExpense + totalInvestment;
    const balance = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      balance,
      pieData: [
        {
          category: "Income",
          amount: totalIncome,
          fill: "hsl(var(--chart-2))",
        },
        {
          category: "Expense",
          amount: totalExpense,
          fill: "hsl(var(--chart-1))",
        },
        {
          category: "Investment",
          amount: totalInvestment,
          fill: "hsl(var(--chart-4))",
        },
      ],
    };
  };

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
      const { totalIncome, totalExpenses, balance, pieData } = calculateTotals(
        data.me.expenses
      );
      setChartData(pieData);
      setCardValues({ totalIncome, totalExpenses, balance });

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
        <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb />
            <Outlet context={{ user, chartData, cardValues }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
