import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleChip } from '@/components/RoleChip';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, Role } from '@/lib/auth';
import { getRoleConfig } from '@/lib/roleConfig';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import mcmcLogo from '@/assets/mcmc-logo.png';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = (location.state?.role || 'reporter') as Role;
  const config = getRoleConfig(role);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAutoFill = () => {
    setEmail('demo@mcmc.gov.my');
    setPassword('demo123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      try {
        login(email, password, role);
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        toast.success('Credentials verified. Please complete MFA.');
        navigate('/otp', { state: { role, otp } });
      } catch (error) {
        toast.error('Login failed');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-[#1a1a1a] relative">
      <div className="w-full max-w-md flex flex-col items-center mb-8">
        <img src={mcmcLogo} alt="MCMC Logo" className="h-20 w-auto mb-4" />
        <h1 className="text-[28px] font-bold font-poppins text-white text-center tracking-wide uppercase">
          POSTAL & COURIER INCIDENT REPORTING
        </h1>
      </div>

      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/choose-role')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Button>

        <Card className="border-t-[4px] border-x-0 border-b-0 border-[#044cd0] bg-white rounded-lg shadow-xl shadow-black/50">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-xl text-[#111111] font-poppins">System Login</CardTitle>
            <div className="flex justify-center">
              <RoleChip role={role} />
            </div>
            <CardDescription className="text-sm pt-2 text-gray-600">
              {config.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#111111]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@mcmc.gov.my"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleAutoFill}
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
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-6 font-poppins text-xs text-center text-gray-400">
        IT HELPDESK: 03-8688 8008 | ITHelpdesk@mcmc.gov.my
      </div>
    </div>
  );
}
