import { Pencil, Trash, PlusCircle, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPENSES } from "@/utils/queries";
import { useEffect, useState } from "react";
import { DELETE_EXPENSE, UPDATE_EXPENSE } from "@/utils/mutations";
import Form from "./Form";
import { dateFormat } from "@/utils/dateFormat";
import Alert from "@/components/Alert";
import { useLocation } from "react-router-dom";

const MyTable = () => {
  const { toast } = useToast();

  const location = useLocation();

  // to store all the expenses got from the query
  const [expenses, setExpenses] = useState([]);

  // for modal handling
  const [open, setOpen] = useState(false);

  // fetching the expenses from graphql
  const { data, error, loading } = useQuery(GET_EXPENSES);

  // state to pick the expense during edit mode/delete mode
  const [activeExpense, setActiveExpense] = useState([]);

  // dialog that helps to provide alert during deletion process
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  // a flag to keep track of the edit mode so that we can conditionally render the title and other labels in the form
  const [editMode, setEditMode] = useState(false);

  // states to handle the search and filter functionality in the table
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State for tracking selected filter

  // When the user selects a filter (e.g., "Amount (Highest)", "Category (Income)"), the filter choice is stored in the selectedFilter state. This state is updated via the setSelectedFilter function whenever a user clicks on a filter option.

  // By storing the filter choice in a state variable, React can automatically re-render the component when the filter changes. This triggers the useEffect hook that depends on selectedFilter to re-filter the list of expenses based on the selected criteria.
  const [selectedFilter, setSelectedFilter] = useState("");

  const openModal = (editMode = false) => {
    setEditMode(editMode);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditMode(false);
    // resetting the selected expense when modal is closed
    setActiveExpense(null);
  };

  // make sure that refetchQueries is an array, not an object
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [
      {
        query: GET_EXPENSES,
      },
    ],
  });

  // make sure that refetchQueries is an array, not an object
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    refetchQueries: [
      {
        query: GET_EXPENSES,
      },
    ],
  });

  // search term handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // handler for filter button
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Add Transaction button handler
  const handleAddTransaction = () => {
    setActiveExpense(null);
    openModal(false); // pass false to open in add mode
  };

  // edit handler
  const handleEdit = (expense) => {
    setActiveExpense(expense);
    openModal(true);
  };

  // delete handler
  const handleDelete = async (expense) => {
    setActiveExpense(expense);
    setAlertDialogOpen(true);
  };

  // handling the delete only after confirm
  const handleConfirmDelete = async () => {
    if (activeExpense) {
      try {
        await deleteExpense({
          variables: { _id: activeExpense._id },
        });
        toast({
          variant: "destructive",
          title: "Transaction deleted successfully!",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setAlertDialogOpen(false); // Close the alert dialog
      }
    }
  };

  // update Handler
  const handleUpdate = async (updatedExpense) => {
    try {
      await updateExpense({
        variables: {
          _id: updatedExpense._id,
          description: updatedExpense.description,
          amount: parseFloat(updatedExpense.amount),
          date: dateFormat(updatedExpense.date),
          category: updatedExpense.category,
        },
      });
      toast({
        variant: "success",
        title: "Transaction updated successfully!",
      });
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  // to get all the expenses and set filters to begin with
  useEffect(() => {
    if (data?.expenses) {
      setExpenses(data.expenses);
      setFilteredExpenses(data.expenses);
    }
  }, [data]);

  // filter based on search bar and the filter button
  useEffect(() => {
    // Filter the expenses based on the search term and selected filter

    // need to make sure we make a shallow copy of the expense arrya to prevent the error caused by attempting to modify a frozen or immutable array directly
    let filtered = [...expenses];

    if (searchTerm) {
      filtered = filtered.filter((expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter === "Amount (Highest)") {
      filtered = filtered.sort((a, b) => b.amount - a.amount);
    } else if (selectedFilter === "Amount (Lowest)") {
      filtered = filtered.sort((a, b) => a.amount - b.amount);
    } else if (selectedFilter === "Category (Income)") {
      filtered = filtered.filter((expense) => expense.category === "income");
    } else if (selectedFilter === "Category (Expense)") {
      filtered = filtered.filter((expense) => expense.category === "expense");
    } else if (selectedFilter === "Category (Investment)") {
      filtered = filtered.filter(
        (expense) => expense.category === "investment"
      );
    }

    setFilteredExpenses(filtered);
  }, [searchTerm, selectedFilter, expenses]);

  if (loading) {
    return (
      <>
        <h1>Loading data....</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Error displaying</h1>
      </>
    );
  }

  return (
    <>
      {/* Alert Dialog */}
      <Alert
        onConfirm={handleConfirmDelete}
        onClose={() => setAlertDialogOpen(false)}
        open={alertDialogOpen}
      />
      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle className="font-bold text-3xl">
              {editMode ? "Update Transaction" : " Add Transaction"}
            </DialogTitle>
            <DialogDescription className="text-base">
              {editMode ? "Update your Transaction" : " Add your Transaction "}
              here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form
            closeModal={closeModal}
            editMode={editMode}
            handleUpdate={handleUpdate}
            activeExpense={activeExpense}
          />
        </DialogContent>
      </Dialog>

      {/* Table */}

      {/* search bar */}

      <div className="md:ml-auto flex items-center gap-x-2">
        <div className=" w-full my-3 relative">
          {location.pathname === "/dashboard/table" && (
            <>
              <Input
                type="search"
                placeholder="Search for transactions..."
                className="rounded-lg bg-background  max-w-sm ml-auto"
                value={searchTerm}
                onChange={handleSearch}
              />
            </>
          )}
          {/* <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground " /> */}
        </div>

        {/* Filter Button */}
        {location.pathname === "/dashboard/table" && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ListFilter className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only md:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedFilter === "All"}
                  onClick={() => handleFilterChange("All")}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilter === "Amount (Highest)"}
                  onClick={() => handleFilterChange("Amount (Highest)")}
                >
                  Amount (Highest)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilter === "Amount (Lowest)"}
                  onClick={() => handleFilterChange("Amount (Lowest)")}
                >
                  Amount (Lowest)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilter === "Category (Income)"}
                  onClick={() => handleFilterChange("Category (Income)")}
                >
                  Category (Income)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilter === "Category (Expense)"}
                  onClick={() => handleFilterChange("Category (Expense)")}
                >
                  Category (Expense)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedFilter === "Category (Investment)"}
                  onClick={() => handleFilterChange("Category (Investment)")}
                >
                  Category (Investment)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {/* add button */}
        <Button
          type="submit"
          className="flex items-center gap-x-2"
          size="sm"
          onClick={handleAddTransaction}
        >
          <PlusCircle className="h-4 w-4" />
          <span className=" sm:whitespace-nowrap ">Add Transaction</span>
        </Button>
      </div>
      {filteredExpenses && filteredExpenses.length > 0 ? (
        <>
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Expenses</CardTitle>
              <CardDescription className="text-md">
                Your Recent expenses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="text-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="table-cell">Description</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right table-cell">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredExpenses &&
                    filteredExpenses.map((expense, i) => {
                      let categoryStyle;
                      if (expense.category === "expense") {
                        categoryStyle = {
                          backgroundColor: "hsl(var(--chart-1))",
                          color: "white",
                        };
                      } else if (expense.category === "investment") {
                        categoryStyle = {
                          backgroundColor: "hsl(var(--chart-4))",
                          color: "white",
                        };
                      } else {
                        categoryStyle = {
                          backgroundColor: "hsl(var(--chart-2))",
                          color: "white",
                        };
                      }

                      let amountStyle;
                      if (expense.category === "expense") {
                        amountStyle = {
                          color: "hsl(var(--chart-1))",
                        };
                      } else if (expense.category === "investment") {
                        amountStyle = {
                          color: "hsl(var(--chart-4))",
                        };
                      } else {
                        amountStyle = {
                          color: "hsl(var(--chart-2))",
                        };
                      }
                      return (
                        <TableRow
                          className="hover:bg-accent cursor-pointer text-base"
                          key={i}
                        >
                          <TableCell className="table-cell capitalize text-gray-600 dark:text-white">
                            {expense.description}
                          </TableCell>
                          <TableCell
                            className={`hidden sm:table-cell capitalize`}
                          >
                            <Badge
                              className="text-sm"
                              variant="secondary"
                              style={categoryStyle}
                            >
                              {expense.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {expense.date}
                          </TableCell>
                          <TableCell
                            className="text-right font-bold"
                            style={amountStyle}
                          >
                            $ {expense.amount}
                          </TableCell>
                          <TableCell className="text-right flex items-center justify-end gap-x-2 ">
                            <Button
                              size="sm"
                              className="bg-slate-700 dark:bg-white"
                              onClick={() => handleEdit(expense)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(expense)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <p className="text-center text-lg text-muted-foreground">
            There is no data to display. Please add some transactions.
          </p>
        </>
      )}
    </>
  );
};
export default MyTable;
