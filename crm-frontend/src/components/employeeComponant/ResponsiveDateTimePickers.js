import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export const ResponsiveDateTimePickers = ({ onChange, value, newDates }) => {
  const minDateTime = dayjs(newDates);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            label="Follow Date & Time"
            value={value}
            onChange={onChange}
            renderInput={(props) => <input {...props} />}
            minDateTime={minDateTime}
          />


      </LocalizationProvider>
    </>
  );
};
