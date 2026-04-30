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
  Search,
  Edit2,
  CheckCircle2,
  XCircle,
  Shield,
  Activity,
  ListTodo,
  Users,
  User2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

export default function MasterDataList() {
  const [activeUserRole, setActiveUserRole] = useState('licensee-admin');
  const [activeDataType, setActiveDataType] = useState('categories');

  // User roles
  const userRoles = [
    { id: 'licensee-admin', label: 'Licensee Admin', icon: Users },
    { id: 'licensee-reporter', label: 'Licensee Reporter', icon: User2 },
    { id: 'case-officer', label: 'Case Officer', icon: Shield },
    { id: 'supervisor', label: 'Supervisor', icon: Settings2 },
    { id: 'lea-agency', label: 'LEA Agency User', icon: Building2 },
    { id: 'super-admin', label: 'Super Admin', icon: Database },
  ];

  // Master data for each user role
  const masterDataByRole = {
    'licensee-admin': {
      categories: [
        { id: 1, name: 'Dangerous Goods', code: 'CAT-DG', status: 'active' },
        { id: 2, name: 'Security Breach', code: 'CAT-SB', status: 'active' },
        { id: 3, name: 'Theft/Loss', code: 'CAT-TL', status: 'active' },
      ],
      severities: [
        { id: 1, name: 'Critical', code: 'SEV-1', status: 'active' },
        { id: 2, name: 'High', code: 'SEV-2', status: 'active' },
      ],
      statuses: [
        { id: 1, name: 'Submitted', code: 'ST-SUB', status: 'active' },
        { id: 2, name: 'Under Review', code: 'ST-REV', status: 'active' },
      ],
      leas: [
        { id: 1, name: 'PDRM - Commercial Crime', code: 'LEA-PDRM-CC', status: 'active' },
      ],
      orgTypes: [
        { id: 1, name: 'Public Utility (Licensee)', code: 'ORG-PUB', status: 'active' },
      ],
    },
    'licensee-reporter': {
      categories: [
        { id: 1, name: 'Dangerous Goods', code: 'CAT-DG', status: 'active' },
        { id: 2, name: 'Security Breach', code: 'CAT-SB', status: 'active' },
      ],
      severities: [
        { id: 1, name: 'Critical', code: 'SEV-1', status: 'active' },
      ],
      statuses: [
        { id: 1, name: 'Submitted', code: 'ST-SUB', status: 'active' },
      ],
      leas: [
        { id: 1, name: 'PDRM - Commercial Crime', code: 'LEA-PDRM-CC', status: 'active' },
      ],
      orgTypes: [
        { id: 1, name: 'Public Utility (Licensee)', code: 'ORG-PUB', status: 'active' },
      ],
    },
    'case-officer': {
      categories: [
        { id: 1, name: 'Dangerous Goods', code: 'CAT-DG', status: 'active' },
        { id: 2, name: 'Security Breach', code: 'CAT-SB', status: 'active' },
        { id: 3, name: 'Theft/Loss', code: 'CAT-TL', status: 'active' },
        { id: 4, name: 'Fraud/Tampering', code: 'CAT-FT', status: 'active' },
      ],
      severities: [
        { id: 1, name: 'Critical', code: 'SEV-1', status: 'active' },
        { id: 2, name: 'High', code: 'SEV-2', status: 'active' },
        { id: 3, name: 'Medium', code: 'SEV-3', status: 'active' },
      ],
      statuses: [
        { id: 1, name: 'Submitted', code: 'ST-SUB', status: 'active' },
        { id: 2, name: 'Under Review', code: 'ST-REV', status: 'active' },
        { id: 3, name: 'Escalated', code: 'ST-ESC', status: 'active' },
      ],
      leas: [
        { id: 1, name: 'PDRM - Commercial Crime', code: 'LEA-PDRM-CC', status: 'active' },
        { id: 2, name: 'PDRM - Cyber Crime', code: 'LEA-PDRM-CY', status: 'active' },
      ],
      orgTypes: [
        { id: 1, name: 'Public Utility (Licensee)', code: 'ORG-PUB', status: 'active' },
        { id: 2, name: 'Private Courier (Licensee)', code: 'ORG-PRI', status: 'active' },
      ],
    },
    'supervisor': {
      categories: [
        { id: 1, name: 'Dangerous Goods', code: 'CAT-DG', status: 'active' },
        { id: 2, name: 'Security Breach', code: 'CAT-SB', status: 'active' },
        { id: 3, name: 'Theft/Loss', code: 'CAT-TL', status: 'active' },
        { id: 4, name: 'Fraud/Tampering', code: 'CAT-FT', status: 'active' },
        { id: 5, name: 'Technical Failure', code: 'CAT-TF', status: 'inactive' },
      ],
      severities: [
        { id: 1, name: 'Critical', code: 'SEV-1', status: 'active' },
        { id: 2, name: 'High', code: 'SEV-2', status: 'active' },
        { id: 3, name: 'Medium', code: 'SEV-3', status: 'active' },
        { id: 4, name: 'Low', code: 'SEV-4', status: 'active' },
      ],
      statuses: [
        { id: 1, name: 'Submitted', code: 'ST-SUB', status: 'active' },
        { id: 2, name: 'Under Review', code: 'ST-REV', status: 'active' },
        { id: 3, name: 'Escalated', code: 'ST-ESC', status: 'active' },
        { id: 4, name: 'Closed', code: 'ST-CLS', status: 'active' },
      ],
      leas: [
        { id: 1, name: 'PDRM - Commercial Crime', code: 'LEA-PDRM-CC', status: 'active' },
        { id: 2, name: 'PDRM - Cyber Crime', code: 'LEA-PDRM-CY', status: 'active' },
        { id: 3, name: 'NACSA', code: 'LEA-NACSA', status: 'active' },
      ],
      orgTypes: [
        { id: 1, name: 'Public Utility (Licensee)', code: 'ORG-PUB', status: 'active' },
        { id: 2, name: 'Private Courier (Licensee)', code: 'ORG-PRI', status: 'active' },
        { id: 3, name: 'Government Agency', code: 'ORG-GOV', status: 'active' },
      ],
    },
    'lea-agency': {
      categories: [
        { id: 1, name: 'Dangerous Goods', code: 'CAT-DG', status: 'active' },
        { id: 2, name: 'Security Breach', code: 'CAT-SB', status: 'active' },
        { id: 3, name: 'Theft/Loss', code: 'CAT-TL', status: 'active' },
      ],
      severities: [
        { id: 1, name: 'Critical', code: 'SEV-1', status: 'active' },
        { id: 2, name: 'High', code: 'SEV-2', status: 'active' },
      ],
      statuses: [
        { id: 1, name: 'Escalated', code: 'ST-ESC', status: 'active' },
        { id: 2, name: 'Closed', code: 'ST-CLS', status: 'active' },
      ],
      leas: [
        { id: 1, name: 'PDRM - Commercial Crime', code: 'LEA-PDRM-CC', status: 'active' },
      ],
      orgTypes: [
        { id: 1, name: 'Public Utility (Licensee)', code: 'ORG-PUB', status: 'active' },
        { id: 2, name: 'Private Courier (Licensee)', code: 'ORG-PRI', status: 'active' },
      ],
    },
    'super-admin': {
      categories: [
        { id: 1, name: 'Dangerous Goods', code: 'CAT-DG', status: 'active' },
        { id: 2, name: 'Security Breach', code: 'CAT-SB', status: 'active' },
        { id: 3, name: 'Theft/Loss', code: 'CAT-TL', status: 'active' },
        { id: 4, name: 'Fraud/Tampering', code: 'CAT-FT', status: 'active' },
        { id: 5, name: 'Technical Failure', code: 'CAT-TF', status: 'inactive' },
      ],
      severities: [
        { id: 1, name: 'Critical', code: 'SEV-1', status: 'active' },
        { id: 2, name: 'High', code: 'SEV-2', status: 'active' },
        { id: 3, name: 'Medium', code: 'SEV-3', status: 'active' },
        { id: 4, name: 'Low', code: 'SEV-4', status: 'active' },
      ],
      statuses: [
        { id: 1, name: 'Submitted', code: 'ST-SUB', status: 'active' },
        { id: 2, name: 'Under Review', code: 'ST-REV', status: 'active' },
        { id: 3, name: 'Escalated', code: 'ST-ESC', status: 'active' },
        { id: 4, name: 'Closed', code: 'ST-CLS', status: 'active' },
      ],
      leas: [
        { id: 1, name: 'PDRM - Commercial Crime', code: 'LEA-PDRM-CC', status: 'active' },
        { id: 2, name: 'PDRM - Cyber Crime', code: 'LEA-PDRM-CY', status: 'active' },
        { id: 3, name: 'NACSA', code: 'LEA-NACSA', status: 'active' },
        { id: 4, name: 'BNM', code: 'LEA-BNM', status: 'active' },
      ],
      orgTypes: [
        { id: 1, name: 'Public Utility (Licensee)', code: 'ORG-PUB', status: 'active' },
        { id: 2, name: 'Private Courier (Licensee)', code: 'ORG-PRI', status: 'active' },
        { id: 3, name: 'Government Agency', code: 'ORG-GOV', status: 'active' },
        { id: 4, name: 'Special Purpose Vehicle', code: 'ORG-SPV', status: 'inactive' },
      ],
    },
  };

  const dataTypeConfig = {
    categories: { label: 'Incident Categories', icon: Layers, color: 'blue' },
    severities: { label: 'Severity Levels', icon: AlertTriangle, color: 'red' },
    statuses: { label: 'Status Values', icon: Activity, color: 'green' },
    leas: { label: 'LEA List', icon: Shield, color: 'purple' },
    orgTypes: { label: 'Organisation Types', icon: Building2, color: 'orange' },
  };

  const activeRoleData = masterDataByRole[activeUserRole as keyof typeof masterDataByRole];
  const currentData = activeRoleData[activeDataType as keyof typeof activeRoleData] || [];
  const activeUserRoleObj = userRoles.find(r => r.id === activeUserRole);

  const handleToggleStatus = (name: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'deactivated' : 'activated';
    toast.success(`${name} has been ${newStatus}.`);
  };

  const renderTable = (data: any[]) => (
    <Card className="border-border/40 overflow-hidden shadow-sm">
      <CardHeader className="bg-accent/30 flex flex-row items-center justify-between py-4 border-b">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search master data..." className="pl-10 h-8 text-sm" />
        </div>
        <Button size="sm">
          <Plus className="mr-2 h-3 w-3" /> Add Item
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Display Name</TableHead>
              <TableHead>System Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Governance Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No master data available for this role
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold">{item.name}</TableCell>
                  <TableCell className="font-mono text-[10px] tracking-widest uppercase">{item.code}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "border-none",
                      item.status === 'active' ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                    )}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <Edit2 className="h-3 w-3 mr-2" /> Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "h-8 text-xs",
                        item.status === 'active' ? "text-amber-500" : "text-green-500"
                      )}
                      onClick={() => handleToggleStatus(item.name, item.status)}
                    >
                      {item.status === 'active' ? (
                        <><XCircle className="h-3 w-3 mr-2" /> Deactivate</>
                      ) : (
                        <><CheckCircle2 className="h-3 w-3 mr-2" /> Activate</>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Master Data Management</h1>
          <p className="text-muted-foreground mt-1">Configure global classification entities by user role.</p>
        </div>
      </div>

      {/* Level 1: User Role Selection */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="bg-accent/30 border-b">
          <CardTitle className="text-base">Select User Role</CardTitle>
          <CardDescription>Choose a role to manage its associated master data</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeUserRole} onValueChange={setActiveUserRole} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full h-auto bg-muted/50 p-1">
              {userRoles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <TabsTrigger 
                    key={role.id}
                    value={role.id}
                    className="py-2.5 font-bold uppercase tracking-wider text-[9px] flex flex-col gap-1"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="leading-tight">{role.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Level 2: Master Data Type Selection */}
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="bg-accent/30 border-b">
          <CardTitle className="text-base flex items-center gap-2">
            {activeUserRoleObj && (() => {
              const IconComponent = activeUserRoleObj.icon;
              return <IconComponent className="h-5 w-5" />;
            })()}
            {activeUserRoleObj?.label} - Master Data Configuration
          </CardTitle>
          <CardDescription>
            Manage different master data types for {activeUserRoleObj?.label}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeDataType} onValueChange={setActiveDataType} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto bg-muted/50 p-1 mb-6">
              {Object.entries(dataTypeConfig).map(([key, config]: any) => {
                const IconComponent = config.icon;
                return (
                  <TabsTrigger key={key} value={key} className="py-2.5 font-bold uppercase tracking-wider text-[10px]">
                    <IconComponent className="h-4 w-4 mr-2" /> 
                    <span className="hidden sm:inline">{config.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-2">
              {renderTable(currentData)}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/40 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Role</p>
            <p className="text-xl font-bold">{activeUserRoleObj?.label}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Data Type</p>
            <p className="text-xl font-bold">
              {dataTypeConfig[activeDataType as keyof typeof dataTypeConfig]?.label}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Records</p>
            <p className="text-xl font-bold">{currentData.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active Records</p>
            <p className="text-xl font-bold text-green-600">
              {currentData.filter((item: any) => item.status === 'active').length}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center gap-4 bg-amber-500/5 p-4 rounded-lg border border-amber-500/20">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <div className="text-xs">
          <p className="font-bold text-amber-600 uppercase tracking-wider mb-1">Administrative Rules</p>
          <p className="text-muted-foreground leading-relaxed">
            Master Data deletion is strictly prohibited by system governance policies. You may only Activate or Deactivate items. Deactivated items will no longer appear in selection menus for other users but remain in historical records. Different user roles have access to different master data sets.
          </p>
        </div>
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

