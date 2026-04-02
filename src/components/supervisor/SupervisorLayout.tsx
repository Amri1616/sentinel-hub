import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Megaphone,
  LayoutDashboard,
  FolderOpen,
  AlertTriangle,
  Shield,
  Bell,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';

const navItems = [
  { title: 'Dashboard', path: '/supervisor/dashboard', icon: LayoutDashboard },
  { title: 'Notifications', path: '/supervisor/notifications', icon: Bell, badge: 3 },
  { title: 'Pending Tasks', path: '/supervisor/escalations', icon: AlertTriangle, badge: 5 },
  { title: 'Case Monitoring', path: '/supervisor/cases', icon: FolderOpen },
  { title: 'Analytics & Report', path: '/supervisor/analytics', icon: BarChart3 },
  { title: 'Audit & Compliance', path: '/supervisor/audit', icon: Shield },
  { title: 'Profile', path: '/supervisor/security', icon: Shield },
];

const sidebarAnnouncements = [
  { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending reviews and approvals are completed before the maintenance period begins.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2025', priority: 'high' as const },
  { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. The revised guidelines cover new escalation thresholds, updated severity classification criteria, and mandatory documentation requirements for all case officers. All supervisors are expected to ensure compliance within their teams.', from: 'MCMC', time: '1 day ago', date: '7 Mar 2025', priority: 'normal' as const },
  { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation and case review. Topics include cross-referencing evidence, identifying fraud patterns, and writing effective preliminary findings. Registration is open on the internal learning portal until 15 March 2025.', from: 'MCMC Training Unit', time: '3 days ago', date: '5 Mar 2025', priority: 'normal' as const },
];

export default function SupervisorLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.endsWith("/dashboard");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof sidebarAnnouncements)[number] | null>(null);

  return (
    <div className="flex -mx-4 -mt-6 -mb-6 min-h-[calc(100vh-4rem)]">
      <aside
        className={cn(
          'sticky top-16 h-[calc(100vh-4rem)] border-r border-border bg-card/50 backdrop-blur transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : isDashboard ? 'w-80' : 'w-64'
        )}
      >
        <div className={cn('p-4 border-b border-border', collapsed && 'px-2')}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-role-validator/20 flex items-center justify-center shrink-0">
                <BadgeCheck className="h-5 w-5 text-role-validator" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">MCMC Supervisor</p>
                <p className="text-xs text-muted-foreground truncate">Sarah Lim</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-lg bg-role-validator/20 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-role-validator" />
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  isActive
                    ? 'bg-role-validator/15 text-role-validator border border-role-validator/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-role-validator')} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 text-xs px-1.5 py-0">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Dashboard sidebar widgets */}
        {isDashboard && !collapsed && (
          <div className="flex-1 overflow-y-auto border-t border-border mt-8">
            {/* Announcements */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Megaphone className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Announcements</span>
              </div>
              <div className="space-y-3">
                {sidebarAnnouncements.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedAnnouncement(a)}
                    className={cn(
                      'w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer hover:ring-1 hover:ring-primary/30',
                      a.priority === 'high'
                        ? 'border-destructive/40 bg-destructive/5 hover:bg-destructive/10'
                        : 'border-border/60 bg-secondary/20 hover:bg-secondary/40'
                    )}
                  >
                    <p className="text-xs font-medium leading-tight mb-1.5 line-clamp-1">{a.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{a.from}</span>
                      <span className="text-[10px] text-muted-foreground">{a.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        {/* Announcement Detail Modal */}
        <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => { if (!open) setSelectedAnnouncement(null); }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
              <DialogDescription asChild>
                <div className="flex items-center gap-3 pt-1">
                  <span>From: {selectedAnnouncement?.from}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span>{selectedAnnouncement?.date}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="text-sm leading-relaxed text-foreground/90 py-2 whitespace-pre-line">
              {selectedAnnouncement?.message}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </aside>

      <main className="flex-1 p-6 min-h-screen min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
