import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

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
  { category: "Expense", amount: 1200, fill: "hsl(var(--chart-1))" },
  { category: "Income", amount: 300, fill: "hsl(var(--chart-2))" },
  { category: "Investment", amount: 150, fill: "hsl(var(--chart-3))" },
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
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

export default function ExpenseBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
