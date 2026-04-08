import mcmcLogo from '@/assets/mcmc-logo.png';

import { useLocation } from 'react-router-dom';

export const Footer = () => {
    const location = useLocation();
    const authRoutes = ['/', '/login', '/otp', '/forgot-password'];
    
    if (authRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <footer className="sticky bottom-0 z-40 bg-white dark:bg-card border-t border-border mt-auto">
            <div className="container mx-auto px-4 h-auto py-3 md:h-12 md:py-0 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                <div className="flex items-center gap-3">
                    <img
                        src={mcmcLogo}
                        alt="MCMC Logo"
                        className="h-6 w-auto object-contain"
                    />
                    <p className="font-poppins text-[12px] text-[#111111] dark:text-muted-foreground whitespace-normal md:whitespace-nowrap text-center md:text-left">
                        Copyright © 2026 Malaysian Communications and Multimedia Commission. All rights reserved.
                    </p>
                </div>
                <div className="font-poppins text-[12px] text-[#111111] dark:text-muted-foreground text-center md:text-right">
                    IT HELPDESK: 03-8688 8008 | ITHelpdesk@mcmc.gov.my
                </div>
            </div>
        </footer>
    );
};
