import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

function PieCenterLabel({ children }) {
  const { width, height, left,top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

const PieChartReport = () => {
  const data = [
    { value: 5, label: "A" },
    { value: 10, label: "B" },
    { value: 15, label: "C" },
    { value: 20, label: "D" },
  ];

  const size = {
    width: 600,
    height: 250,
  };

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        direction: "row",
        position: { vertical: "bottom", horizontal: "middle" },
        padding: 0,
      }}
    >
      <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>Calling</PieCenterLabel>
      </PieChart>
    </div>
  );
};

export default PieChartReport;
