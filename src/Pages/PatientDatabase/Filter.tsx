import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./Filter.scss";
import DateRangePicker from "../../Components/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";

import Chip from "@mui/material/Chip";
import moment from "moment";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 160,
    },
  },
};

const status = ["Normal", "Reviewing", "Fraud"];
const reviewers = ["ReviewerA", "ReviewerB", "ReviewerC"];

const Selector = ({
  options,
  selectedItem,
  setSelectedItem,
  label,
}: {
  options: string[];
  selectedItem: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedItem>) => {
    const {
      target: { value },
    } = event;
    setSelectedItem(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ mr: "50px", width: 160 }}>
        <Select
          multiple
          value={selectedItem}
          onChange={handleChange}
          renderValue={(selected) => label}
          MenuProps={MenuProps}
          displayEmpty
          variant="standard"
          sx={{ height: "40px", border: "none", m: "0" }}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name} sx={{ height: "40px" }}>
              <Checkbox checked={selectedItem.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default function Filter({
  selectedStatus,
  setSelectedStatus,
  selectedReviewers,
  setSelectedReviewers,
  selectedDates,
  setSelectedDates,
}: {
  selectedStatus: string[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  selectedReviewers: string[];
  setSelectedReviewers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDates: DateRange<Date>;
  setSelectedDates: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
}) {
  return (
    <Box className="filter">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Selector
          selectedItem={selectedStatus}
          setSelectedItem={setSelectedStatus}
          options={status}
          label="Status"
        />
        <Selector
          selectedItem={selectedReviewers}
          setSelectedItem={setSelectedReviewers}
          options={reviewers}
          label="Reviewer"
        />
        <DateRangePicker
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Tags
          selectedItem={selectedStatus}
          setSelectedItem={setSelectedStatus}
        />
        <Tags
          selectedItem={selectedReviewers}
          setSelectedItem={setSelectedReviewers}
        />
        <DateTag
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </Box>
    </Box>
  );
}

const DateTag = ({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates: DateRange<Date>;
  setSelectedDates: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
}) => {
  const handleDelete = () => () => {
    setSelectedDates([null, null]);
  };

  if (!selectedDates[0] || !selectedDates[1]) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <Chip
        label={`${moment(selectedDates[0]).format("MM/DD/YYYY")} - ${moment(
          selectedDates[1]
        ).format("MM/DD/YYYY")}`}
        onDelete={handleDelete()}
        sx={{
          background: "#4861AD",
          color: "white",
          fontSize: "20px",
          p: "10px 0px",
          height: "40px",
          mr: "10px",
        }}
      />
    </Box>
  );
};

const Tags = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleDelete = (itemToDelete: string) => () => {
    setSelectedItem((items) => items.filter((item) => item !== itemToDelete));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      {selectedItem.map((item) => {
        return (
          <Chip
            label={item}
            onDelete={handleDelete(item)}
            sx={{
              background: "#4861AD",
              color: "white",
              fontSize: "20px",
              p: "10px 0px",
              height: "40px",
              mr: "10px",
            }}
            key={item}
          />
        );
      })}
    </Box>
  );
};
