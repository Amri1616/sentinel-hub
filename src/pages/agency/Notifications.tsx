import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, MessageSquare, FileText, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  { id: 1, type: 'escalation', title: 'New Escalated Case', message: 'New case ESC-2025-005 escalated to your agency — Critical severity.', time: '1 hour ago', read: false, icon: AlertTriangle, action: '/agency/cases/ESC-2025-005', actionLabel: 'Review' },
  { id: 2, type: 'escalation', title: 'New Escalated Case', message: 'New case ESC-2025-004 escalated to your agency — High severity.', time: '3 hours ago', read: false, icon: AlertTriangle, action: '/agency/cases/ESC-2025-004', actionLabel: 'Review' },
  { id: 3, type: 'clarification', title: 'Clarification Response', message: 'MCMC responded to your clarification request for ESC-2025-001.', time: '1 day ago', read: false, icon: MessageSquare, action: '/agency/cases/ESC-2025-001', actionLabel: 'View' },
  { id: 4, type: 'upload', title: 'Report Logged', message: 'Your investigation report for ESC-2025-001 was logged successfully.', time: '2 days ago', read: true, icon: Upload, action: '/agency/cases/ESC-2025-001', actionLabel: 'View' },
  { id: 5, type: 'status', title: 'Outcome Submitted', message: 'Outcome submitted for ESC-2025-006 — Prosecution Recommended.', time: '5 days ago', read: true, icon: CheckCircle, action: '/agency/cases/ESC-2025-006', actionLabel: 'View' },
  { id: 6, type: 'document', title: 'Documents Attached', message: 'Additional documents attached to ESC-2025-003 by MCMC.', time: '1 week ago', read: true, icon: FileText, action: '/agency/cases/ESC-2025-003', actionLabel: 'View' },
];

const typeColors: Record<string, string> = {
  escalation: 'text-destructive',
  clarification: 'text-status-rfi',
  upload: 'text-primary',
  status: 'text-status-closed',
  document: 'text-role-validator',
};

export default function LEANotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>Mark All as Read</Button>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            {items.map((notif) => {
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
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0" onClick={() => navigate(notif.action)}>
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
