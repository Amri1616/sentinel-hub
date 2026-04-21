import { Bell, User, LogOut, Moon, Sun, Clock, MessageSquare, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { getCurrentUser, logout } from '@/lib/auth';
import { RoleChip } from './RoleChip';
import { getRoleConfig } from '@/lib/roleConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import mcmcLogo from '@/assets/mcmc-logo.png';
import { useTranslation } from 'react-i18next';

const recentNotifications = [
  {
    id: 1,
    title: 'Draft Expiring Soon',
    message: 'Your draft "Tampered Shipment" has only 1 day left.',
    time: '30 min ago',
    icon: Clock,
    read: false,
  },
  {
    id: 2,
    title: 'Clarification Requested',
    message: 'Reviewer requested info for #PSIRP-2025-0025.',
    time: '1 hour ago',
    icon: MessageSquare,
    read: false,
  },
  {
    id: 3,
    title: 'Status Updated',
    message: 'Incident #PSIRP-2025-0020 moved to "Under Investigation".',
    time: '3 hours ago',
    icon: FileText,
    read: false,
  },
  {
    id: 4,
    title: 'Case Escalated',
    message: 'Incident #PSIRP-2025-0019 escalated to LEA.',
    time: '1 day ago',
    icon: ArrowUpRight,
    read: true,
  },
];

export const Header = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [notifOpen, setNotifOpen] = useState(false);

  const authRoutes = ['/', '/login', '/otp', '/forgot-password'];
  if (authRoutes.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = recentNotifications.filter((n) => !n.read).length;
  const language = i18n.language === 'ms' ? 'BM' : 'EN';

  const setLanguage = (nextLanguage: 'EN' | 'BM') => {
    void i18n.changeLanguage(nextLanguage === 'BM' ? 'ms' : 'en');
  };

  const getNotificationsPath = () => {
    if (!user) return '/';
    const config = getRoleConfig(user.role);
    return `${config.basePath}/notifications`;
  };

  const handleNotifClick = () => {
    setNotifOpen(false);
    navigate(getNotificationsPath());
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <img
            src={mcmcLogo}
            alt="MCMC Logo"
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold font-poppins tracking-tight hidden md:block">{t('Postal Security Incident Reporting Platform')}</h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
              <button
                onClick={() => setLanguage('BM')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${language === 'BM' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                BM
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${language === 'EN' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                EN
              </button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user && (
            <>
              {/* Notification Bell Popover */}
              <Popover open={notifOpen} onOpenChange={setNotifOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold">{t('Notifications')}</p>
                    <p className="text-xs text-muted-foreground">{t('{{count}} unread', { count: unreadCount })}</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {recentNotifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <button
                          key={notif.id}
                          onClick={handleNotifClick}
                          className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50 border-b border-border last:border-b-0 ${!notif.read ? 'bg-primary/5' : ''
                            }`}
                        >
                          <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium truncate">{t(notif.title)}</p>
                              {!notif.read && (
                                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{t(notif.message)}</p>
                            <p className="text-xs text-muted-foreground/70 mt-0.5">{t(notif.time)}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5 border-t border-border">
                    <button
                      onClick={handleNotifClick}
                      className="w-full text-center text-sm font-medium text-primary hover:underline"
                    >
                      {t('View all notifications')}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 h-auto py-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-poppins font-semibold text-xs text-[#111111] dark:text-white uppercase tracking-wider">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`${getRoleConfig(user.role).basePath}/${user.role === 'reporter' ? 'profile' : 'security'}`)}>
                    <User className="mr-2 h-4 w-4" />
                    {t('Profile')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('Logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" onClick={handleLogout} title={t('Logout')} className="text-destructive hover:bg-destructive/10">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
