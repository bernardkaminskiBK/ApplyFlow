import { Button, Chip, Stack } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import type { JobApplication } from "../models/jobApplication";
import { Link } from "react-router-dom";
import {
  getSourceText,
  getStatusInfo,
  getWorkModeText,
} from "../utils/jobApplicationHelpers";

export function createJobApplicationColumns(
  onEdit: (jobApplication: JobApplication) => void,
  onDelete: (jobApplication: JobApplication) => void,
): GridColDef<JobApplication>[] {
  return [
    {
      field: "companyName",
      headerName: "Company",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/job-applications/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "positionTitle",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (_value, row) => getStatusInfo(row.status).text,
      renderCell: (params) => (
        <Chip
          label={getStatusInfo(params.row.status).text}
          color={getStatusInfo(params.row.status).color}
          variant="filled"
        />
      ),
    },
    {
      field: "workMode",
      headerName: "Work Mode",
      flex: 1,
      valueGetter: (_value, row) => getWorkModeText(row.workMode),
      renderCell: (params) => <i>{getWorkModeText(params.row.workMode)}</i>,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      valueGetter: (_value, row) => getSourceText(row.source),
      renderCell: (params) => (
        <strong>{getSourceText(params.row.source)}</strong>
      ),
    },
    {
      field: "appliedDate",
      headerName: "Applied Date",
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
