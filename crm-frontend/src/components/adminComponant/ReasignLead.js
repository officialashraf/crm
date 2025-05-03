import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  setAsignShow,
  updateAsign,
} from "../../redux/slice/AdminSlice/AddLeadSlice";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const ReasignLead = () => {
  let dispatch = useDispatch();
  let { leadid, leaddata, reasign, employeelist } = useSelector(
    (state) => state.addlead
  );
  let [asign, setAsign] = useState("");
  let handleClose = () => {
    dispatch(setAsignShow(false));
  };
  const handleChange = (event) => {
    setAsign(event.target.value);
  };

  // console.log(asign)
  const handleReasign = async (event) => {
    event.preventDefault();
    try {
      if (!handleReasign) {
        console.error("Lead ID or assigned employee is missing");
        return;
      }
      const selectedEmployee = employeelist.find((emp) => emp._id === leadid);
      if (selectedEmployee) {
        console.error("Selected employee not found");
        return;
      }
      // const reasignupdate = { asign };

      const reasignupdate = { ...selectedEmployee, asign };

      const response = await axios.put(
        `http://localhost:5000/leads/${leadid}`,
        reasignupdate
      );
      dispatch(updateAsign({ leadid, asign }));
      handleClose();
      if (response.status === 200 && response.data) {
        console.log("User data updated:", response.data);
      } else {
        console.warn("Unexpected response from the server:", response);
      }
    } catch (error) {
      console.error(
        "Error updating user stage:",
        error.response || error.message
      );
    }
  };

  return (
    <div>
      <Modal show={reasign} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleReasign}>
          <Modal.Body>
            <Form.Select value={asign} onChange={handleChange} id="formselect">
              <option>Employees</option>
              {employeelist.map((item) => (
                <option key={item._id}>{item.fullname}</option>
              ))}
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="danger">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ReasignLead;

// let [emplyeelist, setEmployeeList ] = useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/employee");
//       setEmployeeList(response.data);
//     } catch (error) {
//       console.log("error");
//     }
//   };
//   fetchData();
// }, []);
