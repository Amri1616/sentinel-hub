import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Activity,
  LayoutDashboard,
  Inbox,
  Search,
  FileBarChart,
  Users,
  Bell,
  Shield,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Megaphone,
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
  { title: 'Dashboard', path: '/case-officer/dashboard', icon: LayoutDashboard },
  { title: 'Notifications', path: '/case-officer/notifications', icon: Bell, badge: 4 },
  { title: 'Case Monitoring', path: '/case-officer/all-cases', icon: Users },
  { title: 'Analytics & Report', path: '/case-officer/reports', icon: FileBarChart },
  { title: 'Post Announcement', path: '/case-officer/announcements', icon: Megaphone },
  { title: 'Profile', path: '/case-officer/security', icon: Shield },
];

const recentActivity = [
  { id: 1, text: 'Clarification response received for #PSIRP-2025-0026', statusText: '', statusClass: '', dotClass: 'bg-primary', time: '15 min ago' },
  { id: 2, text: 'New case assigned: #PSIRP-2025-0028', statusText: '', statusClass: '', dotClass: 'bg-role-reviewer', time: '1 hour ago' },
  { id: 3, text: 'Escalation approved for #PSIRP-2025-0022', statusText: '', statusClass: '', dotClass: 'bg-status-closed', time: '3 hours ago' },
  { id: 4, text: 'Supervisor rejected escalation for #PSIRP-2025-0020', statusText: '', statusClass: '', dotClass: 'bg-destructive', time: '5 hours ago' },
];

const sidebarAnnouncements = [
  { id: '1', title: 'New SOP for Critical Case Escalation', message: 'All Case Officers must follow the updated SOP for escalating cases rated "Critical" or "High" severity to LEA agencies. Key changes include: mandatory supervisor pre-approval before escalation submission, a new justification template, and revised turnaround times. Please review the full SOP document shared via internal portal and acknowledge receipt by 20 January 2025.', from: 'MCMC Management', time: '2 hours ago', date: '18 Jan 2025', priority: 'high' as const },
  { id: '2', title: 'System Maintenance — 25 Jan 2025', message: 'The PSIRP platform will undergo scheduled maintenance on Saturday, 25 January 2025, from 2:00 AM to 6:00 AM (MYT). During this window, the system will be temporarily unavailable. Please ensure all pending assessments and case updates are saved before the maintenance period begins.', from: 'System Admin', time: '1 day ago', date: '17 Jan 2025', priority: 'normal' as const },
  { id: '3', title: 'Q4 2024 Incident Report Published', message: 'The quarterly incident analysis report for Q4 2024 has been published. The report covers trends in postal security incidents, response time benchmarks, and recommendations for improved case handling. All Case Officers are encouraged to review the findings and integrate relevant insights into ongoing investigations.', from: 'MCMC Analytics', time: '3 days ago', date: '15 Jan 2025', priority: 'normal' as const },
  { id: '4', title: 'Training: Advanced Case Review Techniques', message: 'A specialised training session on advanced case review techniques will be held on 22 January 2025 at 10:00 AM. Topics include cross-referencing evidence, identifying fraud patterns, and writing effective preliminary findings. Registration is open on the internal learning portal.', from: 'MCMC Training Unit', time: '5 days ago', date: '13 Jan 2025', priority: 'normal' as const },
  { id: '5', title: 'Holiday Schedule Reminder', message: 'Please note the upcoming public holiday on 1 February 2025 (Federal Territory Day). The helpdesk and supervisor approvals will resume on the next business day. Urgent escalations during this period should follow the emergency protocol outlined in SOP-ESC-003.', from: 'System Admin', time: '1 week ago', date: '11 Jan 2025', priority: 'normal' as const },
];

export default function CaseOfficerLayout() {
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
        {/* Officer badge */}
        <div className={cn('p-4 border-b border-border', collapsed && 'px-2')}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-role-reviewer/20 flex items-center justify-center shrink-0">
                <ClipboardCheck className="h-5 w-5 text-role-reviewer" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">MCMC Case Officer</p>
                <p className="text-xs text-muted-foreground truncate">Mohd Kamal</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-lg bg-role-reviewer/20 flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-role-reviewer" />
              </div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.path === '/case-officer/inbox'
                ? location.pathname === '/case-officer/inbox' || location.pathname === '/case-officer/incidents'
                : item.path === '/case-officer/dashboard'
                  ? location.pathname === '/case-officer/dashboard'
                  : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  isActive
                    ? 'bg-role-reviewer/15 text-role-reviewer border border-role-reviewer/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-role-reviewer')} />
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
            {/* Recent Activity */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Activity className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Recent Activity</span>
              </div>
              <div className="space-y-0">
                {recentActivity.map((item, idx) => (
                  <div
                    key={item.id}
                    className={cn(
                      'flex items-start gap-2.5 py-2.5',
                      idx < recentActivity.length - 1 && 'border-b border-border/50'
                    )}
                  >
                    <div className={cn('h-2 w-2 rounded-full mt-1 shrink-0', item.dotClass)} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs leading-snug">
                        {item.text}{item.statusText && <> <span className={item.statusClass}>{item.statusText}</span></>}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Announcements */}
            <div className="px-5 py-4 pt-0">
              <div className="flex items-center gap-1.5 mb-3.5">
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

        {/* Collapse toggle */}
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

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
