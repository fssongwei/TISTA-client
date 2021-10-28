import * as React from "react";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import history from "../../utils/history";

interface Record {
  id: string;
  record: string;
  report: string;
  chance: string;
  status: string;
}

const columns = [
  {
    field: "record",
    headerName: "Records",
    type: "string",
    flex: 1,
    filterable: false,
  },
  {
    field: "report",
    headerName: "Report",
    flex: 1,
    type: "string",
    filterable: false,
  },
  {
    field: "chance",
    headerName: "Chance of Fraud",
    flex: 1,
    type: "string",
    filterable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    type: "singleSelect",
    valueOptions: ["open", "closed"],
  },
];
const fetchRecord = (patientId: string): Promise<Record[]> => {
  return new Promise<Record[]>((resolve) => {
    setTimeout(() => {
      let newData: Record[] = [];
      for (let i = 0; i < 3; i++) {
        newData.push({
          id: (i + 1).toString(),
          record: `some record name`,
          report: `some report name`,
          chance: `${Math.floor(Math.random() * 100)}%`,
          status: Math.random() < 0.5 ? "open" : "closed",
        });
      }
      resolve(newData);
    }, Math.random() * 500 + 100); // simulate network latency
  });
};

export default function PatientTable({ patientId }: { patientId: string }) {
  const ROWS_PER_PAGE = 10;
  const [rows, setRows] = React.useState<Record[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const newRows = await fetchRecord(patientId);
      setRows(newRows);
      setLoading(false);
    })();
  }, [patientId]);

  return (
    <div style={{ flex: 1, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterSelectedRowCount={true}
        pageSize={ROWS_PER_PAGE}
        rowsPerPageOptions={[10]}
        rowCount={3}
        paginationMode="server"
        loading={loading}
        checkboxSelection={true}
        // onRowClick={(params) => {
        //   history.push(`/patient/${params.row.id}`);
        // }}
      />
    </div>
  );
}
