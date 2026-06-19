import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "../../../components/common/PageHeader";
import SearchField from "../../../components/common/SearchField";
import CompanyFormDialog from "../components/CompanyFormDialog";
import { useCompanyDialog } from "../hooks/useCompanyDialog";
import { createCompanyColumns } from "../grid/companyColumns";
import ConfirmDeleteDialog from "../../../components/common/ConfirmDeleteDialog";
import { useCompanies } from "../hooks/useCompanies";
import { useCompanyDeleteDialog } from "../hooks/useCompanyDeleteDialog";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import SuccessSnackbar from "../../../components/common/SuccessSnackbar";

export default function CompaniesPage() {
  const {
    companies,
    loading,
    error,
    successMessage,
    loadCompanies,
    saveCompany,
    removeCompany,
    clearError,
    clearSuccessMessage,
  } = useCompanies();

  const {
    errors,
    form,
    editingCompany,
    isFormDialogOpen,
    updateForm,
    setErrors,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  } = useCompanyDialog();

  const {
    selectedCompany,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  } = useCompanyDeleteDialog();

  const [searchText, setSearchText] = useState("");
  const filteredCompanies = companies.filter((company) =>
    `${company.name ?? ""} ${company.city ?? ""} ${company.website ?? ""} ${company.note ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  const columns = createCompanyColumns(openEditDialog, openDeleteDialog);

  async function handleSaveCompany() {
    await saveCompany(form, editingCompany, setErrors, closeFormDialog);
  }

  async function handleDeleteCompany() {
    await removeCompany(selectedCompany, closeDeleteDialog);
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Companies"
        buttonText="Add Company"
        onButtonClick={openCreateDialog}
      />

      <SearchField
        label="Search Companies"
        value={searchText}
        onChange={setSearchText}
      />

      <DataGrid
        rows={filteredCompanies}
        columns={columns}
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

      <CompanyFormDialog
        open={isFormDialogOpen}
        title={editingCompany ? "Edit Company" : "Add Company"}
        form={form}
        errors={errors}
        onChange={updateForm}
        onClose={closeFormDialog}
        onSave={handleSaveCompany}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Company"
        itemType="company"
        itemName={selectedCompany?.name}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteCompany}
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
