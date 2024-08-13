"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", Expense: 1200, Income: 300, Investment: 150 },
  { month: "February", Expense: 1300, Income: 400, Investment: 200 },
  { month: "March", Expense: 1100, Income: 350, Investment: 180 },
  { month: "April", Expense: 1400, Income: 320, Investment: 160 },
  { month: "May", Expense: 1200, Income: 380, Investment: 190 },
  { month: "June", Expense: 1250, Income: 390, Investment: 170 },
];

const chartConfig = {
  Expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
  Income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  Investment: {
    label: "Investment",
    color: "hsl(var(--chart-3))",
  },
};

export default function ExpenseLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Expense"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Income"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Investment"
              type="monotone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
