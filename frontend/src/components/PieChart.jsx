import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// const chartData = [
//   { category: "Expense", amount: 1200, fill: "hsl(var(--chart-1))" },
//   { category: "Income", amount: 300, fill: "hsl(var(--chart-2))" },
//   { category: "Investment", amount: 150, fill: "hsl(var(--chart-3))" },
// ];

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

export default function Chart({ pieChartData }) {
  const totalExpenses = React.useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  // Function to get color based on category
  const getColor = (category) => {
    return chartConfig[category]?.color || "#8884d8"; // Fallback color
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totalExpenses.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Expenses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
