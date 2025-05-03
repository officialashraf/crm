import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { removeEmployee, setDelShow } from "../../redux/slice/AdminSlice/AddEmployeSlice";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";


const DeleteEmp = () => {
let dispatch = useDispatch()

  let { employeeuserId,empdel } = useSelector((state) => state.addemployee);
  
let handleClose = ()=>{
    dispatch(setDelShow(false))
}

const DeleteEmployee = (id) => {
  axios
    .delete(`http://localhost:5000/employee/${id}`)
    .then((response) => {
      console.log(response.data);
      dispatch(removeEmployee(id))
      dispatch(setDelShow(false))
    })
    .catch((error) => console.error("error deleting employee", error));
};


  return (
    <div>
      <Modal show={empdel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Confirm Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>DeleteEmployee(employeeuserId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteEmp;
