import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Download, Filter, TrendingUp, AlertTriangle, CheckCircle2, 
  MapPin, PieChart as PieChartIcon, Activity, ActivityIcon,
  FileSpreadsheet, FileText, BarChartIcon, Calendar as CalendarIcon,
  ChevronsUpDown, Check
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import MalaysiaIncidentMap from '../MalaysiaIncidentMap';

// Severity Colors
const SEVERITY_COLORS: Record<string, string> = {
  Critical: '#EF4444', // Solid Red
  High: '#F97316',     // Orange
  Medium: '#FACC15',   // Yellow
  Low: '#22C55E',      // Green
};

// Incident Category Colors
const CATEGORY_COLORS: Record<string, string> = {
  'Prohibited Postal Items': '#A855F7', // Light Purple
  'Serious Threat': '#7F1D1D',          // Dark Red / Maroon
  'Medium Severity Incident': '#3B82F6', // Blue
  'Operational Issues': '#F59E0B',      // Amber
  'Other': '#737373',                   // Neutral Grey
};

// Trend Colors
const TREND_COLORS = {
  Submitted: '#3B82F6', // Blue
  Closed: '#22C55E',    // Green
  Escalated: '#EF4444'  // Red
};

const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '8px',
  color: 'hsl(var(--foreground))',
  fontSize: '12px',
};

// Mock Data
const SEVERITY_DATA = [
  { name: 'Critical', value: 12, color: SEVERITY_COLORS['Critical'] },
  { name: 'High', value: 25, color: SEVERITY_COLORS['High'] },
  { name: 'Medium', value: 45, color: SEVERITY_COLORS['Medium'] },
  { name: 'Low', value: 18, color: SEVERITY_COLORS['Low'] },
];

const CATEGORY_DATA = [
  { name: 'Serious Threat', value: 10, color: CATEGORY_COLORS['Serious Threat'] },
  { name: 'Prohibited Postal Items', value: 20, color: CATEGORY_COLORS['Prohibited Postal Items'] },
  { name: 'Medium Severity Incident', value: 45, color: CATEGORY_COLORS['Medium Severity Incident'] },
  { name: 'Operational Issues', value: 15, color: CATEGORY_COLORS['Operational Issues'] },
  { name: 'Other', value: 10, color: CATEGORY_COLORS['Other'] },
];

const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 
  'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 
  'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

const STATE_DATA = [
  { name: 'Selangor', count: 85 },
  { name: 'Kuala Lumpur', count: 72 },
  { name: 'Johor', count: 45 },
  { name: 'Penang', count: 38 },
  { name: 'Sabah', count: 30 },
  { name: 'Sarawak', count: 28 },
  { name: 'Perak', count: 25 },
  { name: 'Kedah', count: 20 },
  { name: 'Melaka', count: 18 },
  { name: 'Negeri Sembilan', count: 15 },
  { name: 'Pahang', count: 12 },
  { name: 'Terengganu', count: 8 },
  { name: 'Kelantan', count: 6 },
  { name: 'Perlis', count: 4 },
  { name: 'Putrajaya', count: 3 },
  { name: 'Labuan', count: 1 },
];

const TREND_DATA = [
  { month: 'Oct', submitted: 24, closed: 18, escalated: 2 },
  { month: 'Nov', submitted: 32, closed: 22, escalated: 4 },
  { month: 'Dec', submitted: 18, closed: 15, escalated: 1 },
  { month: 'Jan', submitted: 45, closed: 30, escalated: 5 },
  { month: 'Feb', submitted: 38, closed: 28, escalated: 3 },
  { month: 'Mar', submitted: 52, closed: 35, escalated: 6 },
];

const IMPACT_DATA = [
  { name: 'Financial', value: 45, color: CATEGORY_COLORS['Medium Severity Incident'] },
  { name: 'Operational', value: 35, color: CATEGORY_COLORS['Operational Issues'] },
  { name: 'Safety/Security', value: 20, color: CATEGORY_COLORS['Serious Threat'] },
];

// Custom Legend for Pie/Donut charts
const renderCustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-1.5 text-foreground">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="5" fill={entry.color} />
          </svg>
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export interface AnalyticsDashboardProps {
  scope: 'organisation' | 'full' | 'escalated';
  userRole: 'reporter' | 'admin' | 'reviewer' | 'validator' | 'investigator' | 'agency';
  organisationName?: string;
  kpiOverview?: React.ReactNode;
}

