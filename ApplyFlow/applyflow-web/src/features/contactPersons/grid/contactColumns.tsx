import { Button, Stack } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { ContactPerson } from "../models/contactPerson";
import AppLink from "../../../components/common/AppLink";

export function createContactPersonColumns(
  onEdit: (contact: ContactPerson) => void,
  onDelete: (contact: ContactPerson) => void,
): GridColDef<ContactPerson>[] {
  return [
    {
      field: "companyName",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <AppLink to={`/contact-persons/${params.row.id}`}>
          {params.row.name}
        </AppLink>
      ),
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => onEdit(params.row)}>
            Edit
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => onDelete(params.row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];
}
