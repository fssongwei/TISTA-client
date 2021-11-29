import * as React from "react";
import Box from "@mui/material/Box";
import "./Filter.scss";
import DateRangePicker from "../../Components/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";

import Chip from "@mui/material/Chip";
import moment from "moment";

import Selector from "../../Components/Selector";

const status = ["Normal", "Reviewing", "Inactive"];
const reviewers = ["ReviewerA", "ReviewerB", "ReviewerC"];

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* <Selector
          selectedItem={selectedReviewers}
          setSelectedItem={setSelectedReviewers}
          options={reviewers}
          label="Reviewer"
          sx={{ mr: "17px" }}
        /> */}
        <DateRangePicker
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
        <Selector
          selectedItem={selectedStatus}
          setSelectedItem={setSelectedStatus}
          options={status}
          label="Status"
          sx={{ ml: "17px" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "10px" }}>
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
        justifyContent: "flex-start",
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
        justifyContent: "flex-start",
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
