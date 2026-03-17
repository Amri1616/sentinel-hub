import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
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
import { Badge } from '@/components/ui/badge';

const navItems = [
  { title: 'Search & Filter', path: '/reviewer/search', icon: Search },
  { title: 'Dashboard', path: '/reviewer/dashboard', icon: LayoutDashboard },
  { title: 'Notifications', path: '/reviewer/notifications', icon: Bell, badge: 4 },
  { title: 'Assignment Inbox', path: '/reviewer/inbox', icon: Inbox, badge: 8 },
  { title: 'Case Monitoring', path: '/reviewer/all-cases', icon: Users },
  { title: 'Analytics & Report', path: '/reviewer/reports', icon: FileBarChart },
  { title: 'Post Announcement', path: '/reviewer/announcements', icon: Megaphone },
  { title: 'Profile', path: '/reviewer/security', icon: Shield },
];

export default function CaseOfficerLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex -mx-4 -mt-6 -mb-6 min-h-[calc(100vh-4rem)]">
      <aside
        className={cn(
          'sticky top-16 h-[calc(100vh-4rem)] border-r border-border bg-card/50 backdrop-blur transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : 'w-64'
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
              item.path === '/reviewer/inbox'
                ? location.pathname === '/reviewer/inbox' || location.pathname === '/reviewer/incidents'
                : item.path === '/reviewer/dashboard'
                ? location.pathname === '/reviewer/dashboard'
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
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
