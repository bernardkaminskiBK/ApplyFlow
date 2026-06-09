import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import type { Company } from "../../types/company/company";
import CompanyFormDialog from "../../components/companies/CompanyFormDialog";
import type { CompanyFormErrors } from "../../types/company/companyFormErrors";
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
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../../api/companiesApi";
import SearchField from "../../components/common/SearchField";
import PageHeader from "../../components/common/PageHeader";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [errors, setErrors] = useState<CompanyFormErrors>({});

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [note, setNote] = useState("");

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  const filteredCompanies = companies.filter((company) =>
    `${company.name ?? ""} ${company.city ?? ""} ${company.website ?? ""} ${company.note ?? ""}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    const data = await getCompanies();
    setCompanies(data);
  }

  function resetForm() {
    setName("");
    setCity("");
    setWebsite("");
    setNote("");
    setErrors({});
  }

  function openCreateDialog() {
    setEditingCompany(null);
    resetForm();
    setIsFormDialogOpen(true);
  }

  function openEditDialog(company: Company) {
    setEditingCompany(company);

    setName(company.name);
    setCity(company.city || "");
    setWebsite(company.website || "");
    setNote(company.note || "");
    setErrors({});

    setIsFormDialogOpen(true);
  }

  function closeFormDialog() {
    setIsFormDialogOpen(false);
    setEditingCompany(null);
    resetForm();
  }

  async function handleSaveCompany() {
    try {
      setErrors({});

      const request = {
        name,
        city,
        website,
        note,
      };

      if (editingCompany) {
        await updateCompany(editingCompany.id, request);
      } else {
        await createCompany(request);
      }

      await loadCompanies();

      closeFormDialog();
    } catch (error: any) {
      const validationErrors = error.response?.data?.errors;

      setErrors({
        name: validationErrors?.Name?.[0],
        city: validationErrors?.City?.[0],
        website: validationErrors?.Website?.[0],
        note: validationErrors?.Note?.[0],
      });
    }
  }

  async function handleDeleteCompany() {
    if (!selectedCompany) {
      return;
    }

    await deleteCompany(selectedCompany.id);

    await loadCompanies();

    setIsDeleteDialogOpen(false);
    setSelectedCompany(null);
  }

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Website</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Note</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Link to={`/companies/${company.id}`}>{company.name}</Link>
                </TableCell>
                <TableCell>{company.city}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {company.website}
                </TableCell>
                <TableCell>{company.note}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => openEditDialog(company)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setSelectedCompany(company);
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

      <CompanyFormDialog
        open={isFormDialogOpen}
        title={editingCompany ? "Edit Company" : "Add Company"}
        name={name}
        city={city}
        website={website}
        note={note}
        errors={errors}
        onNameChange={setName}
        onCityChange={setCity}
        onWebsiteChange={setWebsite}
        onNoteChange={setNote}
        onClose={closeFormDialog}
        onSave={handleSaveCompany}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title="Delete Company"
        itemType="company"
        itemName={selectedCompany?.name}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteCompany}
      />
    </Box>
  );
}
