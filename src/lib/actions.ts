// actions.ts - Client-side functions for API calls

export async function getDepartmentSuggestion(description: string) {
    try {
        const response = await fetch('/api/ai/suggest-department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });

        if (!response.ok) {
            throw new Error('Failed to get department suggestion');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error in getDepartmentSuggestion:", error);
        return { department: null };
    }
}

interface NewEscalationNotificationProps {
    hodEmail: string;
    escalationId: string;
    customerName: string;
    department: string;
}

export async function sendNewEscalationNotification(props: NewEscalationNotificationProps) {
    const { hodEmail, escalationId, customerName, department } = props;
    
    try {
        const subject = `New Escalation Assigned: #${escalationId}`;
        
        // Enhanced HTML email template
        const body = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                    .escalation-id { color: #dc3545; font-weight: bold; }
                    .department { color: #007bff; font-weight: bold; }
                    .customer-name { color: #28a745; font-weight: bold; }
                    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🔔 New Escalation Assignment</h2>
                    </div>
                    
                    <p>Dear HOD,</p>
                    
                    <p>A new escalation has been assigned to your department and requires your attention.</p>
                    
                    <h3>📋 Escalation Details:</h3>
                    <ul>
                        <li><strong>Escalation ID:</strong> <span class="escalation-id">#${escalationId}</span></li>
                        <li><strong>Department:</strong> <span class="department">${department}</span></li>
                        <li><strong>Customer:</strong> <span class="customer-name">${customerName}</span></li>
                        <li><strong>Assigned:</strong> ${new Date().toLocaleString()}</li>
                    </ul>
                    
                    <p>Please review this escalation and take the necessary action at your earliest convenience.</p>
                    
                    <div class="footer">
                        <p>Thank you,<br>
                        <strong>Escalation Tracker System</strong></p>
                        
                        <p><small>This is an automated message. Please do not reply to this email.</small></p>
                    </div>
                </div>
            </body>
            </html>
        `;
                
        const response = await fetch('/api/notifications/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: hodEmail,
                subject,
                body,
                type: 'new-escalation'
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        const result = await response.json();
        
        if (result.success) {
            if (result.skipped) {
                console.log(`⚠️ Notification skipped for escalation #${escalationId} to ${hodEmail} - SendGrid not configured`);
            } else {
                console.log(`✅ Notification email sent for escalation #${escalationId} to ${hodEmail}`);
            }
        } else {
            console.error(`❌ Failed to send notification for escalation #${escalationId} to ${hodEmail}`);
        }
        
        return result;

    } catch (error) {
        console.error(`Failed to send notification for escalation #${escalationId}:`, error);
        return { success: false };
    }
}

interface TeamMemberAssignmentNotificationProps {
    teamMemberEmail: string;
    escalationId: string;
    customerName: string;
    department: string;
    hodName: string;
    description: string;
}

export async function sendTeamMemberAssignmentNotification(props: TeamMemberAssignmentNotificationProps) {
    const { teamMemberEmail, escalationId, customerName, department, hodName, description } = props;
    
    try {
        const subject = `New Task Assignment: Escalation #${escalationId}`;
        
        // Enhanced HTML email template for team members
        const body = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #007bff; padding: 20px; border-radius: 8px; margin-bottom: 20px; color: white; }
                    .escalation-id { color: #dc3545; font-weight: bold; }
                    .department { color: #007bff; font-weight: bold; }
                    .customer-name { color: #28a745; font-weight: bold; }
                    .hod-name { color: #6f42c1; font-weight: bold; }
                    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; }
                    .action-button { display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🎯 New Task Assignment</h2>
                    </div>
                    
                    <p>Dear Team Member,</p>
                    
                    <p>You have been assigned a new escalation task by <span class="hod-name">${hodName}</span> (HOD).</p>
                    
                    <h3>📋 Task Details:</h3>
                    <ul>
                        <li><strong>Escalation ID:</strong> <span class="escalation-id">#${escalationId}</span></li>
                        <li><strong>Department:</strong> <span class="department">${department}</span></li>
                        <li><strong>Customer:</strong> <span class="customer-name">${customerName}</span></li>
                        <li><strong>Assigned by:</strong> <span class="hod-name">${hodName}</span></li>
                        <li><strong>Assigned on:</strong> ${new Date().toLocaleString()}</li>
                    </ul>
                    
                    <h3>📝 Description:</h3>
                    <p>${description}</p>
                    
                    <p>Please review this escalation and begin working on it immediately. You can update the status and add comments as you progress.</p>
                    
                    <div class="footer">
                        <p>Thank you,<br>
                        <strong>Escalation Tracker System</strong></p>
                        
                        <p><small>This is an automated message. Please do not reply to this email.</small></p>
                    </div>
                </div>
            </body>
            </html>
        `;
                
        const response = await fetch('/api/notifications/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: teamMemberEmail,
                subject,
                body,
                type: 'team-member-assignment'
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        const result = await response.json();
        
        if (result.success) {
            if (result.skipped) {
                console.log(`⚠️ Notification skipped for escalation #${escalationId} to ${teamMemberEmail} - SendGrid not configured`);
            } else {
                console.log(`✅ Team member assignment notification sent for escalation #${escalationId} to ${teamMemberEmail}`);
            }
        } else {
            console.error(`❌ Failed to send team member assignment notification for escalation #${escalationId} to ${teamMemberEmail}`);
        }
        
        return result;

    } catch (error) {
        console.error(`Failed to send team member assignment notification for escalation #${escalationId}:`, error);
        return { success: false };
    }
}
