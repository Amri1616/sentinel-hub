import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  Bell,
  Shield,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { title: 'Dashboard', path: '/lea/dashboard', icon: LayoutDashboard },
  { title: 'Notifications', path: '/lea/notifications', icon: Bell, badge: 3 },
  { title: 'Escalated Cases', path: '/lea/cases', icon: FolderOpen },
  { title: 'Analytics & Report', path: '/lea/analytics', icon: BarChart3 },
  { title: 'Profile', path: '/lea/security', icon: Shield },
];

export default function LEALayout() {
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
        <div className={cn('p-4 border-b border-border', collapsed && 'px-2')}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'hsl(220 70% 50% / 0.2)' }}>
                <Shield className="h-5 w-5" style={{ color: 'hsl(220 70% 50%)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">Agency</p>
                <p className="text-xs text-muted-foreground truncate">Ahmad Faizal</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'hsl(220 70% 50% / 0.2)' }}>
                <Shield className="h-5 w-5" style={{ color: 'hsl(220 70% 50%)' }} />
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
                    ? 'border text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                  collapsed && 'justify-center px-2'
                )}
                style={isActive ? { backgroundColor: 'hsl(220 70% 50% / 0.15)', borderColor: 'hsl(220 70% 50% / 0.3)', color: 'hsl(220 70% 50%)' } : undefined}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className={cn('h-5 w-5 shrink-0')} style={isActive ? { color: 'hsl(220 70% 50%)' } : undefined} />
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
