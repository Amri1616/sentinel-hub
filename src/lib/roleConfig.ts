import { Role } from './auth';
import { LucideIcon, FileText, Building2, ClipboardCheck, BadgeCheck, Search, Settings, Crown, Shield } from 'lucide-react';

export interface RoleConfig {
  id: Role;
  name: string;
  description: string;
  color: string;
  glowClass: string;
  basePath: string;
  icon: LucideIcon;
}

export const roleConfigs: Record<Role, RoleConfig> = {
  'reporter': {
    id: 'reporter',
    name: 'Licensee Reporter',
    description: 'Submit and track incidents for your organisation.',
    color: 'hsl(191 100% 50%)',
    glowClass: 'glow-cyan',
    basePath: '/licensee-reporter',
    icon: FileText,
  },
  'licensee-admin': {
    id: 'licensee-admin',
    name: 'Licensee Admin',
    description: 'Manage your organisation\'s users and submissions.',
    color: 'hsl(271 76% 53%)',
    glowClass: 'glow-purple',
    basePath: '/licensee-admin',
    icon: Building2,
  },
  'reviewer': {
    id: 'reviewer',
    name: 'MCMC Case Officer',
    description: 'Review and process incident submissions.',
    color: 'hsl(203 89% 53%)',
    glowClass: 'glow-blue',
    basePath: '/case-officer',
    icon: ClipboardCheck,
  },
  'validator': {
    id: 'validator',
    name: 'MCMC Supervisor',
    description: 'Approve and finalize incident decisions.',
    color: 'hsl(38 92% 50%)',
    glowClass: 'glow-amber',
    basePath: '/supervisor',
    icon: BadgeCheck,
  },
  'investigator': {
    id: 'investigator',
    name: 'MCMC Internal',
    description: 'Strategic oversight and governance analytics.',
    color: 'hsl(0 78% 62%)',
    glowClass: 'glow-red',
    basePath: '/internal',
    icon: Search,
  },
  'system-admin': {
    id: 'system-admin',
    name: 'MCMC System Admin',
    description: 'Configure system settings and manage users.',
    color: 'hsl(168 76% 42%)',
    glowClass: 'glow-teal',
    basePath: '/admin',
    icon: Settings,
  },
  'super-admin': {
    id: 'super-admin',
    name: 'MCMC Super Admin',
    description: 'Full system access with AI analytics.',
    color: 'hsl(45 93% 47%)',
    glowClass: 'glow-gold',
    basePath: '/super-admin',
    icon: Crown,
  },
  'lea-viewer': {
    id: 'lea-viewer',
    name: 'Agency',
    description: 'View and investigate escalated cases from MCMC.',
    color: 'hsl(220 70% 50%)',
    glowClass: 'glow-indigo',
    basePath: '/agency',
    icon: Shield,
  },
};

export const getRoleConfig = (role: Role): RoleConfig => {
  return roleConfigs[role];
};
