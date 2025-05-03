import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const BarChartReport = () => {
  
  return (
  
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C","bar D"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3,4],
          },
        ]}
        width={600}
        height={300}
      />
  );
};

export default BarChartReport;
