import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { removeLeads, setLeadShow,setDelShow } from "../../redux/slice/AdminSlice/AddLeadSlice";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

const DeleteLead = () => {
    let dispatch = useDispatch()

  let { leaddata,leadid, leaddel } = useSelector((state) => state.addlead);
  
let handleClose = ()=>{
    dispatch(setDelShow(false))
}

  const DeleteLeads = (id) => {
    axios
      .delete(`http://localhost:5000/leads/${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(removeLeads(id));
        dispatch(setDelShow(false))
      })
      .catch((error) => console.error("error deleting employee", error));
  };
  return (
    <div>
      <Modal show={leaddel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Confirm Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => DeleteLeads(leadid)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteLead;
