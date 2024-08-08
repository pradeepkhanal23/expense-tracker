import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const MyTable = ({ expenses, username, email }) => {
  return (
    <>
      {/* Table */}
      <Tabs defaultValue="username">
        <div className="flex items-center justify-between">
          <TabsList className="hidden md:block">
            <TabsTrigger value="username">Username</TabsTrigger>
            <TabsTrigger value="amount">Amount</TabsTrigger>
            <TabsTrigger value="category">Category</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
          </TabsList>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1 ">
                  <ListFilter className="h-4 w-4" />
                  <span className=" sm:whitespace-nowrap">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Username
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Amount</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Category</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Date</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="username">
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
                    <TableHead>User</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
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
                          <TableCell>
                            <div className="font-medium">{username}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {email}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {expense.description}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-sm" variant="secondary">
                              {expense.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {expense.date}
                          </TableCell>
                          <TableCell className="text-right">
                            ${expense.amount}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
export default MyTable;
