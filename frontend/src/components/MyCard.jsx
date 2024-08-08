import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const MyCard = ({ title, amount, bg }) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <DollarSign
          className={`h-8 w-8 text-muted-foreground text-${bg}-500`}
        />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${amount}</div>
      </CardContent>
    </Card>
  );
};
export default MyCard;
