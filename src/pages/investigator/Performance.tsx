import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const officerData = [
  { name: 'Raj Kumar', cases: 18, avgDays: 5.2, escalationRate: '12%', clarifications: 4 },
  { name: 'Farah Amin', cases: 22, avgDays: 6.8, escalationRate: '18%', clarifications: 7 },
  { name: 'Lee Wei', cases: 15, avgDays: 7.1, escalationRate: '13%', clarifications: 3 },
  { name: 'Ahmad Razif', cases: 20, avgDays: 4.9, escalationRate: '10%', clarifications: 5 },
  { name: 'Nurul Hana', cases: 14, avgDays: 6.0, escalationRate: '21%', clarifications: 6 },
];

const officerChartData = officerData.map((o) => ({ name: o.name, cases: o.cases, avgDays: o.avgDays }));

const orgRisk = [
  { org: 'Global Express Logistics', escalationFreq: '14%', highSeverity: '22%', repeatTypes: 'Theft, Damage', reportDelay: '1.8d' },
  { org: 'Pos Malaysia', escalationFreq: '19%', highSeverity: '28%', repeatTypes: 'Theft', reportDelay: '2.5d' },
  { org: 'J&T Express', escalationFreq: '11%', highSeverity: '15%', repeatTypes: 'Damage', reportDelay: '1.2d' },
  { org: 'CityLink', escalationFreq: '8%', highSeverity: '10%', repeatTypes: 'Tampering', reportDelay: '1.5d' },
  { org: 'DHL eCommerce', escalationFreq: '22%', highSeverity: '35%', repeatTypes: 'Hazmat, Theft', reportDelay: '3.1d' },
];

const tooltipStyle = { backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '6px' };

export default function InvestigatorPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Monitoring</h1>
        <p className="text-muted-foreground">Officer and organisation performance analytics</p>
      </div>

      <Tabs defaultValue="officer" className="space-y-4">
        <TabsList>
          <TabsTrigger value="officer">Officer Performance</TabsTrigger>
          <TabsTrigger value="org">Organisation Risk Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="officer" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Officer Caseload & Resolution Time</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={officerChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="cases" fill="hsl(var(--role-investigator))" radius={[4, 4, 0, 0]} name="Total Cases" />
                    <Bar yAxisId="right" dataKey="avgDays" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Avg Days" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Officer</TableHead>
                    <TableHead>Cases</TableHead>
                    <TableHead>Avg Processing (days)</TableHead>
                    <TableHead>Escalation Rate</TableHead>
                    <TableHead>Clarifications</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {officerData.map((o) => (
                    <TableRow key={o.name}>
                      <TableCell className="font-medium">{o.name}</TableCell>
                      <TableCell>{o.cases}</TableCell>
                      <TableCell>{o.avgDays}</TableCell>
                      <TableCell>{o.escalationRate}</TableCell>
                      <TableCell>{o.clarifications}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="org">
          <Card>
            <CardHeader><CardTitle>Organisation Risk Profile</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Escalation Freq</TableHead>
                    <TableHead>High Severity %</TableHead>
                    <TableHead>Repeat Incident Types</TableHead>
                    <TableHead>Avg Reporting Delay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orgRisk.map((o) => (
                    <TableRow key={o.org}>
                      <TableCell className="font-medium">{o.org}</TableCell>
                      <TableCell>{o.escalationFreq}</TableCell>
                      <TableCell>{o.highSeverity}</TableCell>
                      <TableCell>{o.repeatTypes}</TableCell>
                      <TableCell>{o.reportDelay}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
