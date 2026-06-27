import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ApplicationEventsPage from "./features/applicationEvents/pages/ApplicationEventsPage";
import ContactPersonsPage from "./features/contactPersons/pages/ContactPersonsPage";
import JobApplicationDetailsPage from "./features/jobApplications/pages/JobApplicationDetailsPage";
import ApplicationEventDetailsPage from "./features/applicationEvents/pages/ApplicationEventDetailsPage";
import ContactPersonDetailsPage from "./features/contactPersons/pages/ContactPersonDetailsPage";
import CompaniesPage from "./features/companies/pages/CompaniesPage";
import CompanyDetailsPage from "./features/companies/pages/CompanyDetailsPage";
import JobApplicationsPage from "./features/jobApplications/pages/JobApplicationsPage";
import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import RegisterPage from "./features/auth/pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/companies"
            element={
              <ProtectedRoute>
                <CompaniesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/companies/:id"
            element={
              <ProtectedRoute>
                <CompanyDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job-applications"
            element={
              <ProtectedRoute>
                <JobApplicationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job-applications/:id"
            element={
              <ProtectedRoute>
                <JobApplicationDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/application-events"
            element={
              <ProtectedRoute>
                <ApplicationEventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/application-events/:id"
            element={
              <ProtectedRoute>
                <ApplicationEventDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact-persons"
            element={
              <ProtectedRoute>
                <ContactPersonsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact-persons/:id"
            element={
              <ProtectedRoute>
                <ContactPersonDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
