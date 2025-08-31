
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as React from "react"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useSettingsContext } from "@/context/settings-context"
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase/config"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/firebase/config"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Employee name must be at least 2 characters.",
  }),
  email: z.string().email({
      message: "Please enter a valid email address.",
  }),
  role: z.string().min(1, { message: "Role is required." }),
  department: z.string().min(1, { message: "Department is required." }),
})

export function AddEmployeeForm() {
  const { settings } = useSettingsContext();
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      department: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
        // Check if current user is logged in
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("You must be logged in to invite employees");
        }

        // Generate a secure random password
        const password = Math.random().toString(36).slice(-8) + "A1!";

        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, password);
        
        // Create employee data for Firestore
        const employeeData = {
            id: userCredential.user.uid,
            name: values.fullName,
            email: values.email,
            role: values.role,
            department: values.department,
            createdAt: new Date(),
            isActive: true,
        };

        // Add to Firestore
        await addDoc(collection(db, "employees"), employeeData);

        // Send password reset email to the new user
        await sendPasswordResetEmail(auth, values.email);

        toast({
            title: "Employee Invited",
            description: `${values.fullName} has been invited. A password-set email has been sent.`,
        });
        form.reset();

    } catch (error: any) {
        console.error("Error inviting employee:", error);
        
        let errorMessage = "Failed to invite employee";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "An account with this email already exists";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "Invalid email address";
        } else if (error.code === 'auth/weak-password') {
            errorMessage = "Password is too weak";
        } else if (error.message) {
            errorMessage = error.message;
        }

        toast({
            title: "Invitation Failed",
            description: errorMessage,
            variant: "destructive",
        });
    }
    
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                    <Input placeholder="Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Employee Email</FormLabel>
                <FormControl>
                    <Input placeholder="jane.smith@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {settings.roles.map((role) => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Department</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {settings.departments.map((dep) => (
                                <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Invite Employee
        </Button>
      </form>
    </Form>
  )
}
