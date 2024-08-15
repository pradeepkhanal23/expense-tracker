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

export default function ExpenseBarChart({ data }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Bar Chart Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 ">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
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
