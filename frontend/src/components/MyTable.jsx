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

  const openModal = () => {
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

  // edit handler
  const handleEdit = (expense) => {
    setActiveExpense(expense);
    setEditMode(true);
    openModal();
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              {editMode ? "Update Expense" : " Add Expense"}
            </DialogTitle>
            <DialogDescription>
              {editMode ? "Update your expense" : " Add your expense"}
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
          size="sm"
          type="submit"
          className="flex items-center gap-x-2 text-sm md:text-base"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className=" sm:whitespace-nowrap ">Add Expense</span>
        </Button>
      </div>
      {expenses && expenses.length > 0 ? (
        <>
          {" "}
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
                      return (
                        <TableRow
                          className="hover:bg-accent cursor-pointer"
                          key={i}
                        >
                          <TableCell className="table-cell capitalize">
                            {expense.description}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell capitalize">
                            <Badge className="text-sm" variant="secondary">
                              {expense.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {expense.date}
                          </TableCell>
                          <TableCell className="text-right">
                            $ {expense.amount}
                          </TableCell>
                          <TableCell className="text-right flex items-center justify-end gap-x-1 ">
                            <Button
                              size="sm"
                              className="bg-slate-700 "
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
          <p className="text-center text-xl text-muted-foreground">
            There is no data to display. Please add some expenses.
          </p>
        </>
      )}
    </>
  );
};
export default MyTable;
