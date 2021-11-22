import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const Search = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchTerm, setSearchTerm] = React.useState(search);

  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "center" }}
      style={{ minWidth: "500px", width: "50%" }}
    >
      <InputBase
        sx={{ flex: 1, px: " 15px" }}
        style={{
          border: "1px solid #8F8F8F",
          borderRadius: "10px",
          height: "50px",
        }}
        placeholder="Search Patient"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <IconButton
        type="submit"
        sx={{ ml: "15px" }}
        aria-label="search"
        style={buttonStyle}
        onClick={(event) => {
          event.preventDefault();
          console.log(searchTerm);
          setSearch(searchTerm);
        }}
      >
        <SearchIcon sx={{ fontSize: 28 }} />
      </IconButton>
    </Box>
  );
};

const buttonStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "15px",
  background: "#4861AD",
  color: "white",
};

export default Search;
