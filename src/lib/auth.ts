// Simple in-memory auth for demo purposes
export type Role = 
  | 'reporter' 
  | 'licensee-admin' 
  | 'reviewer' 
  | 'validator' 
  | 'investigator' 
  | 'system-admin' 
  | 'super-admin'
  | 'lea-viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organisationId?: string;
  organisationName?: string;
}

let currentUser: User | null = null;

export const login = (email: string, password: string, role: Role): User => {
  // Demo: accept any credentials
  const roleNames: Record<Role, string> = {
    'reporter': 'Licensee Reporter',
    'licensee-admin': 'Licensee Admin',
    'reviewer': 'MCMC Case Officer',
    'validator': 'MCMC Supervisor',
    'investigator': 'MCMC Internal',
    'system-admin': 'MCMC System Admin',
    'super-admin': 'MCMC Super Admin',
    'lea-viewer': 'Agency',
  };

  const user: User = {
    id: `user-${Date.now()}`,
    name: roleNames[role],
    email,
    role,
    organisationId: role === 'reporter' || role === 'licensee-admin' ? 'org-001' : undefined,
    organisationName: role === 'reporter' || role === 'licensee-admin' ? 'Global Express Logistics Sdn Bhd' : undefined,
  };

  currentUser = user;
  return user;
};

export const logout = () => {
  currentUser = null;
};

export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const isAuthenticated = (): boolean => {
  return currentUser !== null;
};
