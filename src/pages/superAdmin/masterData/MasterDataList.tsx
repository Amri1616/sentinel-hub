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
  Edit2,
  CheckCircle2,
  XCircle,
  Building2, 
  Shield,
  Layers,
  Activity,
  Search,
  MoreVertical,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  Hash,
  Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function MasterDataList() {
  const [activeTab, setActiveTab] = useState('licensee');
  
  // State for Licensee Tab
  const [licensees, setLicensees] = useState([
    { id: 1, code: 'L001', name: 'Ninja Van Malaysia', regNo: '201501012345', status: 'active' },
    { id: 2, code: 'L002', name: 'City-Link Express', regNo: '197901006543', status: 'active' },
    { id: 3, code: 'L003', name: 'GDEX Berhad', regNo: '200301013456', status: 'inactive' },
  ]);
  const [isLicenseeDialogOpen, setIsLicenseeDialogOpen] = useState(false);
  const [editingLicensee, setEditingLicensee] = useState<any>(null);
  const [newLicensee, setNewLicensee] = useState({ code: '', name: '', regNo: '' });

  // State for LEA Tab
  const [leas, setLeas] = useState([
    { id: 1, name: 'PDRM - Cyber Crime Unit', status: 'active' },
    { id: 2, name: 'MCMC - Enforcement Division', status: 'active' },
    { id: 3, name: 'NACSA', status: 'active' },
    { id: 4, name: 'Bank Negara Malaysia', status: 'active' },
  ]);
  const [isLeaDialogOpen, setIsLeaDialogOpen] = useState(false);
  const [editingLea, setEditingLea] = useState<any>(null);
  const [newLeaName, setNewLeaName] = useState('');

  // --- AMENDED: Incident Categories State ---
  const [incidentCategories, setIncidentCategories] = useState([
    { id: 1, name: 'Prohibited Postal Items', type: 'System' },
    { id: 2, name: 'Serious Threat', type: 'System' },
    { id: 3, name: 'Cyber Security Incidents', type: 'System' },
    { id: 4, name: 'Medium Severity Incident', type: 'System' },
    { id: 5, name: 'Operational Issues', type: 'System' },
  ]);

  const [incidentSubcategories, setIncidentSubcategories] = useState([
    // Prohibited Postal Items
    { id: 101, name: 'Gold bullion', categoryId: 1, type: 'System' },
    { id: 102, name: 'Currency', categoryId: 1, type: 'System' },
    { id: 103, name: 'Illegal drugs or narcotics', categoryId: 1, type: 'System' },
    { id: 104, name: 'Bearer negotiable instruments', categoryId: 1, type: 'System' },
    { id: 105, name: 'Wildlife or exotic animals', categoryId: 1, type: 'System' },
    { id: 106, name: 'Counterfeit or pirated goods', categoryId: 1, type: 'System' },
    { id: 107, name: 'Dangerous, toxic, or flammable materials', categoryId: 1, type: 'System' },
    { id: 108, name: 'Firearms, weapons, ammunition (including replicas)', categoryId: 1, type: 'System' },
    { id: 109, name: 'Pornographic materials', categoryId: 1, type: 'System' },
    { id: 110, name: 'Items prohibited under Federal, State, or local laws', categoryId: 1, type: 'System' },
    { id: 111, name: 'Other', categoryId: 1, type: 'System' },
    
    // Serious Threat
    { id: 201, name: 'Explosives, biological or chemical threats', categoryId: 2, type: 'System' },
    { id: 202, name: 'Criminal activities within postal hubs', categoryId: 2, type: 'System' },
    { id: 203, name: 'Significant disruption to postal operations', categoryId: 2, type: 'System' },
    { id: 204, name: 'Sabotage or large-scale infrastructure damage', categoryId: 2, type: 'System' },
    { id: 205, name: 'Gas leaks, fires, or major accidents', categoryId: 2, type: 'System' },
    { id: 206, name: 'Other', categoryId: 2, type: 'System' },

    // Cyber Security Incidents
    { id: 301, name: 'Denial-of-Service (DoS) / Distributed Denial-of-Service (DDoS)', categoryId: 3, type: 'System' },
    { id: 302, name: 'Intrusion', categoryId: 3, type: 'System' },
    { id: 303, name: 'Intrusion Attempt', categoryId: 3, type: 'System' },
    { id: 304, name: 'Malware', categoryId: 3, type: 'System' },
    { id: 305, name: 'Malware Hosting', categoryId: 3, type: 'System' },
    { id: 306, name: 'Social Engineering / Fraud', categoryId: 3, type: 'System' },
    { id: 307, name: 'Data-Related Incidents', categoryId: 3, type: 'System' },
    { id: 308, name: 'Potential Attack', categoryId: 3, type: 'System' },
    { id: 309, name: 'Defacement', categoryId: 3, type: 'System' },
    { id: 310, name: 'Other', categoryId: 3, type: 'System' },

    // Medium Severity Incident
    { id: 401, name: 'Scam or fraud cases', categoryId: 4, type: 'System' },
    { id: 402, name: 'Mail tampering', categoryId: 4, type: 'System' },
    { id: 403, name: 'Floods or natural disasters', categoryId: 4, type: 'System' },
    { id: 404, name: 'Non-compliance with postal procedures', categoryId: 4, type: 'System' },
    { id: 405, name: 'Theft or loss of postal items', categoryId: 4, type: 'System' },
    { id: 406, name: 'System outage', categoryId: 4, type: 'System' },
    { id: 407, name: 'Suspicious package (false alarm)', categoryId: 4, type: 'System' },
    { id: 408, name: 'Limited impact data access incidents', categoryId: 4, type: 'System' },
    { id: 409, name: 'Other', categoryId: 4, type: 'System' },

    // Operational Issues
    { id: 501, name: 'Customs hold', categoryId: 5, type: 'System' },
    { id: 502, name: 'Documentation errors', categoryId: 5, type: 'System' },
    { id: 503, name: 'Customer complaints (non-security)', categoryId: 5, type: 'System' },
    { id: 504, name: 'Minor system/process issues', categoryId: 5, type: 'System' },
    { id: 505, name: 'Minor delivery delays', categoryId: 5, type: 'System' },
    { id: 506, name: 'Procedural lapses', categoryId: 5, type: 'System' },
    { id: 507, name: 'Administrative issues', categoryId: 5, type: 'System' },
    { id: 508, name: 'Other', categoryId: 5, type: 'System' },
  ]);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubcategoryDialogOpen, setIsSubcategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategory, setNewSubcategory] = useState({ name: '', categoryId: '' });

  // Investigation Statuses (Case Update Tab)
  const [investigationStatuses, setInvestigationStatuses] = useState([
    { id: 1, name: 'Under Preliminary Review', type: 'System' },
    { id: 2, name: 'Under Investigation', type: 'System' },
    { id: 3, name: 'Referred to Relevant Agency', type: 'System' },
    { id: 4, name: 'Prosecution / Trial', type: 'System' },
    { id: 5, name: 'Investigation Completed', type: 'System' },
    { id: 6, name: 'Case Closed', type: 'System' },
  ]);

  const [isInvestigationDialogOpen, setIsInvestigationDialogOpen] = useState(false);
  const [newInvestigationStatusName, setNewInvestigationStatusName] = useState('');



  // Handlers for Licensee
  const handleAddLicensee = () => {
    if (!newLicensee.code || !newLicensee.name || !newLicensee.regNo) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (licensees.find(l => l.code === newLicensee.code)) {
      toast.error("Company Code must be unique.");
      return;
    }
    setLicensees([...licensees, { ...newLicensee, id: Date.now(), status: 'active' }]);
    setIsLicenseeDialogOpen(false);
    setNewLicensee({ code: '', name: '', regNo: '' });
    toast.success("Licensee added successfully.");
  };

  const handleEditLicensee = () => {
    setLicensees(licensees.map(l => l.id === editingLicensee.id ? editingLicensee : l));
    setIsLicenseeDialogOpen(false);
    setEditingLicensee(null);
    toast.success("Licensee updated successfully.");
  };

  const toggleLicenseeStatus = (id: number) => {
    setLicensees(licensees.map(l => l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l));
    toast.success("Status updated.");
  };

  // Handlers for LEA
  const handleAddLea = () => {
    if (!newLeaName) return;
    setLeas([...leas, { id: Date.now(), name: newLeaName, status: 'active' }]);
    setIsLeaDialogOpen(false);
    setNewLeaName('');
    toast.success("LEA added successfully.");
  };

  const handleEditLea = () => {
    setLeas(leas.map(l => l.id === editingLea.id ? editingLea : l));
    setIsLeaDialogOpen(false);
    setEditingLea(null);
    toast.success("LEA updated successfully.");
  };

  const toggleLeaStatus = (id: number) => {
    setLeas(leas.map(l => l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l));
    toast.success("Status updated.");
  };

  // --- AMENDED: Handlers for Categories ---
  const handleAddCategory = () => {
    if (!newCategoryName) return;
    setIncidentCategories([...incidentCategories, { id: Date.now(), name: newCategoryName, type: 'Custom' }]);
    setIsCategoryDialogOpen(false);
    setNewCategoryName('');
    toast.success("Category added successfully.");
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory.name || !newSubcategory.categoryId) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIncidentSubcategories([...incidentSubcategories, { 
      id: Date.now(), 
      name: newSubcategory.name, 
      categoryId: parseInt(newSubcategory.categoryId), 
      type: 'Custom' 
    }]);
    setIsSubcategoryDialogOpen(false);
    setNewSubcategory({ name: '', categoryId: '' });
    toast.success("Subcategory added successfully.");
  };

  const handleAddInvestigationStatus = () => {
    if (!newInvestigationStatusName) return;
    setInvestigationStatuses([...investigationStatuses, { 
      id: Date.now(), 
      name: newInvestigationStatusName, 
      type: 'Custom' 
    }]);
    setIsInvestigationDialogOpen(false);
    setNewInvestigationStatusName('');
    toast.success("Investigation status added successfully.");
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Master Data Management</h1>
          <p className="text-muted-foreground mt-1">Configure global platform entities and governance classifications.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-100 p-1 h-12 w-full lg:w-auto grid grid-cols-2 md:grid-cols-4 gap-1">
          <TabsTrigger value="licensee" className="font-bold uppercase tracking-widest text-[10px] py-2 px-6">
            <Building2 className="h-4 w-4 mr-2" /> Licensee
          </TabsTrigger>
          <TabsTrigger value="lea" className="font-bold uppercase tracking-widest text-[10px] py-2 px-6">
            <Shield className="h-4 w-4 mr-2" /> LEA
          </TabsTrigger>
          <TabsTrigger value="categories" className="font-bold uppercase tracking-widest text-[10px] py-2 px-6">
            <Layers className="h-4 w-4 mr-2" /> Incident Categories
          </TabsTrigger>
          <TabsTrigger value="case-update" className="font-bold uppercase tracking-widest text-[10px] py-2 px-6">
            <Activity className="h-4 w-4 mr-2" /> Case Update
          </TabsTrigger>
        </TabsList>

        {/* Licensee Tab */}
        <TabsContent value="licensee">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Licensee Management</CardTitle>
                <CardDescription className="text-[10px]">Manage registered licensee organizations and their status.</CardDescription>
              </div>
              <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={() => { setEditingLicensee(null); setIsLicenseeDialogOpen(true); }}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Licensee
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Company Code</TableHead>
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Organization Name</TableHead>
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Registration No</TableHead>
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Status</TableHead>
                    <TableHead className="text-right font-bold uppercase tracking-tighter text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licensees.map((l) => (
                    <TableRow key={l.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-mono text-[10px] font-bold text-blue-600">{l.code}</TableCell>
                      <TableCell className="font-semibold text-slate-800">{l.name}</TableCell>
                      <TableCell className="text-slate-500">{l.regNo}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest h-5",
                          l.status === 'active' ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-50 text-slate-500"
                        )}>
                          {l.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => { setEditingLicensee(l); setIsLicenseeDialogOpen(true); }}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className={cn(
                          "h-8 w-8",
                          l.status === 'active' ? "text-amber-500" : "text-green-500"
                        )} onClick={() => toggleLicenseeStatus(l.id)}>
                          {l.status === 'active' ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LEA Tab */}
        <TabsContent value="lea">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">LEA Management</CardTitle>
                <CardDescription className="text-[10px]">Manage Law Enforcement Agencies authorized to access the platform.</CardDescription>
              </div>
              <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={() => { setEditingLea(null); setIsLeaDialogOpen(true); }}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add LEA
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">LEA Name</TableHead>
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Status</TableHead>
                    <TableHead className="text-right font-bold uppercase tracking-tighter text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leas.map((l) => (
                    <TableRow key={l.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-semibold text-slate-800">{l.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest h-5",
                          l.status === 'active' ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-50 text-slate-500"
                        )}>
                          {l.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => { setEditingLea(l); setIsLeaDialogOpen(true); }}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className={cn(
                          "h-8 w-8",
                          l.status === 'active' ? "text-amber-500" : "text-green-500"
                        )} onClick={() => toggleLeaStatus(l.id)}>
                          {l.status === 'active' ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- AMENDED: Incident Categories Tab (Split Panel) --- */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Category Panel */}
            <Card className="lg:col-span-2 border-border/40 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest">Category List</CardTitle>
                </div>
                <Button size="sm" className="h-8 bg-blue-600" onClick={() => setIsCategoryDialogOpen(true)}>
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Category Name</TableHead>
                      <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidentCategories.map((cat) => (
                      <TableRow key={cat.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-bold text-slate-800 text-xs">{cat.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "text-[8px] font-bold uppercase tracking-widest",
                            cat.type === 'System' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                            {cat.type}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Subcategory Panel */}
            <Card className="lg:col-span-3 border-border/40 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest">Subcategory List</CardTitle>
                </div>
                <Button size="sm" className="h-8 bg-blue-600" onClick={() => setIsSubcategoryDialogOpen(true)}>
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Subcategory Name</TableHead>
                      <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Category</TableHead>
                      <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidentSubcategories.map((sub) => (
                      <TableRow key={sub.id} className="hover:bg-slate-50/50">
                        <TableCell className="text-xs font-semibold text-slate-700">{sub.name}</TableCell>
                        <TableCell className="text-[10px] font-bold text-blue-600 uppercase">
                          {incidentCategories.find(c => c.id === sub.categoryId)?.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "text-[8px] font-bold uppercase tracking-widest",
                            sub.type === 'System' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                            {sub.type}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg mt-6">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-800 leading-relaxed font-medium">
              <strong>Governance Rule:</strong> Existing categories and subcategories marked as <span className="font-bold">System</span> are immutable and cannot be edited, disabled, or deleted. Custom entries may be added but follow the same persistence rules once established in the master data.
            </div>
          </div>
        </TabsContent>

        {/* Case Update Tab */}
        <TabsContent value="case-update">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800">Investigation Status Management</CardTitle>
                <CardDescription className="text-[10px]">Manage investigation statuses used by LEA during case updates.</CardDescription>
              </div>
              <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={() => setIsInvestigationDialogOpen(true)}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Investigation Status
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Investigation Status Name</TableHead>
                    <TableHead className="font-bold uppercase tracking-tighter text-[10px]">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investigationStatuses.map((s) => (
                    <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-semibold text-slate-800">{s.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "text-[9px] font-bold uppercase tracking-widest h-5",
                          s.type === 'System' ? "border-blue-200 bg-blue-50 text-blue-700" : "border-amber-200 bg-amber-50 text-amber-700"
                        )}>
                          {s.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg mt-6">
            <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-[11px] text-blue-800 leading-relaxed font-medium">
              <strong>Workflow Behavior:</strong> Newly added investigation statuses will be available for LEA users to select during case updates. These statuses are for internal agency tracking and do not affect the core platform system workflow.
            </div>
          </div>
        </TabsContent>


      </Tabs>

      {/* Licensee Dialog */}
      <Dialog open={isLicenseeDialogOpen} onOpenChange={setIsLicenseeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              {editingLicensee ? 'Edit Licensee' : 'Add New Licensee'}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Fill in the details below. Company Code cannot be edited after creation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Company Code</Label>
              <Input 
                value={editingLicensee ? editingLicensee.code : newLicensee.code}
                onChange={(e) => editingLicensee ? setEditingLicensee({...editingLicensee, code: e.target.value}) : setNewLicensee({...newLicensee, code: e.target.value})}
                disabled={!!editingLicensee}
                placeholder="e.g. L001"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Organization Name</Label>
              <Input 
                value={editingLicensee ? editingLicensee.name : newLicensee.name}
                onChange={(e) => editingLicensee ? setEditingLicensee({...editingLicensee, name: e.target.value}) : setNewLicensee({...newLicensee, name: e.target.value})}
                placeholder="e.g. Company Name Sdn Bhd"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Registration Number (SSM)</Label>
              <Input 
                value={editingLicensee ? editingLicensee.regNo : newLicensee.regNo}
                onChange={(e) => editingLicensee ? setEditingLicensee({...editingLicensee, regNo: e.target.value}) : setNewLicensee({...newLicensee, regNo: e.target.value})}
                placeholder="e.g. 201501012345"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsLicenseeDialogOpen(false)}>Cancel</Button>
            <Button onClick={editingLicensee ? handleEditLicensee : handleAddLicensee}>
              {editingLicensee ? 'Save Changes' : 'Create Licensee'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* LEA Dialog */}
      <Dialog open={isLeaDialogOpen} onOpenChange={setIsLeaDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              {editingLea ? 'Edit Law Enforcement Agency' : 'Add New Agency'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Agency Name</Label>
              <Input 
                value={editingLea ? editingLea.name : newLeaName}
                onChange={(e) => editingLea ? setEditingLea({...editingLea, name: e.target.value}) : setNewLeaName(e.target.value)}
                placeholder="e.g. PDRM - Cyber Crime"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsLeaDialogOpen(false)}>Cancel</Button>
            <Button onClick={editingLea ? handleEditLea : handleAddLea}>
              {editingLea ? 'Save Changes' : 'Create Agency'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- AMENDED: Category Dialog --- */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-600" />
              Add New Category
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Category Name</Label>
              <Input 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. New Incident Group"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCategory}>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- AMENDED: Subcategory Dialog --- */}
      <Dialog open={isSubcategoryDialogOpen} onOpenChange={setIsSubcategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-600" />
              Add New Subcategory
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Category</Label>
              <Select 
                value={newSubcategory.categoryId} 
                onValueChange={(val) => setNewSubcategory({...newSubcategory, categoryId: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  {incidentCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Subcategory Name</Label>
              <Input 
                value={newSubcategory.name}
                onChange={(e) => setNewSubcategory({...newSubcategory, name: e.target.value})}
                placeholder="e.g. Specific incident type"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsSubcategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSubcategory}>Create Subcategory</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Case Update Dialog */}
      <Dialog open={isInvestigationDialogOpen} onOpenChange={setIsInvestigationDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Add New Investigation Status
            </DialogTitle>
            <DialogDescription className="text-xs">
              This status will be available for LEA users to select during case updates.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Investigation Status Name</Label>
              <Input 
                value={newInvestigationStatusName}
                onChange={(e) => setNewInvestigationStatusName(e.target.value)}
                placeholder="e.g. Investigation Suspended"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsInvestigationDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddInvestigationStatus}>Create Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
