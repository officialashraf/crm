import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  setLeadId,
  setAddLeadShow,
  setBulkDeleteShow,
  setBulkLeadShow,
} from "../../../redux/slice/VendorSlice/AddLeadSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const BulkUpload = () => {
  let dispatch = useDispatch();
  let { bulkleadShow, LeadId } = useSelector((state) => state.leads);
  let {adminshow,adminprofile} = useSelector((state)=>state.addEmp)
  let [file, setFile] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      if (!file || !LeadId || !adminprofile._id) {
        alert("please select file and id ");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("employeeid", LeadId);
      formData.append("adminId", adminprofile._id);


      const response = await axios.post(
        `http://localhost:5000/leads/bulk-upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      alert("bulk Upload Successfully");
      dispatch(setBulkLeadShow(false));
      setFile(null)
    } catch (error) {
      console.error("error Uploading", error);
      alert("upload failed");
    }
  };

  let handleClose = () => {
    dispatch(setBulkLeadShow(false));
  };

  return (
    <div>
      <Modal show={bulkleadShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group>
              <Form.Label>Upload Excel File</Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 btn-dark">
              Upload
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default BulkUpload;
