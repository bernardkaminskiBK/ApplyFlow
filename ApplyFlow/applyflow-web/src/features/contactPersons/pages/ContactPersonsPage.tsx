import { useEffect, useState } from "react";
import { useContactPersonDeleteDialog } from "../hooks/useContactPersonDeleteDialog";
import { useContactPersonDialog } from "../hooks/useContactPersonDialog";
import { useContactPersons } from "../hooks/useContactPersons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDeleteDialog from "../../../components/common/ConfirmDeleteDialog";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import PageHeader from "../../../components/common/PageHeader";
import SearchField from "../../../components/common/SearchField";
import SuccessSnackbar from "../../../components/common/SuccessSnackbar";
import ContactPersonFormDialog from "../components/ContactPersonFormDialog";
import { createContactPersonColumns } from "../grid/contactColumns";

export default function ContactPersonsPage() {
  const {
    contactPersons,
    loading,
    error,
    successMessage,
    loadContactPersons,
    saveContactPerson,
    removeContactPerson,
    clearError,
    clearSuccessMessage,
  } = useContactPersons();

  const {
    errors,
    form,
    editingContact,
    isFormDialogOpen,
    updateForm,
    setErrors,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  } = useContactPersonDialog();

  const {
    selectedContact,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
  } = useContactPersonDeleteDialog();

  const [searchText, setSearchText] = useState("");
  const filteredContacts = contactPersons.filter((contact) =>
    `${contact.companyName ?? ""} ${contact.name ?? ""} ${contact.position ?? ""} ${contact.email ?? ""} ${contact.phoneNumber ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  async function handleSaveContact() {
    await saveContactPerson(form, editingContact, setErrors, closeFormDialog);
  }

  async function handleDeleteContact() {
    await removeContactPerson(selectedContact, closeDeleteDialog);
  }

  useEffect(() => {
    loadContactPersons();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Contact Persons"
        buttonText="Add Contact"
        onButtonClick={openCreateDialog}
      />

      <SearchField
        label="Search Contacts"
        value={searchText}
        onChange={setSearchText}
      />

      <DataGrid
        rows={filteredContacts}
        columns={createContactPersonColumns(openEditDialog, openDeleteDialog)}
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

      <ContactPersonFormDialog
        open={isFormDialogOpen}
        title={editingContact ? "Edit Contact" : "Add Contact"}
        form={form}
        errors={errors}
        onChange={updateForm}
        onClose={closeFormDialog}
        onSave={handleSaveContact}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Contact"
        itemType="contact"
        itemName={selectedContact?.name}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteContact}
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
