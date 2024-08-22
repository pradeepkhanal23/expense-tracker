import { Pencil, Trash, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPENSES } from "@/utils/queries";
import { useEffect, useState } from "react";
import { DELETE_EXPENSE, UPDATE_EXPENSE } from "@/utils/mutations";
import Form from "./Form";
import { dateFormat } from "@/utils/dateFormat";
import Alert from "@/components/Alert";

const MyTable = () => {
  const [expenses, setExpenses] = useState(null);
  const [open, setOpen] = useState(false);
  const { data, error, loading } = useQuery(GET_EXPENSES);
  const [activeExpense, setActiveExpense] = useState([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  // a flag to keep track of the edit mode so that we can conditionally render the title and other labels in the form
  const [editMode, setEditMode] = useState(false);

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
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    setExpenses(data?.expenses);
  }, [data]);

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
      <div className="ml-auto flex items-center gap-x-2">
        <Button
          type="submit"
          className="flex items-center gap-x-2 text-base"
          onClick={handleAddTransaction}
        >
          <PlusCircle className="h-4 w-4" />
          <span className=" sm:whitespace-nowrap ">Add Transaction</span>
        </Button>
      </div>
      {expenses && expenses.length > 0 ? (
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
                  {expenses &&
                    expenses.map((expense, i) => {
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
                          className="hover:bg-accent cursor-pointer  text-lg"
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
