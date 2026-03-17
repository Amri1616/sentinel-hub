import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, FileText, AlertTriangle, Users, CheckCircle2, Clock } from 'lucide-react';

const notifications = [
  { id: 1, type: 'draft', icon: Clock, title: 'Draft Reminder', description: 'Ahmad bin Abdullah has 2 incident drafts pending for more than 48 hours.', time: '2 hours ago', read: false },
  { id: 2, type: 'status', icon: FileText, title: 'Status Changed', description: 'Case PSIRP-2025-0025 has been moved to "Under Review" by Officer Lim.', time: '4 hours ago', read: false },
  { id: 3, type: 'escalation', icon: AlertTriangle, title: 'Case Escalated', description: 'Case PSIRP-2025-0022 has been escalated to LEA by Supervisor Wong.', time: '1 day ago', read: false },
  { id: 4, type: 'user', icon: Users, title: 'Reporter Deactivated', description: 'Azman Ali has been deactivated as requested. Account is now inactive.', time: '2 days ago', read: true },
  { id: 5, type: 'status', icon: CheckCircle2, title: 'Case Closed', description: 'Case PSIRP-2025-0021 has been marked as Closed after investigation.', time: '3 days ago', read: true },
  { id: 6, type: 'draft', icon: Clock, title: 'Draft Reminder', description: 'Kamal Hassan has 1 incident draft pending submission.', time: '3 days ago', read: true },
  { id: 7, type: 'escalation', icon: AlertTriangle, title: 'RFI Sent', description: 'Case PSIRP-2025-0023 has an RFI from Officer Lim requiring response.', time: '4 days ago', read: true },
  { id: 8, type: 'status', icon: FileText, title: 'New Submission', description: 'Mastura Salleh submitted a new incident PSIRP-2025-0024.', time: '5 days ago', read: true },
];

const typeColors: Record<string, string> = {
  draft: 'bg-status-in-review/15 text-status-in-review',
  status: 'bg-primary/15 text-primary',
  escalation: 'bg-destructive/15 text-destructive',
  user: 'bg-role-licensee-admin/15 text-role-licensee-admin',
};

export default function LicenseeAdminNotifications() {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter(n => !n.read).length;

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setItems(items.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {items.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all duration-200 cursor-pointer hover:shadow-md ${!notification.read ? 'border-role-licensee-admin/30 bg-role-licensee-admin/5' : ''}`}
            onClick={() => markRead(notification.id)}
          >
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${typeColors[notification.type]}`}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">{notification.title}</p>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-role-licensee-admin shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
