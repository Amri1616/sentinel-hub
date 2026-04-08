import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { roleConfigs, RoleConfig } from '@/lib/roleConfig';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Role } from '@/lib/auth';

const roleOrder: Role[] = [
  'licensee-admin',
  'reporter',
  'reviewer',
  'validator',
  'investigator',
  'lea-viewer',
];

export default function ChooseRole() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    navigate('/login', { state: { role } });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-xl text-muted-foreground">
            Select the role that matches your responsibilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleOrder.map((roleId) => {
            const config = roleConfigs[roleId as Role];
            return (
            <Card
              key={config.id}
              className="border-2 hover:scale-105 transition-all cursor-pointer bg-card/50 backdrop-blur"
              style={{
                borderColor: `${config.color}40`,
              }}
              onClick={() => handleRoleSelect(config.id)}
            >
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${config.color}20`,
                  }}
                >
                  <config.icon
                    className="h-6 w-6"
                    style={{ color: config.color }}
                  />
                </div>
                <CardTitle
                  className="text-xl"
                  style={{ color: config.color }}
                >
                  {config.name}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {config.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  style={{
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                    borderColor: config.color,
                  }}
                  variant="outline"
                >
                  Proceed
                </Button>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
