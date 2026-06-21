import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ApplicationEventsPage from "./pages/applicationEvents/ApplicationEventsPage";
import ContactPersonsPage from "./pages/contactPersons/ContactPersonsPage";
import JobApplicationDetailsPage from "./features/jobApplications/pages/JobApplicationDetailsPage";
import ApplicationEventDetailsPage from "./pages/applicationEvents/ApplicationEventDetailsPage";
import ContactPersonDetailsPage from "./pages/contactPersons/ContactPersonDetailsPage";
import CompaniesPage from "./features/companies/pages/CompaniesPage";
import CompanyDetailsPage from "./features/companies/pages/CompanyDetailsPage";
import JobApplicationsPage from "./features/jobApplications/pages/JobApplicationsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />

          <Route path="/job-applications" element={<JobApplicationsPage />} />
          <Route
            path="/job-applications/:id"
            element={<JobApplicationDetailsPage />}
          />

          <Route
            path="/application-events"
            element={<ApplicationEventsPage />}
          />
          <Route
            path="/application-events/:id"
            element={<ApplicationEventDetailsPage />}
          />

          <Route path="/contact-persons" element={<ContactPersonsPage />} />
          <Route
            path="/contact-persons/:id"
            element={<ContactPersonDetailsPage />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
