import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Settings2, 
  Clock, 
  Save, 
  Plus,
  Network,
  Workflow,
  History
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function WorkflowSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Workflows Updated",
      description: "Platform routing and escalation rules have been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workflow Configuration</h1>
        <p className="text-muted-foreground mt-1 text-sm">Design system-wide logic for case routing, status transitions, and SLAs.</p>
      </div>

      <Tabs defaultValue="routing" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full h-auto mb-6 bg-muted/50 p-1">
          <TabsTrigger value="routing" className="py-2.5">
            <Network className="h-4 w-4 mr-2" />
            Automatic Routing
          </TabsTrigger>
          <TabsTrigger value="escalation" className="py-2.5">
            <ArrowRight className="h-4 w-4 mr-2" />
            Escalation Rules
          </TabsTrigger>
          <TabsTrigger value="transitions" className="py-2.5">
            <Workflow className="h-4 w-4 mr-2" />
            Status Transitions
          </TabsTrigger>
          <TabsTrigger value="sla" className="py-2.5">
            <Clock className="h-4 w-4 mr-2" />
            SLA & Response
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routing" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  Initial Case Assignment
                  <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5 py-0">Active</Badge>
                </CardTitle>
                <CardDescription>Define how new incidents are assigned to reviewers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Default Routing Logic</Label>
                  <Select defaultValue="round-robin">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Logic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round-robin">Round Robin (Automatic)</SelectItem>
                      <SelectItem value="load-balanced">Load Balanced (By Queue Size)</SelectItem>
                      <SelectItem value="manual">Manual Assignment (MCMC Supervisor)</SelectItem>
                      <SelectItem value="regional">Regional Distribution (By State)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Auto-assign Critical to Seniors</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Enable Bulk Reassignment</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Custom Routing Rules</CardTitle>
                <CardDescription>Override default routing for specific incident types.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg bg-accent/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-tight uppercase">IF Category = "Dangerous Goods"</span>
                    <Badge variant="outline" className="text-[9px]">Rule #1</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">THEN Route to specialized "Hazardous Items Team"</p>
                </div>
                <Button variant="outline" size="sm" className="w-full text-[11px] font-bold uppercase tracking-widest">
                  <Plus className="mr-2 h-3 w-3" />
                  Add Custom Routing Rule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sla">
          <Card className="max-w-2xl border-border/40">
            <CardHeader>
              <CardTitle className="text-base">Resolution SLAs by Severity</CardTitle>
              <CardDescription>Set the maximum target time for complete case resolution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { severity: 'Critical', time: '24 Hours', color: 'bg-destructive' },
                { severity: 'High', time: '48 Hours', color: 'bg-orange-500' },
                { severity: 'Medium', time: '7 Days', color: 'bg-primary' },
                { severity: 'Low', time: '14 Days', color: 'bg-slate-500' },
              ].map((item) => (
                <div key={item.severity} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                    <span className="font-semibold text-sm">{item.severity} Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input defaultValue={item.time} className="w-[100px] h-8 text-xs text-right" />
                    <Settings2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline">
          <History className="mr-2 h-4 w-4" />
          Revert Changes
        </Button>
        <Button onClick={handleSave} className="px-8 shadow-lg shadow-primary/20 bg-primary">
          <Save className="mr-2 h-4 w-4" />
          Update System Workflows
        </Button>
      </div>
    </div>
  );
}