export default function AnalyticsDashboard({ scope, userRole, organisationName, kpiOverview }: AnalyticsDashboardProps) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRangeType, setDateRangeType] = useState('this-month');
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  const [stateOpen, setStateOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('all');

  const handleApplyFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsFiltered(true);
      setIsLoading(false);
    }, 600);
  };

  const dashboardTitle = scope === 'organisation' && organisationName 
    ? `Organisation Analytics: ${organisationName}`
    : scope === 'escalated'
    ? 'Escalated Cases Analytics (Agency Scope)'
    : 'Platform Global Analytics';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Report</h1>
          <p className="text-muted-foreground mt-1">{dashboardTitle}</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-11 px-6 gap-2 shadow-sm">
              <Download className="h-4 w-4" /> Export Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            <DropdownMenuItem className="py-3 px-4 flex items-center gap-3 cursor-pointer">
              <div className="h-8 w-8 rounded bg-green-50 flex items-center justify-center text-green-600">
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-foreground">Excel Spreadsheet</span>
                <span className="text-[10px] text-muted-foreground">Export format: .xlsx</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 px-4 flex items-center gap-3 cursor-pointer mt-1">
              <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-foreground">CSV Dataset</span>
                <span className="text-[10px] text-muted-foreground">Export format: .csv</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mandatory Filter Bar */}
      <Card className="border-border shadow-sm overflow-hidden bg-card">
        <CardContent className="p-0">
          <div className="p-4 bg-muted/30 border-b border-border flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Strategic Data Filter</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest pl-1">Date Range</label>
              <Select 
                value={dateRangeType} 
                onValueChange={(val) => {
                  setDateRangeType(val);
                  if (val !== 'custom') {
                    setDateStart(undefined);
                    setDateEnd(undefined);
                  }
                }}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRangeType === 'custom' && (
              <>
                <div className="space-y-2 animate-in fade-in zoom-in duration-200">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest pl-1">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal border-border bg-background",
                          !dateStart && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateStart ? format(dateStart, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateStart}
                        onSelect={setDateStart}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 animate-in fade-in zoom-in duration-200">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest pl-1">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal border-border bg-background",
                          !dateEnd && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateEnd ? format(dateEnd, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateEnd}
                        onSelect={setDateEnd}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest pl-1">Incident Category</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="prohibited">Prohibited Postal Items</SelectItem>
                  <SelectItem value="threat">Serious Threat</SelectItem>
                  <SelectItem value="medium">Medium Severity</SelectItem>
                  <SelectItem value="operational">Operational Issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest pl-1">State/Region</label>
              <Popover open={stateOpen} onOpenChange={setStateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={stateOpen}
                    className="w-full justify-between bg-background font-normal border-border h-10 px-3 py-2"
                  >
                    <span className="truncate">
                      {selectedState === 'all'
                        ? "Entire Malaysia"
                        : MALAYSIAN_STATES.find((state) => state === selectedState)}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 flex" align="start">
                  <Command className="w-full min-w-[200px]">
                    <CommandInput placeholder="Search state..." />
                    <CommandList>
                      <CommandEmpty>No state found.</CommandEmpty>
                      <CommandGroup className="max-h-[250px] overflow-y-auto custom-scrollbar">
                        <CommandItem
                          value="all"
                          onSelect={() => {
                            setSelectedState('all');
                            setStateOpen(false);
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", selectedState === 'all' ? "opacity-100" : "opacity-0")} />
                          Entire Malaysia
                        </CommandItem>
                        {MALAYSIAN_STATES.map((state) => (
                          <CommandItem
                            key={state}
                            value={state}
                            onSelect={() => {
                              setSelectedState(state);
                              setStateOpen(false);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", selectedState === state ? "opacity-100" : "opacity-0")} />
                            {state}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest pl-1">Case Status</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="closed">Closed / Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleApplyFilters} 
              disabled={isLoading}
              className="h-10 shadow-sm transition-all font-bold uppercase tracking-wider"
            >
              {isLoading ? "Processing..." : "Apply Filters"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {!isFiltered ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-xl bg-card">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <ActivityIcon className="h-8 w-8 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Dashboard Ready</h3>
          <p className="text-muted-foreground text-center max-w-md mt-2 text-sm leading-relaxed px-6">
            Configure your parameters above and click "Apply Filters" to generate corresponding visualizations for {scope === 'full' ? 'all organizations' : 'your organization'}.
          </p>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          
          {/* Custom Role-Specific KPIs (if any) */}
          {kpiOverview && (
            <div className="mb-6">
              {kpiOverview}
            </div>
          )}

          {/* Charts Row 1: Line and Geographic Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Incident & Status Trends */}
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border bg-muted/20">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> Incident & Status Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TREND_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                      <Legend content={renderCustomLegend} />
                      <Line type="monotone" dataKey="submitted" name="Submitted" stroke={TREND_COLORS.Submitted} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="closed" name="Closed" stroke={TREND_COLORS.Closed} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="escalated" name="Escalated" stroke={TREND_COLORS.Escalated} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Geographic Analysis */}
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border bg-muted/20">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Incidents by State
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full overflow-y-auto pr-2 custom-scrollbar">
                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={STATE_DATA} layout="vertical" margin={{ left: -10, bottom: -5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} hide />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} cursor={{ fill: 'hsl(var(--muted) / 0.2)' }} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={16} name="Incidents" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2: Distributions and Impact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category Analysis */}
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border bg-muted/20">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4 text-primary" /> Incident Category
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                        {CATEGORY_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="mt-4 space-y-2 px-2 border-t border-border pt-4">
                  {CATEGORY_DATA.map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-muted-foreground">{c.name}</span>
                      </div>
                      <span className="font-semibold">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Severity Distribution */}
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border bg-muted/20">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" /> Severity Level
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={SEVERITY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                        {SEVERITY_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="mt-4 space-y-2 px-2 border-t border-border pt-4">
                  {SEVERITY_DATA.map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="text-muted-foreground">{s.name}</span>
                      </div>
                      <span className="font-semibold">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Analysis */}
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border bg-muted/20">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BarChartIcon className="h-4 w-4 text-primary" /> Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={IMPACT_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} hide />
                      <Tooltip contentStyle={CHART_TOOLTIP_STYLE} cursor={{ fill: 'hsl(var(--muted) / 0.1)' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                        {IMPACT_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 px-2 border-t border-border pt-4 text-sm text-center text-muted-foreground flex items-center justify-center p-2 h-full">
                  Multi-dimensional impact grouping based on case nature and downstream consequences.
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      )}
    </div>
  );
}
