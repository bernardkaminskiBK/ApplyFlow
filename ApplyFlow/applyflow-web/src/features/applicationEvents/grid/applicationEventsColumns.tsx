import { Button, Chip, Stack } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import type { ApplicationEvent } from "../models/applicationEvent";
import { getEventTypeText } from "../utils/applicationEventHelpers";

export function createApplicationEventColumns(
  onEdit: (event: ApplicationEvent) => void,
  onDelete: (event: ApplicationEvent) => void,
): GridColDef<ApplicationEvent>[] {
  return [
    {
      field: "companyName",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "positionTitle",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "eventType",
      headerName: "Event Type",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/application-events/${params.row.id}`}>
          <Chip label={getEventTypeText(params.row.eventType)} size="small" />
        </Link>
      ),
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      flex: 1,
      renderCell: (params) => <strong>{params.row.eventDate}</strong>,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
