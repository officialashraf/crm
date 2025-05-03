import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import API_URL from "../../utils/API_URL";
import { updateEmployee } from "../../redux/slice/EmployeSlice/EmployeeDataSlice"; // Redux action
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack"
import FormControlLabel from "@mui/material/FormControlLabel";

import CommentFormModal from "./CommentFormModal ";
import {
  setBShow,
  setBTarget,
  setUserId,
} from "../../redux/slice/EmployeSlice/ModalSlice";
import {
  setCShow,
  setTableId,
  setCTarget,
  setHandleClose,
} from "../../redux/slice/EmployeSlice/ModalTableSlice";
import CommentsTable from "./CommentsTable";
import {
  setQuotationShow,
  setQuotationId,
} from "../../redux/slice/EmployeSlice/QuotationSlice";
import {
  setMeetingDateShow,
  setMeetingDateId,
} from "../../redux/slice/EmployeSlice/MeetingDateSlice";

import SendTableQuotation from "./SendTableQuotation";
import SendTableMeetingDate from "./SendTableMeetingDate";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Pagination, PaginationItem } from "@mui/material";
import CustomPagination from "./CustomPagination";
import NavbarTable from "./NavbarTable";
import { Button } from "react-bootstrap";
import { useEffect } from "react";


const HeaderSettings = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
}));

const DataTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.employeedata); // Redux state data
  const [newData, setNewData] = useState(data); // Local state for UI updates
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    mobile_number: true,
    comments: true,
    followDate: true,
    quotation: true,
    meeting_time: true,
    email: true,
    city: true,
    sector: true,
    address: true,
    stage: true,
    source: true,
  });
  // Menu State

  const [anchorEl, setAnchorEl] = useState(null);

  // Open Menu
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Toggle Column Visibility
  const toggleColumnVisibility = (field) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  // Function to handle row updates
  const handleRowUpdate = async (newRow, oldRow) => {
    try {
      //      // ✅ Email validation (Check for '@' and a valid format)
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailRegex.test(newRow.email)) {
      //   alert("Invalid email format. Please enter a valid email.");
      //   return oldRow; // Revert UI changes
      // }

      // ✅ Mobile number validation (Only 10 digits)
      // const mobileRegex = /^[0-9]{10}$/;
      // if (!mobileRegex.test(newRow.mobile_number)) {
      //   alert("Mobile number must be exactly 10 digits.");
      //   return oldRow; // Revert UI changes
      // }
      const updatedFields = {
        name: newRow.name,
        mobile_number: newRow.mobile_number,
        email: newRow.email,
        city: newRow.city,
        sector: newRow.sector,
        address: newRow.address,
        stage: newRow.stage,
        source: newRow.source,
        asign: newRow.asign || "", // ✅ Ensure asign is included (required in backend)
      };

      const response = await axios.put(
        `http://localhost:5000/leads/${newRow._id}`, // ✅ Correct API endpoint
        updatedFields, // ✅ Send only necessary fields
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // ✅ Update local state
        setNewData((prevData) =>
          prevData.map((row) => (row._id === newRow._id ? newRow : row))
        );

        dispatch(updateEmployee({ userId: newRow._id, newRow }));

        return newRow;
      }

      throw new Error("Failed to update");
    } catch (error) {
      console.error(
        "Error updating row:",
        error.response?.data || error.message
      );
      return oldRow;
    }
  };
  const columns = [
    { field: "id", headerName: "S.No",width: 70,resizable: true, },
    columnVisibility.name && { field: "name", headerName: "Name",  width: 150,editable: true,resizable: true, },
    columnVisibility.mobile_number && {
      field: "mobile_number",
      headerName: "Mobile No.",
      width: 150,
      editable: true,
      resizable: true,
    },
    columnVisibility.comments &&{
      field: "comments",
      headerName: "Comments",
      width: 150,
      sortable: false,
      resizable: true,
      renderCell: ({ row }) =>(
        // <Tooltip
          // title={<CommentsTable comments={row.comments} />}
          // arrow
          
        // >

        <p
        onMouseOver={(event) => {
          dispatch(setCShow(true));
          dispatch(setBShow(false))
          dispatch(setTableId(row._id));
          dispatch(setCTarget(event.target));
        }}
        // id={`over-${row._id}`}
        
        onClick={(event) => {
          // dispatch(setCShow(false));
          // dispatch(setBTarget(event.currentTarget)); 
          dispatch(setUserId(row._id));
          
          dispatch(setCShow(false));
          dispatch(setBShow(true));
        }}
        
    
        >
        {/* <CommentsTable comments={row.comments} /> */}
          {row.comments.length > 0
            ? row.comments.at(-1).comment
            : "Add Comments"}
        </p> 
            
      //  {/* </Tooltip> */}
      )},
    

      columnVisibility.followDate &&{
      field: "followDate",
      headerName: "Follow Date & Time",
      width: 180,
      resizable: true,
      valueGetter: (params) => params || "Follow Date & Time",
    },

    columnVisibility.quotation &&{
      field: "quotation",
      headerName: "Quotation",
      width: 180,
      resizable: true,
      renderCell: ({ row }) => (
        <Tooltip>
          <p
            onClick={() => {
              dispatch(setQuotationShow(true));
              dispatch(setQuotationId(row._id));
            }}
          >
            ₹/-{row.quotation.amount || ""} -{" "}
            {row.quotation.items || "Send Quotation"}
          </p>
        </Tooltip>
      ),
    },

    columnVisibility.meeting_time &&{
      field: "meeting_time",
      headerName: "Meeting Date",
      width: 200,
      resizable: true,
      renderCell: ({ row }) => (
        <Tooltip>
          <p
            onClick={() => {
              dispatch(setMeetingDateShow(true));
              dispatch(setMeetingDateId(row._id));
            }}
          >
            {row.meeting_time || "Send Quotation"}
          </p>
        </Tooltip>
      ),
    },
    columnVisibility.email &&{ field: "email", headerName: "Email", width: 200, editable: true, resizable: true, },
    // {
    //   field: "settings",
    //   headerName: "",
    //   width: 50,
    //   sortable: false,
    //   pinned:"right",
    //   renderHeader: () => (
    //     <HeaderSettings>
    //       <IconButton onClick={handleOpen} size="small">
    //         <SettingsIcon />
    //       </IconButton>
    //     </HeaderSettings>
    //   ),
    //   sx: {
    //     position: "sticky",
    //     right: 0,
    //     background: "black", // Background color to avoid overlap
    //     zIndex: 2,
    //     borderLeft: "1px solid #ddd",
    //   },
    // },
    columnVisibility.city && { field: "city", headerName: "City", width: 120, editable: true,resizable: true, },
    columnVisibility.sector &&{ field: "sector", headerName: "Sector", width: 120, editable: true,resizable: true, },
    columnVisibility.address && { field: "address", headerName: "Address", width: 150, editable: true,resizable: true, },
    columnVisibility.stage && {
      field: "stage",
      headerName: "Stage",
      width: 120,
      editable: true,
      type: "singleSelect",
      resizable: true,
      valueOptions: ["Negotiation", "Deal Won", "Deal Lost"],
    },
    columnVisibility.source &&{
      field: "source",
      headerName: "Source",
      width: 120,
      editable: true,
      type: "singleSelect",
      resizable:true,
      valueOptions: ["Instagram", "FaceBook", "WhatsApp"],
    },
    // { field: "asign", headerName: "Assigned To", width: 150, editable: true },
  ].filter(Boolean);

  const rows = data.map((item, index) => {
    // ✅ Check if comments exist and extract the latest datetime
    const latestComment =
      item.comments && item.comments.length > 0
        ? item.comments.reduce((latest, current) =>
            new Date(current.datetime) > new Date(latest.datetime)
              ? current
              : latest
          )
        : null;

    return {
      id: index + 1,
      _id: item._id,
      name: item.name || "Add Name",
      mobile_number: item.mobile_number || "Add Mobile Number",
      meeting_time: item.meeting_time || "send Meeting Date",
      email: item.email || "Add Email",
      city: item.city || "Add City",
      sector: item.sector || "Add Sector",
      address: item.address || "Add Address",
      stage: item.stage || "Add Stage",
      source: item.source || "Add Source",
      quotation: item.quotation || "send Quotation",
      comments: Array.isArray(item.comments) ? item.comments : [],
      asign: item.asign || "Unassigned",
      followDate: latestComment
        ? new Date(latestComment.datetime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "No Follow-up", // Default if no comments available
    };
  });

  const [page, setPage] = useState(1); // ✅ Track current page
  const pageSize = 10; // ✅ Fixed Page Size
  // const [page, setPage] = useState(1);
  const totalPages = Math.ceil(rows.length / pageSize);


  const [inrows, setInRows] = useState([]);

// useEffect(() => {
//   setInRows([...rows]);
// }, [rows])
  return (
    <>
     <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: "300px",
            overflow: "auto",
            minWidth: "200px",
          },
        }}
      >
        <h4 style={{ margin: "10px 0", textAlign: "center" }}>Manage Columns</h4>
        {Object.keys(columnVisibility).map((field) => (
          <MenuItem key={field}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={columnVisibility[field]}
                  onChange={() => toggleColumnVisibility(field)}
                />
              }
              label={columns.find((col) => col.field === field)?.headerName || field}
            />
          </MenuItem>
        ))}
      </Menu>
      {/* <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 2 }}>
      <Pagination
        count={Math.ceil(rows.length / pageSize)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        showFirstButton={false} // ✅ Hide First Button
        showLastButton={false} // ✅ Hide Last Button
      />
    </Stack> */}
 
        {/* <CustomPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            totalRows={rows.length}
          /> */}
        <Paper sx={{ height: "100%", width:"100%",overflow: "auto" }}>
        <HeaderSettings style={{position:"fixed",top:"65px", right:"10px",zIndex:"10"}}>
          <IconButton onClick={handleOpen} size="small">
            <SettingsIcon />
          </IconButton>
        </HeaderSettings>
     
      
      <DataGrid
        // rows={rows.slice((page - 1) * pageSize, page * pageSize)}
        rows={inrows}
        columns={columns}
        // columns={columns.map((col) => ({ ...col, flex: 1, resizable: true }))}
        // autoPageSize
        pagination={false}
        pageSizeOptions={[]} // ✅ Remove page size dropdown

        disableColumnMenu
        // pageSizeOptions={[10, 20]}
        // pageSizeOptions={[pageSize]} // ✅ Hides the page size dropdown
        // processRowUpdate={handleRowUpdate}
        // experimentalFeatures={{ columnResizing: true }}
        // paginationMode="client"
        // pagination
        // pagination
        // experimentalFeatures={{ columnResizing: true }}  // ✅ Enable column resizing
        // disableColumnMenu={false}
        // pagination={false} // ✅ Pagination को पूरी तरह से disable कर दिया
        // pageSizeOptions={[]}
        sx={{
          border: 1,
          cursor: "pointer",
          borderColor: "grey.400",
          
          /* ✅ Keeps header fixed at top (Vertically) but scrolls Horizontally */
          "& .MuiDataGrid-columnHeaders": {
            position: "sticky",
            top: 0, /* ✅ Fix at top */
            zIndex: 1000, /* ✅ Ensures it stays above other elements */
            backgroundColor: "white", 
            color: "black",
            fontWeight: "bold",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", /* ✅ Optional shadow */
          },
          
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "16px",
            fontWeight: "bold",
          },
          
          // "& .MuiDataGrid-cell": {
          //   borderBottom: "1px solid #ddd",
          // },
          
          // "& .MuiDataGrid-row": {
          //   // "&:nth-of-type(even)": { backgroundColor: "#f5f5f5" },
          // },
          
          /* ✅ Allows horizontal scrolling but keeps headers fixed vertically */
          // "& .MuiDataGrid-columnHeadersInner": {
          //   position: "relative", /* ✅ Allows horizontal scrolling */
          //   zIndex: 1,
          //   // backgroundColor: "white",
          // },
        }}
      />
         <Button
        onClick={() => setInRows(rows)}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Load Data
      </Button>
    </Paper>
    <div>
      <SendTableQuotation />
      <CommentFormModal />
      <CommentsTable/>
      <SendTableMeetingDate />
    </div>
    </>
  );
};

export default DataTable;
