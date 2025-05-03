import React, { useState,useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddEmploye,
  setEmployeeShow,
  setEmployeeId,
} from "../../../redux/slice/VendorSlice/AddEmployeeSlice";
import axios from "axios";
const AddEmployee = () => {
 
  let [fullname, setFullName] = useState("");
  let [designation, setDesignation] = useState("");
  let [number, setNumber] = useState("");
  let [photo, setPhoto] = useState(null);
  let [preview, setPreview] = useState("");
  let [loading, setLoading] = useState(true)

  let dispatch = useDispatch();
  let { employeeShow,employeeId,employeeAdd } = useSelector((state) => state.addEmp);
let {adminshow,adminprofile} = useSelector((state)=>state.addEmp)


  useEffect(() => {
    if (employeeId) {
      const selectedEmployee = employeeAdd.find((emp) => emp._id === employeeId);
      if (selectedEmployee) {
        setFullName(selectedEmployee.fullname);
        setNumber(selectedEmployee.number);
        setDesignation(selectedEmployee.designation);
        setPreview(selectedEmployee.photo);
      }
    } else {
      // ✅ Clear Input Fields When Adding New Employee
      setFullName("");
      setNumber("");
      setDesignation("");
      setPhoto(null);
      setPreview("");
    }
  }, [employeeId, employeeAdd,dispatch]);

// In AddEmployee.js

const handleSubmit = async (e) => {
  e.preventDefault();
  if(!fullname || !number || !designation || !adminprofile?._id){
    console.error("data is missing")
    return
  }

  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("number", number);
  formData.append("designation", designation);
  formData.append("adminId", adminprofile._id);
  if(photo){
    formData.append("photo", photo);
  }
  
  try {
    // if (employeeId) {

       let url = employeeId 
       ? `http://localhost:5000/employee/${employeeId}`
       : `http://localhost:5000/employee`
       
       const method = employeeId ? "put" : "post";
      // await axios[method](url, formData);
      await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    

      // await axios.put(
      //   `http://localhost:5000/employee/${employeeId}`,
      //   formData
      // );
    // } else {
      // await axios.post(`http://localhost:5000/employee`, formData);
    // }

    // Re-fetch all employees after add/update
    // const response = await axios.get(`http://localhost:5000/employee/${adminprofile._id}`);
    // dispatch(setAddEmploye(response.data)); 
       const response = await axios.get(`http://localhost:5000/employee/adminby/${adminprofile._id}`);
              // dispatch(setAddEmploye(response.data));
    
              if (Array.isArray(response.data)) {
                dispatch(setAddEmploye(response.data)); 
              } else {
                dispatch(setAddEmploye([]));
              }
    // dispatch(setEmployeeShow(false));
    dispatch(setEmployeeShow(false))
    setFullName("");
    setNumber("");
    setDesignation("");
    setPhoto(null);
    setPreview("");
  } catch (error) {
    console.error("Error submitting employee data:", error);
  }finally{
    setLoading(false)
  }
};



  const handleClose = () => {
    dispatch(setEmployeeShow(false));
    setFullName("");
    setNumber("");
    setDesignation("");
    setPhoto(null);
    setPreview("");
  };

  return (
    <div>
      {/* {employeeShow && ( */}

        <Modal show={employeeShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{employeeId ? "Update Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <form class="row " onSubmit={handleSubmit}>
              <div class="p-3">
                <label for="validationDefault01" class="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  class="form-control"
                />
              </div>
              <div class="p-3">
                <label for="validationDefault02" class="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  class="form-control"
                  />
              </div>

              <div class="p-3">
                <label for="validationDefault03" class="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  class="form-control"
                  />
              </div>
               <div class="p-3">
                <label for="validationDefault03" class="form-label">
                  Designation
                </label>
                <input
                  type="file"
                  name="photo"
                  // value={photo}
                  onChange={(e) => setPhoto(e.target.files[0])}
                  class="form-control"
                />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      width="100"
                      height="100"
                      style={{ marginTop: "10px", borderRadius: "5px" }}
                    />
                  )}
              </div> 
            
              <div class="p-2">
                <button class="btn btn-dark" type="submit">
                  {employeeId ? "update" : "Add "} Employee 
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
                {/* )} */}
    </div>
  );
};

export default AddEmployee;
