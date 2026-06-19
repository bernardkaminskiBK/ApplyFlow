import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { JobApplication } from "../../types/JobApplication/jobApplication";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import type { JobApplicationFormErrors } from "../../types/JobApplication/jobApplicationErrors";
import JobApplicationFormDialog from "../../components/jobApplications/JobApplicationFormDialog";
import SearchField from "../../components/common/SearchField";
import {
  getSourceText,
  getStatusInfo,
  getWorkModeText,
} from "../../utils/jobApplicationHelpers";
import type { Company } from "../../features/companies/models/company";
import {
  createJobApplication,
  deleteJobApplication,
  getJobApplications,
  updateJobApplication,
} from "../../api/jobApplicationsApi";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageHeader from "../../components/common/PageHeader";
import { getCompanies } from "../../api/companiesApi";

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [errors, setErrors] = useState<JobApplicationFormErrors>({});

  const [companyId, setCompanyId] = useState("");
  const [workMode, setWorkMode] = useState("0");
  const [status, setStatus] = useState("1");
  const [source, setSource] = useState("0");
  const [positionTitle, setPositionTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [note, setNote] = useState("");

  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const [editingApplication, setEditingApplication] =
    useState<JobApplication | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  const filteredApplications = applications.filter((application) =>
    `${application.companyName ?? ""} ${application.positionTitle ?? ""} ${application.appliedDate ?? ""} ${application.location ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    loadApplications();
    loadCompanies();
  }, []);

  async function loadApplications() {
    const data = await getJobApplications();
    setApplications(data);
  }

  async function loadCompanies() {
    const data = await getCompanies();
    setCompanies(data);
  }

  function resetForm() {
    setCompanyId("");
    setWorkMode("0");
    setStatus("1");
    setSource("0");
    setPositionTitle("");
    setLocation("");
    setSalaryMin("");
    setSalaryMax("");
    setNote("");
    setErrors({});
  }

  function openCreateDialog() {
    setEditingApplication(null);
    resetForm();
    setIsFormDialogOpen(true);
  }

  function openEditDialog(application: JobApplication) {
    setEditingApplication(application);
    setCompanyId(application.companyId.toString());
    setWorkMode(application.workMode.toString());
    setStatus(application.status.toString());
    setSource(application.source.toString());
    setPositionTitle(application.positionTitle);
    setLocation(application.location || "");
    setSalaryMin(application.salaryMin?.toString() || "");
    setSalaryMax(application.salaryMax?.toString() || "");
    setNote(application.note || "");

    setErrors({});
    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setEditingApplication(null);
    setIsFormDialogOpen(false);
    resetForm();
  }

  async function handleSaveApplication() {
    try {
      setErrors({});

      const request = {
        companyId: Number(companyId),
        positionTitle,
        location,
        workMode: Number(workMode),
        status: Number(status),
        source: Number(source),
        appliedDate: new Date().toISOString().split("T")[0],
        salaryMin: salaryMin ? Number(salaryMin) : null,
        salaryMax: salaryMax ? Number(salaryMax) : null,
        note,
      };

      if (editingApplication) {
        await updateJobApplication(editingApplication.id, request);
      } else {
        await createJobApplication(request);
      }

      await loadApplications();
      closeFormDialog();
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      setErrors({
        companyId: validationErrors?.CompanyId?.[0],
        positionTitle: validationErrors?.PositionTitle?.[0],
        location: validationErrors?.Location?.[0],
        salaryMin: validationErrors?.SalaryMin?.[0],
        salaryMax: validationErrors?.SalaryMax?.[0],
        note: validationErrors?.Note?.[0],
      });
    }
  }

  async function handleDeleteApplication() {
    if (!selectedApplication) {
      return;
    }

    await deleteJobApplication(selectedApplication.id);

    await loadApplications();

    setIsDeleteDialogOpen(false);
    setSelectedApplication(null);
  }

  return (
    <Box>
      <PageHeader
        title="Job Applications"
        buttonText="Add Application"
        onButtonClick={openCreateDialog}
      />

      <SearchField
        label="Search Job Applications"
        value={searchText}
        onChange={setSearchText}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Work Mode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Source</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Applied Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Link to={`/job-applications/${application.id}`}>
                    {application.companyName}
                  </Link>
                </TableCell>
                <TableCell>{application.positionTitle}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusInfo(application.status).text}
                    color={getStatusInfo(application.status).color}
                    variant="filled"
                  />
                </TableCell>
                <TableCell sx={{ fontStyle: "italic" }}>
                  {getWorkModeText(application.workMode)}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {getSourceText(application.source)}
                </TableCell>
                <TableCell>{application.appliedDate}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditDialog(application)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setSelectedApplication(application);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <JobApplicationFormDialog
        open={isFormDialogOpen}
        title={editingApplication ? "Edit Application" : "Add Application"}
        companyId={companyId}
        companies={companies}
        workMode={workMode}
        status={status}
        source={source}
        positionTitle={positionTitle}
        location={location}
        salaryMin={salaryMin}
        salaryMax={salaryMax}
        note={note}
        errors={errors}
        onCompanyIdChange={setCompanyId}
        onWorkModeChange={setWorkMode}
        onStatusChange={setStatus}
        onSourceChange={setSource}
        onPositionTitleChange={setPositionTitle}
        onLocationChange={setLocation}
        onSalaryMinChange={setSalaryMin}
        onSalaryMaxChange={setSalaryMax}
        onNoteChange={setNote}
        onClose={closeFormDialog}
        onSave={handleSaveApplication}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Application"
        itemType="application"
        itemName={selectedApplication?.positionTitle}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteApplication}
      />
    </Box>
  );
}
