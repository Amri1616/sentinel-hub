import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getCurrentUser } from "./lib/auth";
import Landing from "./pages/Landing";
import ChooseRole from "./pages/ChooseRole";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import ReporterLayout from "./components/reporter/ReporterLayout";
import ReporterDashboard from "./pages/reporter/Dashboard";
import ReporterIncidents from "./pages/reporter/Incidents";
import NewIncident from "./pages/reporter/NewIncident";
import IncidentDetails from "./pages/reporter/IncidentDetails";
import ReporterNotifications from "./pages/reporter/Notifications";
import ReporterAnalytics from "./pages/reporter/Analytics";
import ReporterDrafts from "./pages/reporter/Drafts";
import ReporterProfileSecurity from "./pages/reporter/ProfileSecurity";
import CaseOfficerLayout from "./components/caseOfficer/CaseOfficerLayout";
import ReviewerDashboard from "./pages/reviewer/Dashboard";
import ReviewerIncidents from "./pages/reviewer/Incidents";
import CaseOfficerInbox from "./pages/reviewer/Inbox";
import CaseReview from "./pages/reviewer/CaseReview";
import CaseOfficerSearch from "./pages/reviewer/Search";
import CaseOfficerReports from "./pages/reviewer/Reports";
import CaseOfficerAnnouncements from "./pages/reviewer/Announcements";
import ReviewerAllCases from "./pages/reviewer/AllCases";
import CaseOfficerNotifications from "./pages/reviewer/Notifications";
import CaseOfficerSecurity from "./pages/reviewer/Security";
import LicenseeAdminLayout from "./components/licenseeAdmin/LicenseeAdminLayout";
import LicenseeAdminDashboard from "./pages/licenseeAdmin/Dashboard";
import LicenseeAdminIncidents from "./pages/licenseeAdmin/Incidents";
import LicenseeAdminIncidentDetails from "./pages/licenseeAdmin/IncidentDetails";
import LicenseeAdminDrafts from "./pages/licenseeAdmin/Drafts";
import LicenseeAdminUnderReview from "./pages/licenseeAdmin/UnderReview";
import LicenseeAdminEscalated from "./pages/licenseeAdmin/Escalated";
import LicenseeAdminClosed from "./pages/licenseeAdmin/Closed";
import LicenseeAdminUsers from "./pages/licenseeAdmin/Users";

import LicenseeAdminAnalytics from "./pages/licenseeAdmin/Analytics";
import LicenseeAdminNotifications from "./pages/licenseeAdmin/Notifications";
import LicenseeAdminSecuritySettings from "./pages/licenseeAdmin/SecuritySettings";
import LicenseeAdminTesting from "./pages/licenseeAdmin/Testing";
import SupervisorLayout from "./components/supervisor/SupervisorLayout";
import ValidatorDashboard from "./pages/validator/Dashboard";
import CaseMonitoring from "./pages/validator/AllCases";
import CaseDetail from "./pages/validator/CaseDetail";
import EscalationQueue from "./pages/validator/EscalationQueue";
import AuditCompliance from "./pages/validator/AuditCompliance";
import SupervisorNotifications from "./pages/validator/Notifications";
import SupervisorSecurity from "./pages/validator/Security";
import SupervisorAnalytics from "./pages/validator/Analytics";
import SupervisorSearchFilter from "./pages/validator/SearchFilter";
import InvestigatorLayout from "./components/investigator/InvestigatorLayout";
import InvestigatorDashboard from "./pages/investigator/Dashboard";
import InvestigatorAnalytics from "./pages/investigator/Analytics";
import InvestigatorAllCases from "./pages/investigator/AllCases";
import InvestigatorCaseDetail from "./pages/investigator/CaseDetail";

