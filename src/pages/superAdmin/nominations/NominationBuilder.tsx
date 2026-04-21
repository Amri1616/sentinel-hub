import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Settings2, 
  Eye, 
  Save, 
  ChevronDown,
  Type,
  Mail,
  Phone,
  List,
  CheckSquare,
  Radio,
  Upload,
  AlignLeft,
  ArrowLeft
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

type FieldType = 'text' | 'email' | 'phone' | 'dropdown' | 'radio' | 'checkbox' | 'file' | 'textarea';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder: string;
  helpText: string;
  options?: string[];
}

export default function NominationBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formTitle, setFormTitle] = useState('Licensee Admin Nomination Form');
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter primary contact name', helpText: '' },
    { id: '2', type: 'email', label: 'Work Email', required: true, placeholder: 'official@company.com', helpText: 'Activation link will be sent here' },
    { id: '3', type: 'dropdown', label: 'Organisation Type', required: true, placeholder: 'Select type', helpText: '', options: ['Public Utility', 'Private Courier', 'International'] },
  ]);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      placeholder: '',
      helpText: '',
      options: type === 'dropdown' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleSave = () => {
    toast({
      title: "Template Saved",
      description: "Nomination form template has been updated successfully.",
    });
    navigate('/super-admin/nominations');
  };

  const getFieldIcon = (type: FieldType) => {
    switch (type) {
      case 'text': return <Type className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'dropdown': return <List className="h-4 w-4" />;
      case 'checkbox': return <CheckSquare className="h-4 w-4" />;
      case 'radio': return <Radio className="h-4 w-4" />;
      case 'file': return <Upload className="h-4 w-4" />;
      case 'textarea': return <AlignLeft className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/nominations')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Nomination Form Builder</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">v2.4 Draft</Badge>
              <p className="text-muted-foreground text-sm">Design dynamic onboarding forms for new licensee administrators.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Form
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save as Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Toolbox */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Form Elements</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 gap-2">
              <Button variant="ghost" className="justify-start text-xs h-9" onClick={() => addField('text')}>
                <Type className="mr-2 h-4 w-4 text-blue-500" /> Short Text
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-9" onClick={() => addField('textarea')}>
                <AlignLeft className="mr-2 h-4 w-4 text-indigo-500" /> Long Text
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-9" onClick={() => addField('email')}>
                <Mail className="mr-2 h-4 w-4 text-amber-500" /> Email
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-9" onClick={() => addField('dropdown')}>
                <List className="mr-2 h-4 w-4 text-emerald-500" /> Dropdown
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-9" onClick={() => addField('file')}>
                <Upload className="mr-2 h-4 w-4 text-purple-500" /> File Upload
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-9" onClick={() => addField('checkbox')}>
                <CheckSquare className="mr-2 h-4 w-4 text-rose-500" /> Multi-select
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-primary">Global Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Form Title</Label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="bg-background" />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Enable Auto-Save</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Require MFA Link</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Builder Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-accent/30 rounded-lg p-6 min-h-[600px] border-2 border-dashed border-border/60">
            <div className="mb-8 text-center border-b border-border/40 pb-6 max-w-2xl mx-auto">
              <Input 
                value={formTitle} 
                onChange={(e) => setFormTitle(e.target.value)} 
                className="text-2xl font-bold bg-transparent border-none text-center focus-visible:ring-0 h-auto p-0"
              />
              <p className="text-muted-foreground text-sm mt-2">Please complete the information below to proceed with your licensee administrator nomination.</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {fields.map((field, index) => (
                <Card key={field.id} className="group relative overflow-visible border-border/40 hover:border-primary/40 transition-all shadow-none">
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-1 flex items-center justify-center pt-2">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                          {getFieldIcon(field.type)}
                        </div>
                      </div>
                      
                      <div className="md:col-span-8 space-y-3">
                        <Input 
                          value={field.label} 
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          className="font-semibold text-sm border-none bg-transparent hover:bg-accent/40 p-0 h-auto focus-visible:ring-0"
                        />
                        <div className="relative">
                          {field.type === 'dropdown' ? (
                            <div className="border rounded-md px-3 py-2 text-sm text-muted-foreground bg-accent/20 flex justify-between items-center italic">
                              Options established in dropdown list...
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          ) : (
                            <Input 
                              placeholder={field.placeholder || "Standard input field"} 
                              className="text-sm bg-muted/30 border-dashed italic pointer-events-none"
                              disabled
                            />
                          )}
                        </div>
                        <Input 
                          placeholder="Add helper or instruction text here..." 
                          value={field.helpText}
                          onChange={(e) => updateField(field.id, { helpText: e.target.value })}
                          className="text-[11px] h-6 border-none bg-transparent p-0 text-muted-foreground focus-visible:ring-0 italic"
                        />
                      </div>

                      <div className="md:col-span-3 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 px-2 py-1 rounded bg-muted/40">
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Required</span>
                          <Switch 
                            checked={field.required} 
                            onCheckedChange={(val) => updateField(field.id, { required: val })}
                            className="scale-75"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeField(field.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-border/40 h-16 rounded-xl hover:bg-accent/50 hover:border-primary/20 group transition-all"
                onClick={() => addField('text')}
              >
                <Plus className="mr-2 h-5 w-5 text-muted-foreground group-hover:text-primary" />
                <span className="text-muted-foreground group-hover:text-foreground font-medium">Add New Field to Form</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
