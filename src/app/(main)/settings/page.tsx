
"use client"

import * as React from "react"
import { ListCard } from "@/components/settings/list-card"
import { useSettingsContext } from "@/context/settings-context"
import { AddEditDialog } from "@/components/settings/add-edit-dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useEmployeeContext } from "@/context/employee-context"
import { useEscalationContext } from "@/context/escalation-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsPage() {
    const { settings, loading: settingsLoading, addSetting, updateSetting, deleteSetting, seedDatabase } = useSettingsContext();
    const { loading: employeesLoading } = useEmployeeContext();
    const { loading: escalationsLoading } = useEscalationContext();

    const loading = settingsLoading || employeesLoading || escalationsLoading;

    const [isSeeding, setIsSeeding] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState<{
        type: 'departments' | 'statuses' | 'roles';
        value?: string;
    } | null>(null);

    const handleOpenDialog = (type: 'departments' | 'statuses' | 'roles', value?: string) => {
        setDialogData({ type, value });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogData(null);
        setDialogOpen(false);
    };

    const handleSave = async (type: 'departments' | 'statuses' | 'roles', newValue: string, oldValue?: string) => {
        if (oldValue) {
            await updateSetting(type, oldValue, newValue);
        } else {
            await addSetting(type, newValue);
        }
        handleCloseDialog();
    };

    const handleDelete = async (type: 'departments' | 'statuses' | 'roles', value: string) => {
        // Consider adding a confirmation dialog here in a real app
        await deleteSetting(type, value);
    };

    const handleSeed = async () => {
        setIsSeeding(true);
        await seedDatabase();
        setIsSeeding(false);
    }
    
    if (loading && !isSeeding) {
        return (
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                </div>
                 <Separator />
                 <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                <Skeleton className="h-10 w-48" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
                <p className="text-muted-foreground">
                    Manage the system-wide select list data.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <ListCard
                    title="Departments"
                    description="The list of all departments in the organization."
                    items={settings.departments}
                    onAdd={() => handleOpenDialog('departments')}
                    onEdit={(item) => handleOpenDialog('departments', item)}
                    onDelete={(item) => handleDelete('departments', item)}
                />
                <ListCard
                    title="Escalation Statuses"
                    description="The lifecycle statuses for an escalation ticket."
                    items={settings.statuses}
                    onAdd={() => handleOpenDialog('statuses')}
                    onEdit={(item) => handleOpenDialog('statuses', item)}
                    onDelete={(item) => handleDelete('statuses', item)}
                />
                <ListCard
                    title="Employee Roles"
                    description="The different user roles within the system."
                    items={settings.roles}
                    onAdd={() => handleOpenDialog('roles')}
                    onEdit={(item) => handleOpenDialog('roles', item)}
                    onDelete={(item) => handleDelete('roles', item)}
                />
            </div>
            <Separator />
            <div>
                 <h2 className="text-2xl font-bold tracking-tight">Database</h2>
                <p className="text-muted-foreground">
                    Use this to populate your Firestore database with initial data.
                </p>
            </div>
             <Button onClick={handleSeed} disabled={isSeeding}>
                {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Seed Initial Data
            </Button>
            {dialogData && (
                <AddEditDialog
                    isOpen={dialogOpen}
                    onClose={handleCloseDialog}
                    type={dialogData.type}
                    initialValue={dialogData.value}
                    onSave={handleSave}
                />
            )}
        </div>
    )
}
