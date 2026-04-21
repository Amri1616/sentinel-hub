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

export const login = (email: string, password: string): User => {
  const credentials: Record<string, { role: Role; pass: string }> = {
    'ladmin@testing.com': { role: 'licensee-admin', pass: '12345' },
    'lreporter@testing.com': { role: 'reporter', pass: '12345' },
    'cofficer@mcmc.gov.my': { role: 'reviewer', pass: '12345' },
    'msupervisor@mcmc.gov.my': { role: 'validator', pass: '12345' },
    'minternal@mcmc.gov.my': { role: 'investigator', pass: '12345' },
    'agency@lea.gov.my': { role: 'lea-viewer', pass: '12345' },
    'superadmin@mcmc.gov.my': { role: 'super-admin', pass: '12345' },
  };

  const cred = credentials[email];
  
  if (!cred || cred.pass !== password) {
    // For demo purposes, we still allow generic login as reporter if not matched
    // But the user requested specific redirects for these.
    // Let's throw an error for non-demo creds to enforce the rule.
    throw new Error('Invalid credentials');
  }

  const role: Role = cred.role;

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
