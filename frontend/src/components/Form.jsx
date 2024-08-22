import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DatePicker from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { dateFormat } from "@/utils/dateFormat";
import { ADD_EXPENSE } from "@/utils/mutations";
import { useMutation } from "@apollo/client";
import { GET_EXPENSES } from "@/utils/queries";

// Options for the category select
const categoryOptions = [
  { value: "expense", label: "Expense" },
  { value: "investment", label: "Investment" },
  { value: "income", label: "Income" },
];

const Form = ({ closeModal, editMode, handleUpdate, activeExpense }) => {
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    amount: "",
    category: "",
  });

  const { toast } = useToast();

  // we want to populate the form with activeExpense if we are in edit mode
  useEffect(() => {
    if (editMode && activeExpense) {
      setFormData({
        description: activeExpense.description || "",
        date: dateFormat(activeExpense.date) || "",
        amount: activeExpense.amount || "",
        category: activeExpense.category || "",
      });
    }
  }, [editMode, activeExpense]);

  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [
      {
        query: GET_EXPENSES,
      },
    ],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // before submitting, if we are in edit mode, we run a diff the handleUpdate function, where we run the update query
    if (editMode) {
      handleUpdate({
        ...formData,
        _id: activeExpense._id,
      });
    } else {
      try {
        await addExpense({
          variables: {
            description: formData.description,
            amount: parseFloat(formData.amount), //since the typedef is expecting Float data type, we parse it as Float
            date: dateFormat(formData.date), //we called our utility method that converts the date from the date picker to a string in the required format
            category: formData.category,
          },
        });
        toast({
          variant: "success",
          title: "Transaction added successfully!",
        });
      } catch (error) {
        console.error(error);
      } finally {
        closeModal();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          placeholder="Enter Description here.."
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="datepicker">Date</Label>
      </div>
      <div className="mt-1">
        <DatePicker selected={formData.date} onChange={handleDateChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount in dollors (e.g 1200)"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2 mt-1">
        <Label htmlFor="category">Category</Label>
        <Select
          onValueChange={handleCategoryChange}
          value={formData.category}
          required
        >
          <SelectTrigger className="w-[180px] text-muted-foreground">
            <SelectValue placeholder="Select a category" />
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
      <div className="space-y-1 mt-4">
        <Button type="submit" className="flex items-center  gap-x-2">
          {editMode ? (
            <>
              <Pencil className="h-5 w-5" />
              <span className="sm:whitespace-nowrap ">Update Transaction</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-5 w-5" />
              <span className="sm:whitespace-nowrap ">Add Transaction</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
export default Form;
