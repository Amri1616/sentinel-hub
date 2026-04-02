import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, FileBarChart, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  { id: 1, type: 'escalation', title: 'Escalation Approved', message: 'New escalation approved for PSIRP-2025-0063 — referred to PDRM.', time: '2 hours ago', read: false, icon: AlertTriangle, action: '/internal/cases/PSIRP-2025-0063', actionLabel: 'View' },
  { id: 2, type: 'trend', title: 'Trend Alert', message: 'Spike in postal theft incidents detected in Selangor region.', time: '5 hours ago', read: false, icon: TrendingUp, action: '/internal/analytics', actionLabel: 'View' },
  { id: 3, type: 'closure', title: 'Case Closed', message: 'Case PSIRP-2025-0055 closed by Supervisor Ahmad — Action Taken.', time: '1 day ago', read: true, icon: CheckCircle, action: '/internal/cases/PSIRP-2025-0055', actionLabel: 'View' },
  { id: 4, type: 'report', title: 'Report Available', message: 'Monthly Compliance Report is now available for review.', time: '2 days ago', read: true, icon: FileBarChart, action: '/internal/analytics', actionLabel: 'View' },
  { id: 5, type: 'escalation', title: 'Escalation Rejected', message: 'Escalation rejected for PSIRP-2025-0058 — returned to Case Officer.', time: '3 days ago', read: true, icon: AlertTriangle, action: '/internal/cases/PSIRP-2025-0058', actionLabel: 'View' },
];

const typeColors: Record<string, string> = {
  escalation: 'text-destructive',
  trend: 'text-status-investigation',
  closure: 'text-status-closed',
  report: 'text-role-investigator',
};

export default function InvestigatorNotifications() {
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
