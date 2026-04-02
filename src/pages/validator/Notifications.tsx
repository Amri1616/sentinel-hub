import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  { id: 1, type: 'escalation', title: 'New Escalation Request', message: 'Ahmad Razif submitted escalation for PSIRP-2025-0045 – High-value theft case.', time: '2 hours ago', read: false, icon: AlertTriangle, action: '/supervisor/cases/PSIRP-2025-0045', actionLabel: 'Review' },
  { id: 2, type: 'escalation', title: 'New Escalation Request', message: 'Farah Amin submitted escalation for PSIRP-2025-0060 – Cross-border contraband.', time: '4 hours ago', read: false, icon: AlertTriangle, action: '/supervisor/cases/PSIRP-2025-0060', actionLabel: 'Review' },
  { id: 3, type: 'pending', title: 'Pending Closure Approval', message: 'PSIRP-2025-0031 awaiting your closure approval – submitted by Officer Lim.', time: '6 hours ago', read: false, icon: Clock, action: '/supervisor/cases/PSIRP-2025-0031', actionLabel: 'Review' },
  { id: 4, type: 'closure', title: 'Case Closure Confirmed', message: 'PSIRP-2025-0028 closed successfully – No Further Action.', time: '1 day ago', read: true, icon: CheckCircle, action: '/supervisor/cases/PSIRP-2025-0028', actionLabel: 'View' },
  { id: 5, type: 'approved', title: 'Escalation Approved', message: 'Your approval of PSIRP-2025-0042 has been processed. LEA notified.', time: '1 day ago', read: true, icon: Shield, action: '/supervisor/cases/PSIRP-2025-0042', actionLabel: 'View' },
  { id: 6, type: 'rejection', title: 'Escalation Rejected', message: 'PSIRP-2025-0037 escalation was rejected and returned to Case Officer.', time: '2 days ago', read: true, icon: XCircle, action: '/supervisor/cases/PSIRP-2025-0037', actionLabel: 'View' },
];

const typeColors: Record<string, string> = {
  escalation: 'text-destructive',
  pending: 'text-status-in-review',
  closure: 'text-status-closed',
  approved: 'text-role-reviewer',
  rejection: 'text-destructive',
};

export default function SupervisorNotifications() {
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
