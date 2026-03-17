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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { title: 'Dashboard', path: '/reporter/dashboard', icon: LayoutDashboard },
  { title: 'Notifications', path: '/reporter/notifications', icon: Bell, badge: 3 },
  { title: 'New Incident', path: '/reporter/incidents/new', icon: PlusCircle },
  { title: 'My Submissions', path: '/reporter/incidents', icon: FolderOpen },
  { title: 'Analytics & Reports', path: '/reporter/analytics', icon: BarChart3 },
  { title: 'Profile', path: '/reporter/profile', icon: Shield },
];

export default function ReporterLayout() {
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
              item.path === '/reporter/incidents'
                ? location.pathname === '/reporter/incidents'
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
