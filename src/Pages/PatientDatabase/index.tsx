import * as React from "react";
import Container from "@mui/material/Container";
import Search from "./Search";
import Filter from "./Filter";
import PatientTable from "./PatientTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DateRange } from "@mui/lab/DateRangePicker";
import "./index.scss";
import Pagination from "@mui/material/Pagination";
import fetchData, { Query, TableData } from "./fetchData";
import Grid from "@mui/material/Grid";
import PatientPanel from "./PatientPanel";

export default function PatientDatabase() {
  const [search, setSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const [selectedReviewers, setSelectedReviewers] = React.useState<string[]>(
    []
  );
  const [selectedDates, setSelectedDates] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [tableData, setTableData] = React.useState<TableData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedPatientId, setSelectedPatientId] = React.useState<
    string | null
  >(null);

  const selectedPatient = (id: string) => {
    setSelectedPatientId(id);
  };

  const fetch = async () => {
    setLoading(true);
    let query: Query = {};
    if (search) query.search = search;
    if (selectedStatus.length > 0) query.status = selectedStatus;
    if (selectedReviewers.length > 0) query.status = selectedReviewers;
    if (selectedDates[0] && selectedDates[1]) {
      query.startDate = selectedDates[0];
      query.endDate = selectedDates[1];
    }
    query.page = currentPage;
    const data = await fetchData(query);

    const { tableData, pagerData } = data;
    setTableData(tableData);
    setTotalPage(pagerData.totalPage);
    setLoading(false);
  };

  React.useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedStatus, selectedReviewers, currentPage]);

  React.useEffect(() => {
    if (
      (selectedDates[0] && selectedDates[1]) ||
      (!selectedDates[0] && !selectedDates[1])
    )
      fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  return (
    <Grid
      container
      className="patient-database"
      maxWidth="lg"
      style={{ height: "100%", maxWidth: "2000px" }}
      sx={{ pt: "30px", px: "30px" }}
    >
      <Grid
        item
        xs={9}
        sx={{
          // mt: "30px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          justifyContent: "space-between",
          mr: "26px",
        }}
        style={{ height: "100%" }}
      >
        <Box sx={{ mb: "20px" }}>
          <Box>
            <Search search={search} setSearch={setSearch} />
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            className="title"
            sx={{ mt: "30px", ml: "15px" }}
          >
            Patients
          </Typography>
          <Filter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedReviewers={selectedReviewers}
            setSelectedReviewers={setSelectedReviewers}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </Box>
        <Box sx={{ mb: "20px" }}>
          <PatientTable
            loading={loading}
            tableData={tableData}
            selectedPatient={selectedPatient}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {totalPage === 0 ? (
              <Box sx={{ height: "100px" }}></Box>
            ) : (
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={(event, value) => {
                  setCurrentPage(value);
                }}
                color="primary"
                shape="rounded"
                size="large"
                sx={{ py: "30px" }}
              />
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          pb: "50px",
          pt: "100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PatientPanel patientId={selectedPatientId} />
      </Grid>
    </Grid>
  );
}
