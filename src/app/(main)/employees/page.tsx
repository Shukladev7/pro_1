
"use client"

import * as React from "react"
import { AddEmployeeForm } from "@/components/employees/add-employee-form";
import { EmployeesDataTable } from "@/components/employees/employees-data-table";
import { columns } from "@/components/employees/columns";
import { useEmployeeContext } from "@/context/employee-context";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase/config";
import type { Employee } from "@/types";

export default function EmployeesPage() {
  const { employees, loading } = useEmployeeContext();
  const { toast } = useToast();
  const [employeeToDelete, setEmployeeToDelete] = React.useState<Employee | null>(null);

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

  const handleDisable = async (employee: Employee) => {
    try {
        const manageEmployeeStatus = httpsCallable(functions, 'manageEmployeeStatus');
        await manageEmployeeStatus({ employeeId: employee.id, action: 'disable' });
        toast({
            title: "Employee Disabled",
            description: `${employee.name}'s account has been disabled. They can no longer access the system.`,
        });
    } catch (error: any) {
        toast({
            title: "Action Failed",
            description: error.message || "Could not disable the employee.",
            variant: "destructive",
        });
    }
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    try {
        const manageEmployeeStatus = httpsCallable(functions, 'manageEmployeeStatus');
        await manageEmployeeStatus({ employeeId: employeeToDelete.id, action: 'delete' });
        toast({
            title: "Employee Deleted",
            description: `${employeeToDelete.name}'s account and data have been permanently deleted.`,
        });
    } catch (error: any) {
        toast({
            title: "Deletion Failed",
            description: error.message || "Could not delete the employee.",
            variant: "destructive",
        });
    } finally {
        setEmployeeToDelete(null);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add New Employee</h2>
        <p className="text-muted-foreground">
          Fill out the form below to add a new employee to the system.
        </p>
      </div>
      <AddEmployeeForm />
      <Separator />
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Current Employees</h2>
        <p className="text-muted-foreground">
          A list of all employees in the system.
        </p>
      </div>
      <EmployeesDataTable 
        columns={columns({ onDelete: handleDelete, onDisable: handleDisable })} 
        data={employees} 
        loading={loading} 
      />
      
      <AlertDialog open={!!employeeToDelete} onOpenChange={() => setEmployeeToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the employee account
                    for <span className="font-bold">{employeeToDelete?.name}</span> and remove their data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
