import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const Patination = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      <Pagination
        count={10}
        color="primary"
        shape="rounded"
        size="large"
        hidePrevButton
        sx={{ py: "30px" }}
      />
    </Box>
  );
};

export default Patination;
