import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, AlertCircle, CheckCircle2, ArrowUpRight, FileText, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    type: 'draft_reminder',
    title: 'Draft Expiring Soon',
    message: 'Your draft "Tampered Shipment" has only 1 day left before auto-deletion.',
    time: '30 minutes ago',
    read: false,
    icon: Clock,
    action: '/licensee-reporter/incidents/new',
    actionLabel: 'Continue Draft',
  },
  {
    id: 2,
    type: 'clarification',
    title: 'Clarification Requested',
    message: 'MCMC Reviewer has requested additional information for incident #PSIRP-2025-0025.',
    time: '1 hour ago',
    read: false,
    icon: MessageSquare,
    action: '/licensee-reporter/incidents/PSIRP-2025-0025',
    actionLabel: 'Respond',
  },
  {
    id: 3,
    type: 'status_update',
    title: 'Status Updated',
    message: 'Incident #PSIRP-2025-0020 has been moved to "Under Investigation".',
    time: '3 hours ago',
    read: false,
    icon: FileText,
    action: '/licensee-reporter/incidents/PSIRP-2025-0020',
    actionLabel: 'View',
  },
  {
    id: 4,
    type: 'escalation',
    title: 'Case Escalated',
    message: 'Incident #PSIRP-2025-0019 has been escalated to Law Enforcement Agency.',
    time: '1 day ago',
    read: true,
    icon: ArrowUpRight,
    action: '/licensee-reporter/incidents/PSIRP-2025-0019',
    actionLabel: 'View',
  },
  {
    id: 5,
    type: 'closure',
    title: 'Case Closed',
    message: 'Incident #PSIRP-2025-0015 has been closed. Outcome: No Further Action.',
    time: '2 days ago',
    read: true,
    icon: CheckCircle2,
    action: '/licensee-reporter/incidents/PSIRP-2025-0015',
    actionLabel: 'View',
  },
  {
    id: 6,
    type: 'draft_reminder',
    title: 'Draft Reminder',
    message: 'Your draft "Lost Consignment" has 3 days remaining before auto-deletion.',
    time: '3 days ago',
    read: true,
    icon: Clock,
    action: '/licensee-reporter/incidents/new',
    actionLabel: 'Continue Draft',
  },
];

const typeColors: Record<string, string> = {
  draft_reminder: 'text-role-validator',
  clarification: 'text-destructive',
  status_update: 'text-primary',
  escalation: 'text-status-investigation',
  closure: 'text-status-closed',
};

export default function ReporterNotifications() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">{unreadCount} unread notifications</p>
        </div>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    !notif.read
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border hover:border-primary/20'
                  }`}
                >
                  <div className={`mt-0.5 ${typeColors[notif.type] || 'text-muted-foreground'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{notif.title}</p>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => navigate(notif.action)}
                  >
                    {notif.actionLabel}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
