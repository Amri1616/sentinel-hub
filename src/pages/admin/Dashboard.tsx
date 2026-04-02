import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, FileText, Activity, Settings, Database, Bell, Shield, Home, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function SystemAdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">System Admin Dashboard</h1>
          <p className="text-muted-foreground">MCMC System Administration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/choose-role')}>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Change Role
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="border-role-system-admin/20 cursor-pointer hover:border-role-system-admin/40 transition-colors"
          onClick={() => handleNavigation('/admin/organisations')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Licensees</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-system-admin">124</div>
            <p className="text-xs text-muted-foreground mt-1">Active organisations</p>
          </CardContent>
        </Card>

        <Card 
          className="border-primary/20 cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => handleNavigation('/admin/users')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">487</div>
            <p className="text-xs text-muted-foreground mt-1">Internal + External</p>
          </CardContent>
        </Card>

        <Card 
          className="border-role-reviewer/20 cursor-pointer hover:border-role-reviewer/40 transition-colors"
          onClick={() => handleNavigation('/case-officer/incidents')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-reviewer">2,847</div>
            <p className="text-xs text-muted-foreground mt-1">All-time</p>
          </CardContent>
        </Card>

        <Card 
          className="border-status-closed/20 cursor-pointer hover:border-status-closed/40 transition-colors"
          onClick={() => handleNavigation('/admin/audit-logs')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-closed">99.7%</div>
            <p className="text-xs text-muted-foreground mt-1">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleNavigation('/admin/users')}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleNavigation('/admin/organisations')}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Manage Organisations
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleNavigation('/admin/master-data')}
            >
              <Database className="mr-2 h-4 w-4" />
              Master Data
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => toast({ title: "Workflow Config", description: "Coming soon." })}
            >
              <Settings className="mr-2 h-4 w-4" />
              Workflow Config
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => toast({ title: "Notifications", description: "Coming soon." })}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => handleNavigation('/admin/audit-logs')}
            >
              <Shield className="mr-2 h-4 w-4" />
              Audit Logs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Platform Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm font-medium mb-1">SLA Performance</p>
              <p className="text-xs text-muted-foreground">
                SLA breaches are often tied to Dangerous Goods category
              </p>
            </div>
            <div className="p-3 border border-role-validator/20 rounded-lg bg-role-validator/5">
              <p className="text-sm font-medium mb-1">Resource Planning</p>
              <p className="text-xs text-muted-foreground">
                Consider adding more Reviewers during peak months (Oct-Dec)
              </p>
            </div>
            <div className="p-3 border border-status-rfi/20 rounded-lg bg-status-rfi/5">
              <p className="text-sm font-medium mb-1">System Optimization</p>
              <p className="text-xs text-muted-foreground">
                Auto-routing rules are reducing manual assignment by 35%
              </p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              * AI insights are for demonstration purposes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Configuration Changes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { action: 'Updated SLA rule', user: 'Admin User', time: '2 hours ago' },
            { action: 'Added new organisation type', user: 'Admin User', time: '1 day ago' },
            { action: 'Modified workflow routing', user: 'Super Admin', time: '3 days ago' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 border-b border-border/40 last:border-0">
              <div>
                <p className="text-sm">{log.action}</p>
                <p className="text-xs text-muted-foreground">by {log.user}</p>
              </div>
              <p className="text-xs text-muted-foreground">{log.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
