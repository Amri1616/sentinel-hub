import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  Bell,
  BarChart3,
  Shield,
  ChevronLeft,
  ChevronRight,
  Building2,
  Activity,
  Megaphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';

const recentActivity = [
  {
    id: 1,
    text: 'Case PSIR-2026-004 moved to',
    statusText: 'Under Review',
    statusClass: 'text-status-in-review',
    dotClass: 'bg-status-in-review',
    time: '2 hours ago',
  },
  {
    id: 2,
    text: 'Clarification requested for Case PSIR-2026-002',
    statusText: '',
    statusClass: '',
    dotClass: 'bg-status-rfi',
    time: '5 hours ago',
  },
  {
    id: 3,
    text: 'Case PSIR-2026-001',
    statusText: 'Closed',
    statusClass: 'text-status-closed',
    dotClass: 'bg-status-closed',
    time: '1 day ago',
  },
];

const sidebarAnnouncements = [
  { id: '1', title: 'System Maintenance Scheduled', message: 'The system will undergo scheduled maintenance this Saturday from 2:00 AM to 6:00 AM (MYT). During this window, the platform will be temporarily unavailable. Please ensure all pending drafts are saved before the maintenance period begins. We apologise for any inconvenience and appreciate your understanding.', from: 'System Admin', time: '2 hours ago', date: '8 Mar 2026', priority: 'high' as const },
  { id: '2', title: 'New Reporting Guidelines', message: 'Please review the updated incident reporting guidelines effective next month. Key changes include revised classification categories for postal security incidents, updated evidence requirements for escalation cases, and new mandatory fields in the incident submission form. A detailed document has been shared via email. All reporters must acknowledge receipt by 15 March 2026.', from: 'Licensee Admin', time: '1 day ago', date: '7 Mar 2026', priority: 'normal' as const },
  { id: '3', title: 'Training Session Available', message: 'Join our monthly training session on best practices for incident documentation. This session will cover: proper evidence attachment guidelines, how to write effective incident descriptions, common mistakes to avoid, and a live Q&A with the MCMC review team. Register through the Learning portal by 10 March 2026.', from: 'Licensee Admin', time: '3 days ago', date: '5 Mar 2026', priority: 'normal' as const },
];

const navItems = [
  { title: 'Dashboard', path: '/licensee-reporter/dashboard', icon: LayoutDashboard },
  { title: 'Notifications', path: '/licensee-reporter/notifications', icon: Bell, badge: 3 },
  { title: 'New Incident', path: '/licensee-reporter/incidents/new', icon: PlusCircle },
  { title: 'My Submissions', path: '/licensee-reporter/incidents', icon: FolderOpen },
  { title: 'Analytics & Reports', path: '/licensee-reporter/analytics', icon: BarChart3 },
  { title: 'Profile', path: '/licensee-reporter/profile', icon: Shield },
];

export default function ReporterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof sidebarAnnouncements)[number] | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDashboard = location.pathname === '/licensee-reporter/dashboard';

  return (
    <div className="flex -mx-4 -mt-6 -mb-6 min-h-[calc(100vh-4rem)]">
      <aside
        className={cn(
          'sticky top-16 h-[calc(100vh-4rem)] border-r border-border bg-card/50 backdrop-blur transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : isDashboard ? 'w-80' : 'w-64'
        )}
      >
        {/* Org badge */}
        <div className={cn('p-4 border-b border-border', collapsed && 'px-2')}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-role-reporter/20 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-role-reporter" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">Global Express Logistics Sdn Bhd</p>
                <p className="text-xs text-muted-foreground truncate">Mastura Salleh</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-lg bg-role-reporter/20 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-role-reporter" />
              </div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.path === '/licensee-reporter/incidents'
                ? location.pathname === '/licensee-reporter/incidents'
                : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  isActive
                    ? 'bg-role-reporter/15 text-role-reporter border border-role-reporter/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-role-reporter')} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{t(item.title)}</span>
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
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t('Recent Activity')}</span>
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
                        {t(item.text)}{item.statusText && <> <span className={item.statusClass}>{t(item.statusText)}</span></>}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{t(item.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="px-5 py-4 pt-0">
              <div className="flex items-center gap-1.5 mb-3.5">
                <Megaphone className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t('Announcements')}</span>
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
                    <p className="text-xs font-medium leading-tight mb-1.5 line-clamp-1">{t(a.title)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{t(a.from)}</span>
                      <span className="text-[10px] text-muted-foreground">{t(a.time)}</span>
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
              <DialogTitle>{selectedAnnouncement ? t(selectedAnnouncement.title) : ''}</DialogTitle>
              <DialogDescription asChild>
                <div className="flex items-center gap-3 pt-1">
                  <span>{t('From:')} {selectedAnnouncement?.from}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span>{selectedAnnouncement?.date}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="text-sm leading-relaxed text-foreground/90 py-2 whitespace-pre-line">
              {selectedAnnouncement ? t(selectedAnnouncement.message) : ''}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">{t('Close')}</Button>
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
