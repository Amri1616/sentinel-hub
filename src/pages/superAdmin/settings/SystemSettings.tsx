import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, 
  Mail, 
  Globe, 
  Database, 
  Cloud,
  Save,
  RotateCcw,
  Zap,
  Layout,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";

export default function SystemSettings() {
  const { toast } = useToast();
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  const handleSave = () => {
    toast({
      title: "System Updated",
      description: "Platform configuration has been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure technical integrations, environment variables, and platform visibility.</p>
      </div>

      <Tabs defaultValue="smtp" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full h-auto mb-6 bg-muted/50 p-1">
          <TabsTrigger value="smtp" className="py-2.5">
            <Mail className="h-4 w-4 mr-2" />
            SMTP & Email
          </TabsTrigger>
          <TabsTrigger value="sso" className="py-2.5">
            <Zap className="h-4 w-4 mr-2" />
            SSO / Active Directory
          </TabsTrigger>
          <TabsTrigger value="appearance" className="py-2.5">
            <Layout className="h-4 w-4 mr-2" />
            Platform Customization
          </TabsTrigger>
          <TabsTrigger value="advanced" className="py-2.5">
            <Server className="h-4 w-4 mr-2" />
            Advanced Technical
          </TabsTrigger>
        </TabsList>

        <TabsContent value="smtp">
          <Card className="border-border/40 max-w-3xl">
            <CardHeader className="border-b bg-accent/20">
              <CardTitle className="text-base">SMTP Server Configuration</CardTitle>
              <CardDescription>Platform uses these settings to send notifications, nomination links, and alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>host</Label>
                  <Input defaultValue="smtp.mcmc.gov.my" />
                </div>
                <div className="space-y-2">
                  <Label>Port</Label>
                  <Input type="number" defaultValue={587} />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input defaultValue="notifications@psirp.mcmc.gov.my" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input type={showSmtpPass ? "text" : "password"} defaultValue="********" />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full" 
                      onClick={() => setShowSmtpPass(!showSmtpPass)}
                    >
                      {showSmtpPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Enable TLS Encryption</Label>
                  <p className="text-xs text-muted-foreground">Secure connection to the SMTP server is required.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="secondary" size="sm">
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sso">
          <Card className="border-border/40 max-w-3xl">
            <CardHeader className="border-b bg-accent/20">
              <CardTitle className="text-base">Single Sign-On (SSO) Integration</CardTitle>
              <CardDescription>Configure Microsoft Azure AD or internal MCMC portal integration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Enable SSO Authentication</Label>
                  <p className="text-xs text-muted-foreground">Allow users to log in with their government email account.</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2 opacity-50">
                <Label>Client ID</Label>
                <Input placeholder="Enter Azure Client ID" disabled />
              </div>
              <div className="space-y-2 opacity-50">
                <Label>Tenant ID</Label>
                <Input placeholder="Enter Azure Tenant ID" disabled />
              </div>
              <div className="p-4 bg-muted rounded-lg border flex items-start gap-4">
                <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Redirect URI: <span className="font-mono bg-background px-1 rounded">https://psirp.mcmc.gov.my/api/auth/callback</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-border/40 max-w-3xl">
            <CardHeader className="border-b bg-accent/20">
              <CardTitle className="text-base">Platform Visibility & Customization</CardTitle>
              <CardDescription>Control the user interface and system-wide messaging.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="PSIRP - Postal Security Incident Reporting Platform" />
              </div>
              <div className="space-y-2">
                <Label>Maintenance Banner Message</Label>
                <Textarea 
                  placeholder="E.g. System will be down for maintenance on Saturday..." 
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Show Banner to All Users</Label>
                  <p className="text-xs text-muted-foreground">Toggle global announcement visibility.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Discard Changes
        </Button>
        <Button onClick={handleSave} className="px-8 shadow-lg shadow-primary/20">
          <Save className="mr-2 h-4 w-4" />
          Save Platform Config
        </Button>
      </div>
    </div>
  );
}
