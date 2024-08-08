import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import DatePicker from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Options for the category select
const categoryOptions = [
  { value: "expense", label: "Expense" },
  { value: "investment", label: "Investment" },
  { value: "income", label: "Income" },
];

const Form = () => {
  const [formData, setFormData] = useState({
    description: "",
    date: null,
    amount: "",
    category: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription>
            Add and keep track of your expenses here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter Description here.."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="datepicker">Date</Label>
          </div>
          <div className="space-y-1">
            <DatePicker selected={formData.date} onChange={handleDateChange} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={handleCategoryChange}
              value={formData.category}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Expense" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category, i) => {
                  return (
                    <SelectItem key={i} value={category.value}>
                      {category.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="h-10 gap-1 ml-2 " type="submit">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className=" sm:whitespace-nowrap ">Add Expense</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default Form;
