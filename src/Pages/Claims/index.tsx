import * as React from "react";
import Container from "@mui/material/Container";
import Search from "../PatientDatabase/Search";
import Filter from "../PatientDatabase/Filter";
// import PatientTable from "./PatientTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./index.scss";
import Pagination from "@mui/material/Pagination";
import fetchData, { Query, TableData } from "./fetchData";
import ClaimTable from "./ClaimTable";
import Grid from "@mui/material/Grid";
import { boxSizing } from "@mui/system";
// import PatientPanel from "./PatientPanel";

export default function Claims() {
  const [search, setSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [tableData, setTableData] = React.useState<TableData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetch = async () => {
    setLoading(true);
    let query: Query = {};
    if (search) query.search = search;
    if (selectedStatus.length > 0) query.status = selectedStatus;
    if (selectedLevel.length > 0) query.status = selectedLevel;
    query.page = currentPage;
    const data = await fetchData(query);

    const { tableData, pagerData } = data;

    setTableData(tableData);
    setTotalPage(pagerData.totalPage);
    setLoading(false);
  };

  React.useEffect(() => {
    setCurrentPage(1);
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedStatus, selectedLevel]);

  React.useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Box
      className="patient-database"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1",
        justifyContent: "space-between",
        px: "30px",
        maxWidth: "2000px",
      }}
      style={{ height: "100%" }}
    >
      <Box sx={{ mb: "20px", pt: "30px" }}>
        <Box>
          <Search search={search} setSearch={setSearch} />
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          className="title"
          sx={{ mt: "40px", ml: "15px" }}
        >
          Claims
        </Typography>
        {/* <Filter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          /> */}
      </Box>
      <Box sx={{ mb: "20px" }}>
        <ClaimTable loading={loading} tableData={tableData} />
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
    </Box>
  );
}
