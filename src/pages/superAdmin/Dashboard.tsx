import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, AlertTriangle, TrendingUp, Map, BarChart3, Brain, Shield, Home, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';
import MalaysiaIncidentMap from '@/components/MalaysiaIncidentMap';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const categoryTrendData = [
    { month: 'Jan', Loss: 68, Theft: 52, DangerousGoods: 38, Tampering: 28, Fraud: 24 },
    { month: 'Feb', Loss: 72, Theft: 48, DangerousGoods: 42, Tampering: 32, Fraud: 22 },
    { month: 'Mar', Loss: 65, Theft: 55, DangerousGoods: 45, Tampering: 30, Fraud: 26 },
    { month: 'Apr', Loss: 78, Theft: 58, DangerousGoods: 48, Tampering: 35, Fraud: 28 },
    { month: 'May', Loss: 82, Theft: 62, DangerousGoods: 52, Tampering: 38, Fraud: 30 },
    { month: 'Jun', Loss: 75, Theft: 68, DangerousGoods: 48, Tampering: 42, Fraud: 32 },
    { month: 'Jul', Loss: 85, Theft: 72, DangerousGoods: 55, Tampering: 45, Fraud: 35 },
    { month: 'Aug', Loss: 88, Theft: 65, DangerousGoods: 58, Tampering: 40, Fraud: 38 },
    { month: 'Sep', Loss: 92, Theft: 70, DangerousGoods: 62, Tampering: 48, Fraud: 42 },
    { month: 'Oct', Loss: 95, Theft: 75, DangerousGoods: 68, Tampering: 52, Fraud: 45 },
    { month: 'Nov', Loss: 98, Theft: 82, DangerousGoods: 72, Tampering: 55, Fraud: 48 },
    { month: 'Dec', Loss: 102, Theft: 88, DangerousGoods: 78, Tampering: 58, Fraud: 52 },
  ];

  const regionalData = [
    { region: 'Klang Valley', incidents: 456, percentage: 16.0 },
    { region: 'Johor', incidents: 382, percentage: 13.4 },
    { region: 'Penang', incidents: 328, percentage: 11.5 },
    { region: 'Sabah', incidents: 298, percentage: 10.5 },
    { region: 'Sarawak', incidents: 276, percentage: 9.7 },
    { region: 'Perak', incidents: 245, percentage: 8.6 },
    { region: 'Others', incidents: 862, percentage: 30.3 },
  ];

  const severityDistribution = [
    { name: 'Critical', value: 187, color: 'hsl(var(--destructive))' },
    { name: 'High', value: 542, color: 'hsl(var(--role-validator))' },
    { name: 'Medium', value: 1156, color: 'hsl(var(--primary))' },
    { name: 'Low', value: 962, color: 'hsl(var(--status-closed))' },
  ];

  const monthlyTrendData = [
    { month: 'Jan', incidents: 210, resolved: 198 },
    { month: 'Feb', incidents: 198, resolved: 189 },
    { month: 'Mar', incidents: 221, resolved: 208 },
    { month: 'Apr', incidents: 247, resolved: 231 },
    { month: 'May', incidents: 264, resolved: 248 },
    { month: 'Jun', incidents: 245, resolved: 233 },
    { month: 'Jul', incidents: 292, resolved: 273 },
    { month: 'Aug', incidents: 279, resolved: 265 },
    { month: 'Sep', incidents: 298, resolved: 281 },
    { month: 'Oct', incidents: 315, resolved: 296 },
    { month: 'Nov', incidents: 322, resolved: 304 },
    { month: 'Dec', incidents: 356, resolved: 331 },
  ];

  const colors = {
    Loss: 'hsl(var(--primary))',
    Theft: 'hsl(var(--destructive))',
    DangerousGoods: 'hsl(var(--role-validator))',
    Tampering: 'hsl(var(--role-investigator))',
    Fraud: 'hsl(var(--status-rfi))',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">MCMC Super Admin - National Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-role-super-admin/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-role-super-admin">2,847</div>
            <p className="text-xs text-muted-foreground mt-1">All-time</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">156</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Severity YTD</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">87</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Malaysia Incident Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-role-super-admin" />
            Malaysia Incident Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MalaysiaIncidentMap />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Regional Incident Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="region" className="text-xs" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="incidents" fill="hsl(var(--role-super-admin))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Incident Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { category: 'Loss', count: 842, percent: 29.6, color: 'hsl(var(--primary))' },
              { category: 'Theft', count: 612, percent: 21.5, color: 'hsl(var(--destructive))' },
              { category: 'Dangerous Goods', count: 487, percent: 17.1, color: 'hsl(var(--role-validator))' },
              { category: 'Tampering', count: 356, percent: 12.5, color: 'hsl(var(--role-investigator))' },
              { category: 'Fraud', count: 298, percent: 10.5, color: 'hsl(var(--status-rfi))' },
            ].map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.count}</span>
                    <span className="text-xs text-muted-foreground">({item.percent}%)</span>
                  </div>
                </div>
                <Progress value={item.percent * 3.38} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-role-super-admin/20 rounded-lg bg-role-super-admin/5">
              <p className="text-sm font-medium mb-2">Q4 Forecast</p>
              <p className="text-xs text-muted-foreground">
                AI predicts a spike in Dangerous Goods incidents in Q4 2025
              </p>
            </div>
            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <p className="text-sm font-medium mb-2">Risk Alert</p>
              <p className="text-xs text-muted-foreground">
                AI flags repeated high-severity incidents from Route 7 and Route 12
              </p>
            </div>
            <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
              <p className="text-sm font-medium mb-2">Policy Recommendation</p>
              <p className="text-xs text-muted-foreground">
                AI recommends reviewing SOPs for Licensee X (15 high-severity cases YTD)
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * AI insights are for demonstration purposes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Incident Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Total Incidents"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="hsl(var(--status-closed))" 
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Loss" stackId="a" fill={colors.Loss} />
                  <Bar dataKey="Theft" stackId="a" fill={colors.Theft} />
                  <Bar dataKey="DangerousGoods" stackId="a" fill={colors.DangerousGoods} name="Dangerous Goods" />
                  <Bar dataKey="Tampering" stackId="a" fill={colors.Tampering} />
                  <Bar dataKey="Fraud" stackId="a" fill={colors.Fraud} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {severityDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 border border-border/40 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Review Time</p>
              <p className="text-2xl font-bold">4.2 hrs</p>
              <Progress value={70} className="h-1 mt-2" />
            </div>
            <div className="p-4 border border-border/40 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Validation Time</p>
              <p className="text-2xl font-bold">2.8 hrs</p>
              <Progress value={85} className="h-1 mt-2" />
            </div>
            <div className="p-4 border border-border/40 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Avg Investigation</p>
              <p className="text-2xl font-bold">3.5 days</p>
              <Progress value={65} className="h-1 mt-2" />
            </div>
            <div className="p-4 border border-border/40 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Resolution</p>
              <p className="text-2xl font-bold">7.2 days</p>
              <Progress value={75} className="h-1 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => toast({ title: "AI Analytics", description: "Advanced analytics coming soon." })}
            >
              <Brain className="mr-2 h-4 w-4" />
              AI Analytics
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => toast({ title: "Global Report", description: "Report generation coming soon." })}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Global Report
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => toast({ title: "Audit Center", description: "Audit center coming soon." })}
            >
              <Shield className="mr-2 h-4 w-4" />
              Audit Center
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { service: 'Incident Reporting', status: 'Operational', uptime: '99.9%' },
              { service: 'Case Management', status: 'Operational', uptime: '99.8%' },
              { service: 'LEA Integration', status: 'Operational', uptime: '99.5%' },
              { service: 'Analytics Engine', status: 'Operational', uptime: '99.7%' },
            ].map((item) => (
              <div key={item.service} className="flex items-center justify-between p-2 border border-border/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-status-closed" />
                  <span className="text-sm">{item.service}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.uptime}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
