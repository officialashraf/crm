import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomPagination = ({ page, totalPages, onPageChange, pageSize, totalRows }) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalRows);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ mt: 2 }}>
      {/* ✅ Pagination Info (Like Image) */}
      <Typography variant="body1">
        {start}-{end} / {totalRows}
      </Typography>

      {/* ✅ Previous Button */}
      <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* ✅ Next Button */}
      <IconButton onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;
