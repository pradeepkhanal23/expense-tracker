import React from "react";
import { useOutletContext } from "react-router-dom";
import MyCard from "@/components/MyCard";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import MyTable from "@/components/MyTable";

const Dashboard = () => {
  const { user, chartData, cardValues } = useOutletContext();

  return (
    <>
      {user && (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {user.expenses && user.expenses.length > 0 && (
              <>
                <PieChart data={chartData} />
                <BarChart data={chartData} />
              </>
            )}
          </div>

          <div className="grid gap-4 grid-cols-1">
            <MyTable />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
