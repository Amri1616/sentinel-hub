import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Settings2, 
  MoreVertical, 
  Database, 
  Layers, 
  AlertTriangle, 
  Building2, 
  Bell,
  Search,
  Edit2,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MasterDataList() {
  const [activeTab, setActiveTab] = useState('categories');

  const categories = [
    { id: 1, name: 'Loss', description: 'Missing items during transit', code: 'CAT-001', status: 'active' },
    { id: 2, name: 'Theft', description: 'Stolen goods or parcels', code: 'CAT-002', status: 'active' },
    { id: 3, name: 'Dangerous Goods', description: 'Illegal or hazardous items', code: 'CAT-003', status: 'active' },
    { id: 4, name: 'Tampering', description: 'Opening or modifying parcels', code: 'CAT-004', status: 'active' },
    { id: 5, name: 'Fraud', description: 'Financial or identity irregularities', code: 'CAT-005', status: 'active' },
  ];

  const organizations = [
    { id: 1, name: 'Pos Malaysia Berhad', type: 'Public Utility', status: 'active', code: 'POS-01' },
    { id: 2, name: 'Ninja Van Malaysia', type: 'Private Courier', status: 'active', code: 'NIN-01' },
    { id: 3, name: 'J&T Express', type: 'Private Courier', status: 'active', code: 'JNT-01' },
    { id: 4, name: 'Flash Express', type: 'Private Courier', status: 'pending', code: 'FLS-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Master Data Management</h1>
          <p className="text-muted-foreground mt-1">Configure global classification entities, dropdown values, and system constants.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Entry
        </Button>
      </div>

      <Tabs defaultValue="categories" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto bg-muted/50 p-1 mb-6">
          <TabsTrigger value="categories" className="py-2.5">
            <Layers className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="severities" className="py-2.5">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Severities
          </TabsTrigger>
          <TabsTrigger value="organisations" className="py-2.5">
            <Building2 className="h-4 w-4 mr-2" />
            Org Types
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-2.5">
            <Bell className="h-4 w-4 mr-2" />
            Notif Types
          </TabsTrigger>
          <TabsTrigger value="system" className="py-2.5">
            <Settings2 className="h-4 w-4 mr-2" />
            Labels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <Card className="border-border/40 overflow-hidden shadow-sm">
            <CardHeader className="bg-accent/30 flex flex-row items-center justify-between py-4 border-b">
              <CardTitle className="text-base">Incident Categories</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter categories..." className="pl-10 h-8 text-sm" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Category Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>System Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-semibold">{cat.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{cat.description}</TableCell>
                      <TableCell className="font-mono text-[10px] tracking-widest">{cat.code}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organisations">
          <Card className="border-border/40 overflow-hidden shadow-sm">
            <CardHeader className="bg-accent/30 flex flex-row items-center justify-between py-4 border-b">
              <CardTitle className="text-base">Organisation Types & Codes</CardTitle>
              <Button size="sm" variant="outline">Import XML</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Classification</TableHead>
                    <TableHead>MCMC Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-semibold">{org.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{org.type}</TableCell>
                      <TableCell className="font-mono text-[10px] tracking-widest">{org.code}</TableCell>
                      <TableCell>
                        {org.status === 'active' ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-lg border border-primary/20">
        <Database className="h-5 w-5 text-primary" />
        <div className="text-xs">
          <p className="font-bold text-primary uppercase tracking-wider mb-1">Governance Note</p>
          <p className="text-muted-foreground">Changes to Master Data categories are mirrored across all roles in real-time. Deleting a categories is only allowed if no active cases are linked to it.</p>
        </div>
      </div>
    </div>
  );
}
