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
