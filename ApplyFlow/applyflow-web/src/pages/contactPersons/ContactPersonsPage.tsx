import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ContactPerson } from "../../types/contactPerson/contactPerson";
import type { Company } from "../../features/companies/models/company";
import type { ContactPersonFormErrors } from "../../types/contactPerson/ContactPersonFormErrors";
import {
  createContactPerson,
  deleteContactPerson,
  getContactPersons,
  updateContactPerson,
} from "../../api/contactPersonsApi";
import PageHeader from "../../components/common/PageHeader";
import SearchField from "../../components/common/SearchField";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import ContactPersonFormDialog from "../../components/contactPersons/ContactPersonFormDialog";
import { getCompanies } from "../../api/companiesApi";

export default function ContactPersonsPage() {
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [searchText, setSearchText] = useState("");
  const [errors, setErrors] = useState<ContactPersonFormErrors>({});

  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedContact, setSelectedContact] = useState<ContactPerson | null>(
    null,
  );
  const [editingContact, setEditingContact] = useState<ContactPerson | null>(
    null,
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.companyName ?? ""} ${contact.name ?? ""} ${contact.position ?? ""} ${contact.email ?? ""} ${contact.phoneNumber ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    loadContacts();
    loadCompanies();
  }, []);

  async function loadContacts() {
    const data = await getContactPersons();
    setContacts(data);
  }

  async function loadCompanies() {
    const data = await getCompanies();
    setCompanies(data);
  }

  function resetForm() {
    setCompanyId("");
    setName("");
    setPosition("");
    setEmail("");
    setPhoneNumber("");
    setErrors({});
  }

  function openCreateDialog() {
    setEditingContact(null);
    resetForm();
    setIsFormDialogOpen(true);
  }

  function openEditDialog(contact: ContactPerson) {
    setEditingContact(contact);

    setCompanyId(contact.companyId.toString());
    setName(contact.name);
    setPosition(contact.position || "");
    setEmail(contact.email || "");
    setPhoneNumber(contact.phoneNumber || "");
    setErrors({});

    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingContact(null);
    resetForm();
  }

  async function handleSaveContact() {
    try {
      setErrors({});

      const request = {
        companyId: Number(companyId),
        name,
        position,
        email,
        phoneNumber,
      };

      if (editingContact) {
        await updateContactPerson(editingContact.id, request);
      } else {
        await createContactPerson(request);
      }

      await loadContacts();
      closeFormDialog();
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      setErrors({
        companyId: validationErrors?.CompanyId?.[0],
        name: validationErrors?.Name?.[0],
        position: validationErrors?.Position?.[0],
        email: validationErrors?.Email?.[0],
        phone: validationErrors?.Phone?.[0],
      });
    }
  }

  async function handleDeleteContact() {
    if (!selectedContact) return;

    await deleteContactPerson(selectedContact.id);
    await loadContacts();

    setIsDeleteDialogOpen(false);
    setSelectedContact(null);
  }

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.companyName}</TableCell>
                <TableCell>
                  <Link to={`/contact-persons/${contact.id}`}>
                    {contact.name}
                  </Link>
                </TableCell>
                <TableCell>{contact.position}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditDialog(contact)}
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setSelectedContact(contact);
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

      <ContactPersonFormDialog
        open={isFormDialogOpen}
        title={editingContact ? "Edit Contact" : "Add Contact"}
        companies={companies}
        companyId={companyId}
        name={name}
        position={position}
        email={email}
        phone={phoneNumber}
        errors={errors}
        onCompanyIdChange={setCompanyId}
        onNameChange={setName}
        onPositionChange={setPosition}
        onEmailChange={setEmail}
        onPhoneChange={setPhoneNumber}
        onClose={closeFormDialog}
        onSave={handleSaveContact}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Contact"
        itemType="contact"
        itemName={selectedContact?.name}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteContact}
      />
    </Box>
  );
}
