import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, FileText, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mcmcLogo from '@/assets/mcmc-logo.png';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-role-validator/10 pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src={mcmcLogo}
                  alt="MCMC Logo"
                  className="h-24 w-auto object-contain"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Postal Security
                <br />
                <span className="bg-gradient-to-r from-primary via-role-reviewer to-role-validator bg-clip-text text-transparent">
                  Incident Reporting Platform
                </span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Report, track, and analyze postal security incidents securely with real-time collaboration and centralized governance oversight.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="text-lg px-8 glow-cyan"
              >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools for secure incident management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-card/50 backdrop-blur hover:border-primary/40 transition-all">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 glow-cyan">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Reporting</h3>
                <p className="text-muted-foreground">
                  Submit incidents quickly with guided forms and structured classification workflows
                </p>
              </CardContent>
            </Card>

            <Card className="border-role-reviewer/20 bg-card/50 backdrop-blur hover:border-role-reviewer/40 transition-all">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-role-reviewer/20 flex items-center justify-center mb-4 glow-blue">
                  <Activity className="h-6 w-6 text-role-reviewer" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor incident status with live updates and real-time tracking
                </p>
              </CardContent>
            </Card>

            <Card className="border-role-validator/20 bg-card/50 backdrop-blur hover:border-role-validator/40 transition-all">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-role-validator/20 flex items-center justify-center mb-4 glow-amber">
                  <Shield className="h-6 w-6 text-role-validator" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
                <p className="text-muted-foreground">
                  End-to-end encryption with comprehensive audit trails
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 MCMC • v0.1</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
