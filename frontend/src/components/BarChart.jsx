import React from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useOutletContext } from "react-router-dom";

const chartConfig = {
  amount: {
    label: "Amount",
  },
  Income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  Expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
  Investment: {
    label: "Investment",
    color: "hsl(var(--chart-4))",
  },
};

export default function ExpenseBarChart() {
  // Getting chartData from the useOutletContext
  const { chartData } = useOutletContext();

  // Ensuring chartData is not undefined or empty
  const data = chartData && chartData.length > 0 ? chartData : [];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">Bar Chart Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data} // Safe fallback for empty data
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="amount"
              fill={({ payload }) =>
                chartConfig[payload.category]?.color || "#8884d8"
              }
              strokeWidth={2}
              radius={8}
              activeShape={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
