import MyTable from "../components/MyTable";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";
import MyCard from "@/components/MyCard";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import { useToast } from "@/components/ui/use-toast";
import Skeleton from "@/components/Skeleton";
import { welcomeMessage } from "@/utils/helpers";

const Dashboard = () => {
  const { toast } = useToast();

  const [user, setUser] = useState({});
  const [chartData, setChartData] = useState([]);

  const [cardValues, setCardValues] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  //fetching the user data
  const { loading, data } = useQuery(GET_ME, {
    // this will make sure that the data is refresed after every 100 miliseconds
    pollInterval: 1000,
    nextFetchPolicy: "cache-first",
  });

  // calculating all the totals for the display cards
  const calculateTotals = (expenses) => {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalInvestment = 0;

    // we wanna create a single value for either income, investment or expense because 3 only want 3 segment in our pie chart
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

    // Return totals and formatted data for the PieChart
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

  // fetch the user details on component render
  useEffect(() => {
    if (data && data.me) {
      // on initial load, we put the user's details in the user array
      setUser(data.me);

      // now destructuring the values from calculate totals where we have all our value and pie chart data
      const { totalIncome, totalExpenses, balance, pieData } = calculateTotals(
        data.me.expenses
      );

      //  now setting the pie chart data to the state variable setChartData
      setChartData(pieData);

      // to render the proper card values , we also set the card value updater
      setCardValues({
        totalIncome,
        totalExpenses,
        balance,
      });

      // checking for welcome message
      if (!welcomeMessage()) {
        toast({
          variant: "success",
          title: `Welcome , ${data?.me?.username}`,
          description: "Lets get tracking!!",
        });

        // setting flag in the localstorage so that the welcome message in not shown again
        localStorage.setItem("hasSeenWelcome", "true");
      }
    }
  }, [data, toast]);

  if (loading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      {user && (
        <>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
              <MyCard
                title="Total Income"
                amount={cardValues.totalIncome}
                color="hsl(var(--chart-2))"
              />
              <MyCard
                title="Total Expenses"
                amount={cardValues.totalExpenses}
                color="hsl(var(--chart-1))"
              />
              <MyCard
                title="Overall Balance"
                amount={cardValues.balance}
                color="hsl(var(--chart-6))"
              />
            </div>

            <div className="grid gap-4  grid-cols-1 md:grid-cols-2 ">
              {/* Charts Section */}
              {user.expenses && user.expenses.length > 0 && (
                <>
                  <PieChart data={chartData} />
                  <BarChart data={chartData} />
                </>
              )}
            </div>

            <div className="grid gap-4  grid-cols-1">
              <MyTable />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Dashboard;
