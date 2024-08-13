import MyTable from "../components/MyTable";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";
import MyCard from "@/components/MyCard";
import Header from "@/components/Header";
// import Chart from "@/components/PieChart";
// import BarChart from "@/components/BarChart";
// import LineChart from "@/components/LineChart";

const Dashboard = () => {
  const [user, setUser] = useState({});
  // const [pieChartData, setPieChartData] = useState([]);

  // const transformDataForPieChart = () => {
  //   // if the user is there and user related expenses, then we format the data to pass into the pie chart

  //   const formattedData = data.me.expenses.map((expense, i) => {
  //     const { category, amount } = expense;
  //     return {
  //       category,
  //       amount,
  //     };
  //   });

  //   return formattedData;
  // };

  //fetching the user data
  const { loading, data } = useQuery(GET_ME);

  // calculating all the totals for the display cards
  const calculateTotals = (expenses) => {
    // Calculate total expenses by filtering only expense items
    const totalExpenses = expenses
      .filter(
        (exp) => exp.category === "expense" || exp.category === "investment"
      )
      .reduce((acc, curr) => acc + curr.amount, 0);

    // calculating total income
    const totalIncome = expenses
      .filter((exp) => exp.category === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    // calculating balance
    const balance = totalIncome - totalExpenses;

    return {
      totalExpenses,
      totalIncome,
      balance,
    };
  };

  // Calculate card values
  const { totalExpenses, totalIncome, balance } = user.expenses
    ? calculateTotals(user.expenses)
    : { totalExpenses: 0, totalIncome: 0, balance: 0 };

  // fetch the user details on component render
  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);

      // const pieData = transformDataForPieChart();

      // setPieChartData(pieData);
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
            <Sidebar />
            <div className="flex flex-col  sm:gap-4 sm:py-4 sm:pl-14 ">
              {/* Sticky Header */}
              <Header user={user} />

              {/* Main Section */}
              <main className=" p-4 sm:px-6 sm:py-0 md:gap-8  ">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                  <div className="grid gap-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
                    {/* <Chart pieChartData={pieChartData} />
                    <BarChart />
                    <LineChart /> */}

                    <MyCard
                      title="Total Income"
                      amount={totalIncome}
                      color="green"
                    />
                    <MyCard
                      title="Total Expenses"
                      amount={totalExpenses}
                      color="red"
                    />
                    <MyCard title="Balance" amount={balance} color="#333" />
                  </div>
                  <div className="grid gap-4  grid-cols-1   ">
                    <MyTable />
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
