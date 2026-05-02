import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ShieldCheck, 
  Building2, 
  Briefcase, 
  Scale, 
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  Map,
  Trophy
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function SuperAdminDashboard() {
  const summaryStats = [
    { 
      label: 'Total Users', 
      value: '1,284', 
      icon: Users, 
      color: 'text-blue-600', 
    },
    { 
      label: 'Total Licensee Reporter', 
      value: '487', 
      icon: Briefcase, 
      color: 'text-indigo-600', 
    },
    { 
      label: 'Total LEA Officer', 
      value: '312', 
      icon: ShieldCheck, 
      color: 'text-emerald-600', 
    },
    { 
      label: 'Total Licensee Organization', 
      value: '124', 
      icon: Building2, 
      color: 'text-violet-600', 
    },
    { 
      label: 'Total LEA Organization', 
      value: '11', 
      icon: Scale, 
      color: 'text-amber-600', 
    },
    { 
      label: 'Total Cases (Overall)', 
      value: '3,842', 
      icon: FileText, 
      color: 'text-rose-600', 
    },
  ];

  const statusData = [
    { name: 'New', value: 120, color: '#3b82f6' },
    { name: 'Under Review', value: 450, color: '#6366f1' },
    { name: 'Investigating', value: 380, color: '#f59e0b' },
    { name: 'Pending Endorsement', value: 520, color: '#8b5cf6' },
    { name: 'Completed', value: 2372, color: '#10b981' },
  ];

  const categoryData = [
    { name: 'Prohibited Items', value: 850, color: '#ef4444' },
    { name: 'Cyber Security', value: 1200, color: '#3b82f6' },
    { name: 'Serious Threat', value: 450, color: '#06b6d4' },
    { name: 'Medium Severity', value: 920, color: '#f97316' },
    { name: 'Operational Issues', value: 422, color: '#64748b' },
  ];

  const stateData = [
    { name: 'Selangor', value: 45, color: '#6366f1' },
    { name: 'Kuala Lumpur', value: 32, color: '#3b82f6' },
    { name: 'Johor', value: 18, color: '#06b6d4' },
    { name: 'Penang', value: 12, color: '#10b981' },
    { name: 'Sarawak', value: 8, color: '#f59e0b' },
    { name: 'Sabah', value: 5, color: '#f97316' },
    { name: 'Others', value: 4, color: '#64748b' },
  ];

  const topLicenseeData = [
    { name: 'Global Express', value: 450, color: '#3b82f6' },
    { name: 'SafeWay Couriers', value: 380, color: '#6366f1' },
    { name: 'FastTrack Delivery', value: 310, color: '#8b5cf6' },
    { name: 'Prime Shipping', value: 280, color: '#ec4899' },
    { name: 'Swift Logistics', value: 250, color: '#10b981' },
  ];

  const chartTooltipStyle = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    color: 'hsl(var(--foreground))',
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Superadmin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Government System Oversight — Public Sector Incident Response Platform (PSIRP)</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6 text-left">
        {summaryStats.map((stat, index) => (
          <Card 
            key={index} 
            className="border-border/40 hover:-translate-y-1 hover:shadow-lg hover:border-border transition-all duration-200 min-h-[120px] flex flex-col"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 flex items-end">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Primary Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Case Status Distribution */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold">Case Status Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={statusData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={130}
                  />
                  <Tooltip cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }} contentStyle={chartTooltipStyle} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cases by Category */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold">Cases by Category</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    height={60}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }} contentStyle={chartTooltipStyle} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Licensee Organization by State */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Map className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold">Licensee Organization by State</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }} contentStyle={chartTooltipStyle} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={28}>
                    {stateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Licensees by Number of Cases */}
        <Card className="border-border/40 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold">Top Licensees by Number of Cases</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topLicenseeData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }} contentStyle={chartTooltipStyle} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {topLicenseeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
