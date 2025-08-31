
import { Escalation, EscalationStatus, Employee, EmployeeRole, Department } from "@/types";

export const INITIAL_DEPARTMENTS: Department[] = ["Technical", "Documentation", "Finance", "Maintenance", "Legal", "Operations", "CRM", "Management"];
export const INITIAL_STATUSES: EscalationStatus[] = ["New", "In Progress", "Resolved", "Closed"];
export const INITIAL_ROLES: EmployeeRole[] = ["HOD", "Team Member", "CRM", "Admin"];


export const MOCK_ESCALATIONS: Omit<Escalation, 'id' | 'startDate' | 'endDate' | 'history' | 'assignedTo' | 'hodEmail' | 'assignedTeamMemberEmail'>[] = [
    {
        customerName: "Alice Johnson",
        customerEmail: "alice@example.com",
        buildingName: "A-Tower",
        flatOrOfficeNumber: "101",
        department: "Technical",
        description: "The main water pipe in the apartment is leaking and has caused flooding in the kitchen area. Immediate assistance is required.",
        status: "New",
    },
    {
        customerName: "Bob Williams",
        customerEmail: "bob@example.com",
        buildingName: "B-Tower",
        flatOrOfficeNumber: "202",
        department: "Documentation",
        description: "I have not received the sale deed for my office space despite multiple follow-ups with the sales team.",
        status: "In Progress",
    },
    {
        customerName: "Charlie Brown",
        customerEmail: "charlie@example.com",
        buildingName: "C-Tower",
        flatOrOfficeNumber: "303",
        department: "Finance",
        description: "The final invoice has an incorrect amount. I was overcharged for the parking space. Requesting a refund for the difference.",
        status: "Resolved",
    },
];

export const MOCK_EMPLOYEES: Omit<Employee, 'id'>[] = [
    { name: "Admin User", email: "admin@example.com", role: "Admin", department: "Management" },
    { name: "CRM User", email: "crm@example.com", role: "CRM", department: "CRM" },
    { name: "Mr. Smith", email: "smith.tech@example.com", role: "HOD", department: "Technical" },
    { name: "Ms. Jones", email: "jones.legal@example.com", role: "HOD", department: "Legal" },
    { name: "Mr. Wilson", email: "wilson.finance@example.com", role: "HOD", department: "Finance" },
    { name: "Mr. Brown", email: "brown.ops@example.com", role: "HOD", department: "Operations" },
    { name: "Tech Team 1", email: "team.tech1@example.com", role: "Team Member", department: "Technical" },
    { name: "Legal Team 1", email: "team.legal1@example.com", role: "Team Member", department: "Legal" },
    { name: "Tech Team 2", email: "team.tech2@example.com", role: "Team Member", department: "Technical" },
    { name: "Docs Team 1", email: "team.docs1@example.com", role: "Team Member", department: "Documentation" },
    { name: "Finance Team 1", email: "team.finance1@example.com", role: "Team Member", department: "Finance" },
    { name: "Maintenance Team 1", email: "team.maint1@example.com", role: "Team Member", department: "Maintenance" },
    { name: "Legal Team 2", email: "team.legal2@example.com", role: "Team Member", department: "Legal" },
];
