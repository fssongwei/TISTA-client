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
    <Container
      sx={{
        pt: "60px",
        display: "flex",
        flexDirection: "column",
        flex: "1",
        justifyContent: "space-between",
      }}
      maxWidth="lg"
      style={{ height: "100%" }}
      className="patient-database"
    >
      <Box sx={{ mb: "20px" }}>
        <Box>
          <Search search={search} setSearch={setSearch} />
        </Box>
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
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          className="title"
          sx={{ mb: "30px" }}
        >
          Patient Database
        </Typography>
        <PatientTable loading={loading} tableData={tableData} />
        <Box sx={{ display: "flex", justifyContent: "right" }}>
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
              // hidePrevButton
              sx={{ py: "30px" }}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
