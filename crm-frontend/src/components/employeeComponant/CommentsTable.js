import React from "react";
// import { Popover, IconButton, Paper } from "@mui/material";

import {Table,Overlay,Popover} from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";

import { useDispatch, useSelector } from "react-redux";
import {
    setCShow,
    setTableId,
    setCTarget,
    setHandleClose,
  } from "../../redux/slice/EmployeSlice/ModalTableSlice";
import { XLg } from "react-bootstrap-icons";

const CommentsTable = () => {
    
  let data = useSelector((state) => state.employeedata);
  let dispatch = useDispatch();
  let { Cshow, Ctarget, tableid } = useSelector((state) => state.modaltable);
 let handleClose = () => {
    dispatch(setHandleClose(false));
  };

  // const parseCustomDate = (dateString) => {
  //   // Replace with your actual date parsing logic
  //   // Example for "DD/MM/YYYY HH:MM:SS"
  //   const parts = dateString.split(' ');
  //   if(parts.length < 2) return new Date('Invalid Date');
  //   const dateParts = parts[0].split('/');
  //   const timeParts = parts[1].split(':');
  //   if(dateParts.length < 3 || timeParts.length < 3) return new Date('Invalid Date');
  //   return new Date(
  //     parseInt(dateParts[2]),
  //     parseInt(dateParts[1]) - 1,
  //     parseInt(dateParts[0]),
  //     parseInt(timeParts[0]),
  //     parseInt(timeParts[1]),
  //     parseInt(timeParts[2])
  //   );
  // };
  
  return (
   
    <Overlay
    show={Cshow}
    target={Ctarget}
    placement="bottom"
    containerPadding={20}
  >
    <Popover id="popover-contained" onPointerLeave={handleClose}>
      <Popover.Header as="h3" closeButton>
        Comments <XLg onClick={handleClose} className="XLgModalTable" />{" "}
      </Popover.Header>
      <Popover.Body>
      {/* // <Popover/>
      //   open={Cshow}
      //   anchorEl={Ctarget}
      //   onClose={handleClose} *
      //   // onMouseLeave={handleClose}
      //   anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper
          elevation={1}
          style={{
            padding: "10px",
            maxWidth: "500px", // Max width of popover
            background: "white",
            maxHeight: "250px", // Enable scrolling if needed
            overflowY: "auto",
          }}
        >
          Comments <XLg onClick={handleClose} id="XlgId" /> */}
            <div className="container-fluid mt-8">
            <div className="table-responsive">
          <Table 
          responsive="sm"
          className="border border-dark "
          bordered
          hover
           style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th >S.No</th>
                <th >Call Result</th>
                <th>Entry Date & Time</th>
                <th >Comment</th>
              </tr>
            </thead>
            <tbody>
  {data.map((item) =>
    item._id === tableid && item.comments?.length > 0
      ? [...item.comments]
          .sort((a, b) => b._id.localeCompare(a._id)) // Sort by MongoDB ObjectId
          .map((comment, index) => (
            <tr key={comment._id}>
              <td>{index + 1}</td>
              <td>{comment.call}</td>
              <td>{comment.timedate}</td>
              <td className="text-wrap">{comment.comment}</td>
            </tr>
          ))
      : null
  )}
</tbody>

          </Table>
          </div>
          </div>
        {/* // </Paper> */}
      {/* // </Popover>  */}
      </Popover.Body>
      </Popover>
    </Overlay>
    
    
  );
};



export default CommentsTable;




 {/* <IconButton onClick={handleClick}>
        <InfoIcon color="primary" />
      </IconButton> */}