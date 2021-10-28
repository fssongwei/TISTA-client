import * as React from "react";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import history from "../../utils/history";

interface PatientData {
  id: string;
  name: string;
  update: Date;
  status: string;
}

const columns = [
  { field: "id", headerName: "Patient ID", flex: 1, filterable: false },
  {
    field: "name",
    headerName: "Patient Name",
    type: "string",
    flex: 1,
    filterable: false,
  },
  {
    field: "update",
    headerName: "Updated Date",
    flex: 1,
    type: "date",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    type: "singleSelect",
    valueOptions: ["open", "closed"],
  },
];
const loadServerRows = (
  page?: number,
  pageSize?: number,
  search?: string
): Promise<any> => {
  return new Promise<PatientData[]>((resolve) => {
    setTimeout(() => {
      let newData: PatientData[] = [];
      for (let i = 0; i < (pageSize || 10); i++) {
        newData.push({
          id: ((page || 0) * 10 + i).toString(),
          name: `John Doe ${search || ""}`,
          update: new Date(),
          status: Math.random() < 0.5 ? "open" : "closed",
        });
      }
      resolve(newData);
    }, Math.random() * 500 + 100); // simulate network latency
  });
};

export default function PatientTable({ search }: { search: string }) {
  const ROWS_PER_PAGE = 10;
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<PatientData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  //   const [filterValue, setFilterValue] = React.useState<string | undefined>();

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page, 10, search);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, search]);

  return (
    <div style={{ flex: 1, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterSelectedRowCount={true}
        pageSize={ROWS_PER_PAGE}
        rowsPerPageOptions={[10]}
        rowCount={100}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        page={page}
        loading={loading}
        onRowClick={(params) => {
          history.push(`/patient/${params.row.id}`);
        }}
        // filterMode="server"
        // filterModel={filterModel}
        // onFilterModelChange={(model) => setFilterModel(model)}
      />
    </div>
  );
}
