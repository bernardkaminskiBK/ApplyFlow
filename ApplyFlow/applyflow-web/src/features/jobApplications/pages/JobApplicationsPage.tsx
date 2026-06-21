import { useEffect, useState } from "react";
import ConfirmDeleteDialog from "../../../components/common/ConfirmDeleteDialog";
import JobApplicationFormDialog from "../components/JobApplicationFormDialog";
import SearchField from "../../../components/common/SearchField";
import { Box } from "@mui/material";
import PageHeader from "../../../components/common/PageHeader";
import { useJobApplications } from "../hooks/useJobApplications";
import { useJobApplicationDialog } from "../hooks/useJobApplicationDialog";
import { useJobApplicationDeleteDialog } from "../hooks/useJobApplicationDeleteDialog";
import { DataGrid } from "@mui/x-data-grid";
import { createJobApplicationColumns } from "../grid/jobApplicationColumns";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import SuccessSnackbar from "../../../components/common/SuccessSnackbar";

export default function JobApplicationsPage() {
  const {
    jobApplications,
    loading,
    error,
    successMessage,
    loadJobApplications,
    saveJobApplication,
    removeJobApplication,
    clearError,
    clearSuccessMessage,
  } = useJobApplications();

  const {
    errors,
    form,
    editingApplication,
    isFormDialogOpen,
    updateForm,
    setErrors,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  } = useJobApplicationDialog();

  const {
    selectedApplication,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  } = useJobApplicationDeleteDialog();

  const [searchText, setSearchText] = useState("");
  const filteredApplications = jobApplications.filter((jobApplication) =>
    `${jobApplication.companyName ?? ""} ${jobApplication.positionTitle ?? ""} ${jobApplication.appliedDate ?? ""} ${jobApplication.location ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  async function handleSaveApplication() {
    await saveJobApplication(
      form,
      editingApplication,
      setErrors,
      closeFormDialog,
    );
  }

  async function handleDeleteApplication() {
    await removeJobApplication(selectedApplication, closeDeleteDialog);
  }

  useEffect(() => {
    loadJobApplications();
  }, []);

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

      <DataGrid
        rows={filteredApplications}
        columns={createJobApplicationColumns(openEditDialog, openDeleteDialog)}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell[data-field='actions']": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />

      <JobApplicationFormDialog
        open={isFormDialogOpen}
        title={editingApplication ? "Edit Application" : "Add Application"}
        form={form}
        errors={errors}
        onChange={updateForm}
        onClose={closeFormDialog}
        onSave={handleSaveApplication}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Application"
        itemType="application"
        itemName={selectedApplication?.positionTitle}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteApplication}
      />

      <ErrorSnackbar
        open={Boolean(error)}
        message={error}
        onClose={clearError}
      />

      <SuccessSnackbar
        open={Boolean(successMessage)}
        message={successMessage}
        onClose={clearSuccessMessage}
      />
    </Box>
  );
}
