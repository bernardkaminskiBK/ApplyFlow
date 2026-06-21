import { Button, Stack } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { Company } from "../models/company";
import { Link } from "react-router-dom";

export function createCompanyColumns(
  onEdit: (company: Company) => void,
  onDelete: (company: Company) => void,
): GridColDef<Company>[] {
  return [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/companies/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Note",
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
          <Button
            size="small"
            variant="outlined"
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            size="small"
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
