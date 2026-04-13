import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/lib/auth';
import { ArrowLeft, User, ShieldCheck, Users, Search, Eye, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

import mcmcLogo from '@/assets/mcmc-logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoUsers = [
    { label: 'Licensee Admin', email: 'ladmin@testing.com', password: '12345', icon: Building2 },
    { label: 'Licensee Reporter', email: 'lreporter@testing.com', password: '12345', icon: User },
    { label: 'MCMC Case Officer', email: 'cofficer@mcmc.gov.my', password: '12345', icon: Search },
    { label: 'MCMC Supervisor', email: 'msupervisor@mcmc.gov.my', password: '12345', icon: ShieldCheck },
    { label: 'MCMC Internal', email: 'minternal@mcmc.gov.my', password: '12345', icon: Eye },
    { label: 'Agency (LEA)', email: 'agency@lea.gov.my', password: '12345', icon: Users },
  ];

  const handleDemoClick = (email: string, pass: string, label: string) => {
    setEmail(email);
    setPassword(pass);
    toast.info(`Form populated for ${label}`, {
      description: "Click login to continue",
      duration: 2000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      try {
        const user = login(email, password);
        const otp = '123456';
        toast.success(`Welcome back, ${user.name}. Please complete MFA.`);
        // Pass the user's role to OTP page so it knows where to redirect after MFA
        navigate('/otp', { state: { role: user.role, otp } });
      } catch (error) {
        toast.error('Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center p-4 bg-[#1a1a1a] z-50 overflow-hidden">
      <div className="w-full max-w-md flex flex-col items-center mb-6">
        <img src={mcmcLogo} alt="MCMC Logo" className="h-32 w-auto mb-6" />
        <h1 className="text-[28px] font-bold font-poppins text-white text-center tracking-wide uppercase leading-tight">
          Postal Security Incident<br />Reporting Platform
        </h1>
      </div>

      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="border-t-[4px] border-x-0 border-b-0 border-[#044cd0] bg-white rounded-lg shadow-xl shadow-black/50">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-xl text-[#111111] font-poppins">System Login</CardTitle>
            <CardDescription className="text-sm pt-2 text-gray-600">
              Enter your credentials to access the secure reporting platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#111111]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-black border-gray-300 focus:border-[#044cd0] focus:ring-[#044cd0]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#111111]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white text-black border-gray-300 focus:border-[#044cd0] focus:ring-[#044cd0]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#044cd0] hover:bg-[#044cd0]/90 text-white font-semibold h-11"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-gray-500 hover:text-[#044cd0] underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Demo Accounts
                </h3>
                <Badge variant="outline" className="text-[10px] font-medium border-blue-100 text-[#044cd0] bg-blue-50/50">
                  Quick Access
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {demoUsers.map((user) => (
                  <Button
                    key={user.email}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDemoClick(user.email, user.password, user.label)}
                    className="h-auto py-2 px-3 justify-start items-center text-left hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <div className="mr-2.5 p-1.5 rounded-md bg-gray-100 group-hover:bg-[#044cd0]/10 group-hover:text-[#044cd0] transition-colors">
                      <user.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-semibold text-gray-700 truncate">
                        {user.label}
                      </span>
                      <span className="text-[9px] text-gray-400 truncate">
                        {user.email}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 font-poppins text-xs text-center text-gray-400">
        IT HELPDESK: 03-8688 8008 | ITHelpdesk@mcmc.gov.my
      </div>
    </div>
  );
}
