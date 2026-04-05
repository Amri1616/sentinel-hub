import { ProfileInformationCard, ChangePasswordCard } from '@/components/shared/ProfileSecurityCards';

export default function LEASecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile &amp; Security</h1>
        <p className="text-muted-foreground">Manage your profile and account security</p>
      </div>

      <ProfileInformationCard role="agency" iconColor="text-primary" />
      <ChangePasswordCard idPrefix="agency" iconColor="text-primary" />
    </div>
  );
}
