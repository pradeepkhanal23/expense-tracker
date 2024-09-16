import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const MyCard = ({ title, amount, color }) => {
  const colorStyle = {
    color,
  };

  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className="font-bold tracking-normal text-lg"
          style={colorStyle}
        >
          {title}
        </CardTitle>
        <DollarSign
          className={`h-7 w-7 text-muted-foreground`}
          style={colorStyle}
        />
      </CardHeader>
      <CardContent>
        <div
          className="text-2xl lg:text-3xl font-extrabold tracking-wide"
          style={colorStyle}
        >
          ${amount}
        </div>
      </CardContent>
    </Card>
  );
};
export default MyCard;
