import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  setAddEmploye,
  setEmployeeShow,
  setEmployeeId,
  setDelShow,
  setRemoveEmp,
} from "../../../redux/slice/VendorSlice/AddEmployeeSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const DeleteEmployee = () => {
  let { employeeAdd,employeeId, empDel } = useSelector((state) => state.addEmp);
  let dispatch = useDispatch();

  const handlDelete = (id) => {
    axios.delete(`http://localhost:5000/employee/${id}`).then((res) => {
      console.log(res.data)
      dispatch(setRemoveEmp(id));
      dispatch(setDelShow(false));
    });
  };

  const handleClose = () => {
    dispatch(setDelShow(false));
  };

  return (
    <div>
      <Modal show={empDel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Confirm Delete</Modal.Body>
        <Modal.Footer>
          <div className=" d-flex gap-3">
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={()=>handlDelete(employeeId)}>Delete</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteEmployee;
