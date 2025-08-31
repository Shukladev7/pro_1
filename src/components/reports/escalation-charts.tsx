
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEmployeeContext } from "@/context/employee-context"
import { useSettingsContext } from "@/context/settings-context"
import type { Escalation } from "@/types"
import { Skeleton } from "../ui/skeleton"

interface EscalationChartsProps {
  escalations: Escalation[],
  loading: boolean
}

export function EscalationCharts({ escalations, loading }: EscalationChartsProps) {
  const { settings } = useSettingsContext()

  const byInitialDepartment = settings.departments.map(department => ({
    name: department,
    total: escalations.filter(e => e.department === department).length,
  })).filter(d => d.total > 0);

  const byStatus = settings.statuses.map(status => ({
    name: status,
    total: escalations.filter(e => e.status === status).length,
  }))

  if (loading) {
      return (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        </div>
      )
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Escalations by Initial Department</CardTitle>
          <CardDescription>Distribution of escalations based on the initial department assigned.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={byInitialDepartment} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Escalations by Status</CardTitle>
          <CardDescription>Current status overview of all escalations.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={byStatus} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
