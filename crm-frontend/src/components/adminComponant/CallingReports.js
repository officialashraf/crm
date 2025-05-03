import React, { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { BarChart } from "recharts";
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d62728",
  "#17becf",
  "#e377c2",
  "#ff7f0e",
];

const CallingReport = () => {
  const [reportData, setReportData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      if (!selectedDate || !selectedEmployee) return;

      try {
        const formattedDay = selectedDate.format("D"); // Extract day (without leading zero)
        const formattedMonth = selectedDate.format("M"); // Extract month
        const formattedYear = selectedDate.format("YYYY"); // Extract year

        const apiUrl = `http://localhost:5000/leads/report/${encodeURIComponent(
          selectedEmployee
        )}/${formattedDay}/${formattedMonth}/${formattedYear}`;

        console.log("Fetching API:", apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          setReportData(data);
        } else {
          setReportData(null);
          console.warn("No data found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching report:", error);
        setReportData(null);
      }
    };

    fetchReport();
  }, [selectedDate, selectedEmployee]);

  return (
    <div className="container mt-4">
    {/* Selection Section */}
    <div className="row">
      <div className="col-12 col-md-6 mb-3">
        <div className="p-3 border rounded bg-light">
          <label className="fw-bold">Select Date:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month", "day"]}
              value={selectedDate}
              onChange={setSelectedDate}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="col-12 col-md-6 mb-3">
        <div className="p-3 border rounded bg-light">
          <label className="fw-bold">Select Employee:</label>
          <select
            className="form-select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            <option>Nafeesh Kurreshi</option>
            <option>Ashraf Shekh</option>
            <option>Aneesh Kurreshi</option>
          </select>
        </div>
      </div>
    </div>

    {/* Charts Section */}
    <div className="row">
      {/* Pie Chart */}
      <div className="col-12 col-md-6 mb-3">
        <div className="p-3 border rounded bg-light">
          <h5 className="text-center">Call Report</h5>
          {reportData ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Total Calls", value: reportData.totalCalls },
                    { name: "Call Picked Up", value: reportData.callPickedUp },
                    { name: "Call Not Picked Up", value: reportData.callNotPickedUp },
                    { name: "Follow-Up Scheduled", value: reportData.followUpScheduled },
                    { name: "Interested", value: reportData.interested },
                    { name: "Not Interested", value: reportData.notInterested },
                    { name: "Meetings Scheduled", value: reportData.meetingScheduled },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted">No Data Available</p>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="col-12 col-md-6 mb-3">
        <div className="p-3 border rounded bg-light">
          <h5 className="text-center">Deal Report</h5>
          {reportData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Total Quotation", value: reportData.totalDeals || 0 },
                  { name: "Deal Won", value: reportData.dealWon || 0 },
                  { name: "Deal Lost", value: reportData.dealLost || 0 },
                  { name: "Negotiation", value: reportData.negotiation || 0 },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted">No Data Available</p>
          )}
        </div>
      </div>
    </div>

    {/* Summary Data */}
    {reportData && (
      <div className="row">
        {[
          { label: "Total Quotation", value: reportData.totalDeals },
          { label: "Deal Won", value: reportData.dealWon },
          { label: "Deal Lost", value: reportData.dealLost },
          { label: "Negotiation", value: reportData.negotiation },
        ].map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3 p-2">
            <div className="p-2 border rounded bg-light text-center">
              <strong>{item.label}:</strong> {item.value}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  
  );
};

export default CallingReport;
