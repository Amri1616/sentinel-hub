import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageSquare, ArrowUpRight, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const notifications = [
  { id: 1, type: 'assignment', title: 'New Case Assigned', message: 'Case #PSIRP-2025-0028 (Critical Security Breach) has been assigned to you.', time: '1 hour ago', read: false, icon: FileText, action: '/case-officer/cases/PSIRP-2025-0028', actionLabel: 'Review' },
  
  { id: 3, type: 'clarification', title: 'Clarification Response', message: 'Reporter has responded to your clarification request for #PSIRP-2025-0026.', time: '3 hours ago', read: false, icon: MessageSquare, action: '/case-officer/cases/PSIRP-2025-0026', actionLabel: 'Review' },
  { id: 4, type: 'escalation', title: 'Escalation Approved', message: 'Supervisor approved escalation for case #PSIRP-2025-0022. Case forwarded to PDRM.', time: '5 hours ago', read: false, icon: ArrowUpRight, action: '/case-officer/cases/PSIRP-2025-0022', actionLabel: 'View' },
  { id: 5, type: 'escalation_rejected', title: 'Escalation Rejected', message: 'Supervisor rejected escalation for case #PSIRP-2025-0020. Case returned to Under Review.', time: '1 day ago', read: true, icon: AlertCircle, action: '/case-officer/cases/PSIRP-2025-0020', actionLabel: 'View' },
  { id: 6, type: 'status', title: 'Case Closed', message: 'Supervisor has closed case #PSIRP-2025-0019 — No Further Action.', time: '2 days ago', read: true, icon: CheckCircle2, action: '/case-officer/cases/PSIRP-2025-0019', actionLabel: 'View' },
];

const typeColors: Record<string, string> = {
  assignment: 'text-role-reviewer',
  
  clarification: 'text-status-rfi',
  escalation: 'text-status-in-review',
  escalation_rejected: 'text-destructive',
  status: 'text-status-closed',
};

export default function CaseOfficerNotifications() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        <Button variant="outline" size="sm">Mark All as Read</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${!notif.read ? 'border-role-reviewer/30 bg-role-reviewer/5' : 'border-border hover:border-role-reviewer/20'}`}>
                  <div className={`mt-0.5 ${typeColors[notif.type] || 'text-muted-foreground'}`}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{notif.title}</p>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-role-reviewer shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0" onClick={() => navigate(notif.action)}>{notif.actionLabel}</Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