import InvestigatorAuditCompliance from "./pages/investigator/AuditCompliance";
import InvestigatorNotifications from "./pages/investigator/Notifications";
import InvestigatorSecurity from "./pages/investigator/Security";
import SystemAdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminOrganisations from "./pages/admin/Organisations";
import MasterData from "./pages/admin/MasterData";
import AuditLogs from "./pages/admin/AuditLogs";
import SuperAdminDashboard from "./pages/superAdmin/Dashboard";
import LEALayout from "./components/lea/LEALayout";
import LEADashboard from "./pages/lea/Dashboard";
import LEACaseList from "./pages/lea/CaseList";
import LEACaseDetail from "./pages/lea/CaseDetail";
import LEANotifications from "./pages/lea/Notifications";
import LEASecurity from "./pages/lea/Security";
import LEAAnalytics from "./pages/lea/Analytics";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full flex flex-col">
            <Header />
            <main className="flex-1">
              <div className="container mx-auto px-4 py-6">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/choose-role" element={<ChooseRole />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/otp" element={<OtpVerification />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* Licensee Reporter Routes - with sidebar layout */}
                  <Route path="/licensee-reporter" element={<ProtectedRoute><ReporterLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<ReporterDashboard />} />
                    <Route path="drafts" element={<ReporterDrafts />} />
                    <Route path="incidents" element={<ReporterIncidents />} />
                    <Route path="incidents/new" element={<NewIncident />} />
                    <Route path="incidents/:id" element={<IncidentDetails />} />
                    <Route path="notifications" element={<ReporterNotifications />} />
                    <Route path="analytics" element={<ReporterAnalytics />} />
                    <Route path="profile" element={<ReporterProfileSecurity />} />
                  </Route>

                  {/* Licensee Admin Routes - with sidebar layout */}
                  <Route path="/licensee-admin" element={<ProtectedRoute><LicenseeAdminLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<LicenseeAdminDashboard />} />
                    <Route path="drafts" element={<LicenseeAdminDrafts />} />
                    <Route path="under-review" element={<LicenseeAdminUnderReview />} />
                    <Route path="escalated" element={<LicenseeAdminEscalated />} />
                    <Route path="closed" element={<LicenseeAdminClosed />} />
                    <Route path="incidents" element={<LicenseeAdminIncidents />} />
                    <Route path="incidents/:id" element={<LicenseeAdminIncidentDetails />} />
                    <Route path="users" element={<LicenseeAdminUsers />} />

                    <Route path="analytics" element={<LicenseeAdminAnalytics />} />
                    <Route path="notifications" element={<LicenseeAdminNotifications />} />
                    <Route path="security" element={<LicenseeAdminSecuritySettings />} />
                    <Route path="testing" element={<LicenseeAdminTesting />} />
                  </Route>

                  {/* Case Officer Routes - with sidebar layout */}
                  {/* Case Officer Routes - with sidebar layout */}
                  <Route path="/case-officer" element={<ProtectedRoute><CaseOfficerLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<ReviewerDashboard />} />
                    <Route path="inbox" element={<CaseOfficerInbox />} />
                    <Route path="all-cases" element={<ReviewerAllCases />} />
                    <Route path="incidents" element={<ReviewerIncidents />} />
                    <Route path="cases/:id" element={<CaseReview />} />
                    <Route path="search" element={<CaseOfficerSearch />} />
                    <Route path="reports" element={<CaseOfficerReports />} />
                    <Route path="announcements" element={<CaseOfficerAnnouncements />} />
                    <Route path="notifications" element={<CaseOfficerNotifications />} />
                    <Route path="security" element={<CaseOfficerSecurity />} />
                  </Route>

                  {/* Validator Routes */}
                  {/* Supervisor Routes - with sidebar layout */}
                  <Route path="/supervisor" element={<ProtectedRoute><SupervisorLayout /></ProtectedRoute>}>
                    <Route path="search" element={<SupervisorSearchFilter />} />
                    <Route path="dashboard" element={<ValidatorDashboard />} />
                    <Route path="cases" element={<CaseMonitoring />} />
                    <Route path="cases/:id" element={<CaseDetail />} />
                    <Route path="escalations" element={<EscalationQueue />} />
                    <Route path="escalations/:id" element={<EscalationQueue />} />
                    <Route path="audit" element={<AuditCompliance />} />
                    <Route path="notifications" element={<SupervisorNotifications />} />
                    <Route path="analytics" element={<SupervisorAnalytics />} />
                    <Route path="security" element={<SupervisorSecurity />} />
                  </Route>

                  {/* Investigator / MCMC Internal Routes - with sidebar layout */}
                  {/* MCMC Internal Routes - with sidebar layout */}
                  <Route path="/internal" element={<ProtectedRoute><InvestigatorLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<InvestigatorDashboard />} />
                    <Route path="analytics" element={<InvestigatorAnalytics />} />
                    <Route path="cases" element={<InvestigatorAllCases />} />
                    <Route path="cases/:id" element={<InvestigatorCaseDetail />} />
                    <Route path="notifications" element={<InvestigatorNotifications />} />
                    <Route path="security" element={<InvestigatorSecurity />} />
                  </Route>

                  {/* System Admin Routes */}
                  <Route path="/admin/dashboard" element={<ProtectedRoute><SystemAdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
                  <Route path="/admin/organisations" element={<ProtectedRoute><AdminOrganisations /></ProtectedRoute>} />
                  <Route path="/admin/master-data" element={<ProtectedRoute><MasterData /></ProtectedRoute>} />
                  <Route path="/admin/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />

                  {/* Super Admin Routes */}
                  <Route path="/super-admin/dashboard" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />

                  {/* LEA Routes - with sidebar layout */}
                  <Route path="/lea" element={<ProtectedRoute><LEALayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<LEADashboard />} />
                    <Route path="cases" element={<LEACaseList />} />
                    <Route path="cases/:id" element={<LEACaseDetail />} />
                    <Route path="analytics" element={<LEAAnalytics />} />
                    <Route path="notifications" element={<LEANotifications />} />
                    <Route path="security" element={<LEASecurity />} />
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
