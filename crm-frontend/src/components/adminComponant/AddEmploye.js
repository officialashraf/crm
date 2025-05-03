import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XLg } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";
import { Popover, Overlay, Form, Button } from "react-bootstrap";
import {
  setEmployeeClose,
  setAddEmployee,
  setEmployeeShow,
  setIsEditing
} from "../../redux/slice/AdminSlice/AddEmployeSlice";
import AddEmployee from "../../assets/style/admincss/AddEmploye.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const AddEmploye = () => {
  let dispatch = useDispatch();

  const [employeedata, setEmployeeData] = useState({
    fullname: "",
    number: "",
    designation: "",
    photo: null,
  });

  let { employeeshow,isEditing, employeeuserId, employeeadd } =
    useSelector((state) => state.addemployee);


  // const isEditing = Boolean(employeeuserId);
  dispatch(setIsEditing(Boolean(employeeuserId)))



// console.log(employeeadd)

  useEffect(() => {
    if (isEditing) {
      const employeeToEdit = employeeadd.find(
        (emp) => emp._id === employeeuserId
      );
      if (employeeToEdit) {
        setEmployeeData({
          fullname: employeeToEdit.fullname,
          number: employeeToEdit.number,
          designation: employeeToEdit.designation,
          photo: null, // Keep photo empty or allow to update the photo
        });
      }
    } else {
      setEmployeeData({
        fullname: "",
        number: "",
        designation: "",
        photo: null,
      });
    }
  }, [isEditing, employeeuserId,dispatch]);
  // isEditing, employeeuserId,dispatch

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "photo") {
      setEmployeeData({
        ...employeedata,
        [name]: files[0],
      });
    } else {
      setEmployeeData({
        ...employeedata,
        [name]: value,
      });
    }
  };


  

  let handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullname", employeedata.fullname);
    formData.append("number", employeedata.number);
    formData.append("designation", employeedata.designation);
    if (employeedata.photo || "") {
      formData.append("photo", employeedata.photo || '');
    }
    try {
     
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:5000/employee/${employeeuserId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        dispatch(
          setAddEmployee(
            employeeadd.map((employee) =>
              employee._id === employeeuserId
                ? response.data
                : employee
            )
          )
        );
        // dispatch(setEmployeeShow(false));
        // handleClose();
      } else {
        const response = await axios.post(
          "http://localhost:5000/employee",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Employee added:", response.data);
        dispatch(setAddEmployee([...employeeadd, response.data]));
      }
      dispatch(setEmployeeShow(false));
      handleClose();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };
  // handleSubmit()
  const handleClose = () => {
    dispatch(setEmployeeClose(false));
    setEmployeeData({
      fullname: "",
      number: "",
      designation: "",
      photo: null,
    });
  };

  return (
    <>
     
            <Modal show={employeeshow} onHide={handleClose}>
        <Modal.Header closeButton>

            {employeeuserId ? "Edit Employee" : "Add Employee"}
            {/* <XLg onClick={handleClose} className="XLgModalTable" /> */}
            </Modal.Header>
         
          <Modal.Body>
            <div className="container-fluid">
              <div>
                <Form className="employeform" onSubmit={handleSubmit}>
                  <div className="p-3">
                    <label> Name</label>
                    <input
                      type="text"
                      value={employeedata.fullname}
                      onChange={handleChange}
                      name="fullname"
                      className="form-control"
                       autoComplete="off"
                    />
                  </div>
                  <div className="p-3">
                    <label> Mobile Number</label>
                    <input
                      type="text"
                      value={employeedata.number}
                      onChange={handleChange}
                      name="number"
                      className="form-control"
                       autoComplete="off"
                    />
                  </div>
                  <div className="p-3">
                    <label> Designation</label>
                    <input
                      type="text"
                      value={employeedata.designation}
                      onChange={handleChange}
                      name="designation"
                      className="form-control"
                       autoComplete="off"
                    />
                  </div>

                  <div className="p-3">
                    <label for="file-upload" className="form-label">
                      Upload Photo
                    </label>
                    <div class="upload-doc-wrapper">
                      <input
                        id="file-upload"
                        name="photo"
                        type="file"
                        onChange={handleChange}
                        className="file-input"
                         autoComplete="off"
                      />
                      <div className="upload-doc-button">
                        <Plus size={25} className="plus-icon" />
                      </div>
                    </div>
                  </div>
              
                  <div className="p-3" id="input-upload">
                  
                    <Button type="submit" className="btn btn-dark mt-3">
                      {/* Submit  */}
                      {employeeuserId ? "Update" : "Submit"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
            </Modal.Body>
            </Modal>
          {/* </Popover.Body> */}
        {/* </Popover> */}
      {/* </Overlay> */}
    </>
  );
};

export default AddEmploye;
