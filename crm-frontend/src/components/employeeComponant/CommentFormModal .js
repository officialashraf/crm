import React, { useState } from "react";
import { Modal, Box,Popover, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_URL from "../../utils/API_URL";
import { addComment } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import { ResponsiveDateTimePickers } from "./ResponsiveDateTimePickers";
import { setClose ,setBShow} from "../../redux/slice/EmployeSlice/ModalSlice";
// import Modal from "../../assets/style/employecss/Modal.css";


const CommentFormModal = () => {
  const dispatch = useDispatch();
  const { Bshow,Btarget, userId } = useSelector((state) => state.modal);
  const data = useSelector((state) => state.employeedata);

  const [call, setCall] = useState("");
  const [datetime, setDateTime] = useState(null);
  const [comment, setComment] = useState("");

  const handledatetime = (date) => {
    setDateTime(date);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!call || !comment) {
      console.error("Please fill in all required fields");
      return;
    }

    let newcomment = {
      call,
      timedate: new Date().toLocaleString("en-IN"),
      comment,
      datetime: datetime ? new Date(datetime) : null,
    };

    const user = data.find((user) => user._id === userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    const updatedUser = {
      ...user,
      comments: [...(user.comments || []), newcomment],
    };

    try {
      await axios.put(`${API_URL}${userId}`, updatedUser);
      dispatch(addComment({ userId, comment: newcomment }));
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    dispatch(setClose(false));
    setCall("");
    setComment("");
    setDateTime(null);
  };

  return (
      //  <Popover
      //       open={Bshow}
      //       anchorEl={Btarget}
      //       onClose={handleClose}
      //       // onMouseLeave={handleClose}
      //       anchorOrigin={{
      //         vertical: "bottom",
      //         horizontal: "left",
      //       }}
      //       transformOrigin={{
      //         vertical: "top",
      //         horizontal: "left",
      //       }}
      //     >

     <Modal open={Bshow} onClose={()=>dispatch(setBShow(false))}> 
       <Box sx={{ width: 500, bgcolor: "white", p: 3, m: "auto", mt: 5, borderRadius: 2 }}> 
         <h3>Add Comment</h3> 
        <FormControl fullWidth sx={{ mb: 2 }} >
          <InputLabel>Call Status</InputLabel>
          <Select value={call} onChange={(e) => setCall(e.target.value)} required>
            <MenuItem value="Interested">Interested</MenuItem>
            <MenuItem value="Not Interested">Not Interested</MenuItem>
            <MenuItem value="Call Picked Up">Call Picked Up</MenuItem>
            <MenuItem value="Call Not Picked Up">Call Not Picked Up</MenuItem>
            <MenuItem value="Follow-Up Scheduled">Follow-Up Scheduled</MenuItem>
          </Select>
        </FormControl>

           <ResponsiveDateTimePickers
                  onChange={handledatetime}
                  value={datetime}
                  newDates={new Date()}
                />
<br/>
<br/>
        <TextField
          label="Comment"
          multiline
          rows={3}
          fullWidth
          sx={{ mb: 2 }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleClose} sx={{ mt: 1 }}>
          Close
        </Button>
      </Box>
     </Modal>
    // </Popover>
  );
};

export default CommentFormModal;
