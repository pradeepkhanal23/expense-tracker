import { Pencil, Trash } from "lucide-react";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPENSES } from "@/utils/queries";
import { useEffect, useState } from "react";
import { DELETE_EXPENSE } from "@/utils/mutations";

const MyTable = () => {
  const [expenses, setExpenses] = useState([]);
  const { data, error, loading } = useQuery(GET_EXPENSES);
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [
      {
        query: GET_EXPENSES,
      },
    ],
  });

  const handleEdit = (id) => {
    console.log(id);
  };
  const handleDelete = async (idToDelete) => {
    try {
      await deleteExpense({
        variables: {
          _id: idToDelete,
        },
      });
    } catch (error) {
      console.error(error);
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
      {/* Table */}

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
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="text-right flex items-center justify-end gap-x-3">
                        <Button
                          size="icon"
                          className="bg-slate-700"
                          onClick={() => handleEdit(expense._id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(expense._id)}
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
  );
};
export default MyTable;
