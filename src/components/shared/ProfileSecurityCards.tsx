import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PasswordInput } from '@/components/shared/PasswordInput';
import { Key, User, Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
    usePasswordStrength,
    PasswordStrengthBar,
    PasswordRequirementChecklist,
    PasswordStrengthAnnouncer,
} from '@/components/shared/PasswordStrengthValidator';

/* ── Profile mock data per role ── */

export interface ProfileData {
    name: string;
    mykadNo: string;
    designation: string;
    department: string;
    email: string;
    phone: string;
}

export const roleProfiles: Record<string, ProfileData> = {
    reporter: {
        name: 'Mastura Salleh',
        mykadNo: '890312-14-5577',
        designation: 'Compliance Officer',
        department: 'Regulatory Affairs',
        email: 'ahmad.faizal@globalexpress.com.my',
        phone: '+60 12-345 6789',
    },
    reviewer: {
        name: 'Mohd Kamal',
        mykadNo: '850715-10-6234',
        designation: 'Case Officer',
        department: 'MCMC — Postal Security Division',
        email: 'mohd.kamal@mcmc.gov.my',
        phone: '+60 13-456 7890',
    },
    licenseeAdmin: {
        name: 'Tan Wei Ming',
        mykadNo: '880220-08-4321',
        designation: 'Licensee Administrator',
        department: 'Global Express Logistics Sdn Bhd — IT Admin',
        email: 'weiming.tan@globalexpress.com.my',
        phone: '+60 11-234 5678',
    },
    validator: {
        name: 'Sarah Lim',
        mykadNo: '780523-01-8899',
        designation: 'Senior Supervisor',
        department: 'MCMC — Governance & Compliance',
        email: 'sarah.lim@mcmc.gov.my',
        phone: '+60 19-876 5432',
    },
    investigator: {
        name: 'Nurul Huda',
        mykadNo: '820916-07-3345',
        designation: 'MCMC Internal Investigator',
        department: 'MCMC — Investigation Unit',
        email: 'nurul.huda@mcmc.gov.my',
        phone: '+60 16-789 0123',
    },
    lea: {
        name: 'Ahmad Faizal',
        mykadNo: '870108-14-2211',
        designation: 'Investigating Officer',
        department: 'PDRM — Cybercrime Unit',
        email: 'ahmad.faizal@rmp.gov.my',
        phone: '+60 17-654 3210',
    },
};

/* ── Profile Information Card ── */

interface ProfileCardProps {
    role: string;
    iconColor?: string;
}

export function ProfileInformationCard({ role, iconColor = 'text-primary' }: ProfileCardProps) {
    const { toast } = useToast();
    const profile = roleProfiles[role] || roleProfiles.reviewer;
    const [designation, setDesignation] = useState(profile.designation);
    const [department, setDepartment] = useState(profile.department);
    const [address, setAddress] = useState('123 Jalan Utama, Taman Perindustrian, 47100 Puchong, Selangor');
    const [altEmail, setAltEmail] = useState('');
    const [altPhone, setAltPhone] = useState('');

    const handleSaveProfile = () => {
        toast({ title: 'Profile Updated', description: 'Your contact information has been saved.' });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className={`h-5 w-5 ${iconColor}`} />
                    Profile Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={profile.name} disabled className="bg-muted/50 cursor-not-allowed" />
                        <p className="text-xs text-muted-foreground">Cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                        <Label>MyKad No</Label>
                        <Input value={profile.mykadNo} disabled className="bg-muted/50 cursor-not-allowed" />
                        <p className="text-xs text-muted-foreground">Cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Designation</Label>
                        <Input value={designation} onChange={(e) => setDesignation(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Department</Label>
                        <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={profile.email} disabled className="bg-muted/50 cursor-not-allowed" />
                        <p className="text-xs text-muted-foreground">Cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Optional Alternative Email</Label>
                        <Input
                            type="email"
                            placeholder="alternative@email.com"
                            value={altEmail}
                            onChange={(e) => setAltEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone No</Label>
                        <Input value={profile.phone} disabled className="bg-muted/50 cursor-not-allowed" />
                        <p className="text-xs text-muted-foreground">Cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Optional Alternative Phone No</Label>
                        <Input
                            type="tel"
                            placeholder="+60 1X-XXX XXXX"
                            value={altPhone}
                            onChange={(e) => setAltPhone(e.target.value)}
                        />
                    </div>

                    {role === 'licenseeAdmin' && (
                        <div className="space-y-2 sm:col-span-2">
                            <Label>Business Address</Label>
                            <Textarea
                                rows={2}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {role === 'licenseeAdmin' && (
                    <div className="mt-6 flex flex-col gap-2">
                        <Label>Organization Logo</Label>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted shrink-0">
                                <span className="text-xs text-muted-foreground">No logo</span>
                            </div>
                            <div className="space-y-2">
                                <Button variant="outline">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Logo
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                    Recommended: PNG or JPG, max 2MB, 400x400px
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <Button onClick={handleSaveProfile} className="mt-6">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
            </CardContent>
        </Card>
    );
}

/* ── Change Password Card ── */

interface ChangePasswordCardProps {
    idPrefix: string;
    iconColor?: string;
}

export function ChangePasswordCard({ idPrefix, iconColor = 'text-primary' }: ChangePasswordCardProps) {
    const { toast } = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordTouched, setNewPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const { criteria, metCount, strength, allMet } = usePasswordStrength(newPassword);
    const passwordsMatch = newPassword === confirmPassword;
    const formValid = !!currentPassword && allMet && passwordsMatch;

    const handlePasswordChange = () => {
        if (!formValid) return;
        toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setNewPasswordTouched(false);
        setConfirmPasswordTouched(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Key className={`h-5 w-5 ${iconColor}`} />
                    Change Password
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`${idPrefix}-currentPassword`}>Current Password</Label>
                        <PasswordInput
                            id={`${idPrefix}-currentPassword`}
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`${idPrefix}-newPassword`}>New Password</Label>
                        <PasswordInput
                            id={`${idPrefix}-newPassword`}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={() => setNewPasswordTouched(true)}
                            aria-describedby={`${idPrefix}-password-requirements`}
                            aria-invalid={newPasswordTouched && !allMet ? true : undefined}
                        />
                        {newPassword.length > 0 && (
                            <>
                                <PasswordStrengthBar metCount={metCount} />
                                <PasswordRequirementChecklist criteria={criteria} id={`${idPrefix}-password-requirements`} />
                            </>
                        )}
                        <PasswordStrengthAnnouncer level={newPassword.length > 0 ? strength.level : ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`${idPrefix}-confirmPassword`}>Confirm New Password</Label>
                        <PasswordInput
                            id={`${idPrefix}-confirmPassword`}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => setConfirmPasswordTouched(true)}
                            aria-invalid={confirmPasswordTouched && !passwordsMatch ? true : undefined}
                        />
                        {confirmPassword.length > 0 && !passwordsMatch && (
                            <p className="text-xs text-destructive">Passwords do not match.</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!formValid}
                        aria-disabled={!formValid}
                    >
                        Update Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
