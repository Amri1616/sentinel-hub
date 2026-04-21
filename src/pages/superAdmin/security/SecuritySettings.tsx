import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Lock, 
  UserCog, 
  Key, 
  AlertTriangle, 
  Smartphone,
  Save,
  RotateCcw,
  Clock,
  Eye,
  EyeOff,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SecuritySettings() {
  const { toast } = useToast();
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Security configuration has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security & Access Policy</h1>
        <p className="text-muted-foreground mt-1">Platform-wide authentication, authorization, and encryption settings.</p>
      </div>

      <Tabs defaultValue="authentication" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full h-auto mb-6 bg-muted/50 p-1">
          <TabsTrigger value="authentication" className="py-2.5">
            <Lock className="h-4 w-4 mr-2" />
            Authentication
          </TabsTrigger>
          <TabsTrigger value="password" className="py-2.5">
            <Key className="h-4 w-4 mr-2" />
            Password Policy
          </TabsTrigger>
          <TabsTrigger value="session" className="py-2.5">
            <Clock className="h-4 w-4 mr-2" />
            Session Control
          </TabsTrigger>
          <TabsTrigger value="audit" className="py-2.5">
            <Shield className="h-4 w-4 mr-2" />
            Security Audit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  Multi-Factor Authentication (MFA)
                </CardTitle>
                <CardDescription>Configure platform-wide MFA requirements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Enforce MFA for all users</Label>
                    <p className="text-xs text-muted-foreground">Require code from authenticator app for every login.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Allow SMS MFA (Less Secure)</Label>
                    <p className="text-xs text-muted-foreground">Enable phone-based OTP as a secondary option.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Trust device period</Label>
                    <p className="text-xs text-muted-foreground">Days before requiring MFA again on the same device.</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Always</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UserCog className="h-4 w-4 text-primary" />
                  Account Security
                </CardTitle>
                <CardDescription>Lockout and security monitoring settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue={5} className="max-w-[120px]" />
                  <p className="text-[11px] text-muted-foreground italic">Account will be locked after this many failed attempts.</p>
                </div>
                <div className="space-y-2">
                  <Label>Account Lock Duration (Minutes)</Label>
                  <Input type="number" defaultValue={30} className="max-w-[120px]" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Detect Brute Force</Label>
                    <p className="text-xs text-muted-foreground">Automatically block IPs with multiple failed attempts.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <Card className="border-border/40 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base">Complexity & Rotation Policy</CardTitle>
              <CardDescription>Define how users create and manage their passwords.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Minimum Length</Label>
                  <Input type="number" defaultValue={12} />
                </div>
                <div className="space-y-2">
                  <Label>Force Rotation (Days)</Label>
                  <Input type="number" defaultValue={90} />
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Require Special Characters (!@#$%^&*)</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Require Uppercase & Lowercase</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Require Numbers (0-9)</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Prevent Reuse of Last X Passwords</Label>
                  <Input type="number" defaultValue={5} className="w-[100px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session">
          <Card className="border-border/40 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base">Platform Availability & Time-outs</CardTitle>
              <CardDescription>Manage how long users can stay logged in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Inactivity Timeout (Minutes)</Label>
                <Input type="number" defaultValue={15} className="max-w-[200px]" />
                <p className="text-xs text-muted-foreground">User will be logged out after this period of inactivity.</p>
              </div>
              <div className="space-y-2">
                <Label>Absolute Session Limit (Hours)</Label>
                <Input type="number" defaultValue={12} className="max-w-[200px]" />
                <p className="text-xs text-muted-foreground">User must log in again regardless of activity after this period.</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Global Maintenance Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">Log out all users and prevent new logins during system work.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="text-base">Audit Retention & Verbosity</CardTitle>
              <CardDescription>Configure how security events are logged and stored.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Log Retention Period (Days)</Label>
                <Input type="number" defaultValue={365} className="max-w-[200px]" />
                <p className="text-xs text-muted-foreground">Logs older than this will be archived to cold storage.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Log Login/Logout Success</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Log Export Actions</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Log Page Views (High Verbosity)</Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end gap-3 pt-6 border-t">
        <Button variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Factory Defaults
        </Button>
        <Button onClick={handleSave} className="px-8 shadow-lg shadow-primary/20">
          <Save className="mr-2 h-4 w-4" />
          Save Security Policy
        </Button>
      </div>
    </div>
  );
}
