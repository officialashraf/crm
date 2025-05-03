import React, { useState, useEffect,useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Form, Button } from "react-bootstrap";
import {setLeadClose,setLeadData,setLeadShow,setEmployeeList} from "../../redux/slice/AdminSlice/AddLeadSlice";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';


const AddLeads = () => {
  let dispatch = useDispatch();
  let { leadshow, leaddata,employeelist , leadid } = useSelector(
    (state) => state.addlead
  );

  // let { employeeadd } = useSelector((state) => state.addemployee);
  // console.log(employeeadd)

  const isEditing = Boolean(leadid);

  const initialState = useMemo(()=>({ 
    name: "",
    mobile_number: "",
    email: "",
    comments: [],
    meeting_time: "",
    city: "",
    sector: "",
    address: "",
    quotation: { items: "", amount: "" },
    asign: "",
    stage: "",
    source: "",
  }),[]);
  let [leads, setLeads] = useState(initialState);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee");
        dispatch(setEmployeeList(response.data));
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, [dispatch]);
 
  useEffect(() => {
    if (isEditing) {
      const leadEdit = leaddata.find((leadsitem) => leadsitem._id === leadid);
      if (leadEdit) {
        setLeads({
       
          ...leadEdit,
          comments: leadEdit.comments || [],
          quotation: leadEdit.quotation || { items: "", amount: "" },
        });
      }
    } else {
      setLeads(initialState);
      
    }
  }, [isEditing,dispatch,leadid,initialState]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeads((prevLeads) => ({
      ...prevLeads,
      [name]: value,
    }));
  };
 
  let handleformsubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:5000/leads/${leadid}`,
          leads
        );
        dispatch(
          setLeadData(
            leaddata.map((item) => (item._id === leadid ? response.data : item))
          )
        );
      } else {
        response = await axios.post("http://localhost:5000/leads/", leads);
        dispatch(setLeadData([...leaddata, response.data]));
      }
    } catch (error) {
      console.error("Error adding/updating lead:", error);
    } finally {
      handleLeadClose();
    }
  };
  const handleLeadClose = () => {
    dispatch(setLeadClose(false));
    dispatch(setLeadShow(false));
    setLeads(initialState);
  };



  return (
    <>
          <Modal show={leadshow} onHide={handleLeadClose}>

            <Form onSubmit={handleformsubmit}>
        <Modal.Header closeButton>
            {/* {leadid ? "Update Leads" : "Add Leads"} */}
            {leadid && leadid !== "" ? "Update Leads" : "Add Leads"}
            </Modal.Header>
         
          <Modal.Body>
            <div className="container">
              <div>
                  <div className="p-2 m-2">
                    <label> Lead Name</label>
                    <input
                      type="text"
                      name="name"
                      value={leads.name}
                      onChange={handleChange}
                      className="form-control"
                       autoComplete="off"
                    />
                  </div>
                  <div className="p-2 m-2">
                    <label> Mobile Number</label>
                    <input
                      type="text"
                      name="mobile_number"
                      value={leads.mobile_number}
                      onChange={handleChange}
                      className="form-control"
                       autoComplete="off"
                    />
                  </div>
                  <div className="p-2 m-2">
                    <label> Email</label>
                    <input
                      type="text"
                      name="email"
                      value={leads.email}
                      onChange={handleChange}
                      className="form-control"
                       autoComplete="off"
                    />
                  </div>

                  <div className="p-2 m-2">
                    <label> address</label>
                    <input
                      type="text"
                      name="address"
                      value={leads.address}
                      onChange={handleChange}
                       autoComplete="off"
                      className="form-control"
                    />
                  </div>
                  <div className="p-2 m-2">
                    <label> City</label>
                    <select
                      className="form-control"
                      name="city"
                      value={leads.city}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option>Indore</option>
                      <option>Mumbai</option>
                      <option>Pune</option>
                      <option>Gwalior</option>
                      <option>Jaipur</option>
                    </select>
                  </div>
                  <div className="p-2 m-2">
                    <label> Sector</label>
                    <select
                      className="form-control"
                      name="sector"
                      value={leads.sector}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option>TelePerformance</option>
                      <option>Education</option>
                      <option>IT Sector</option>
                      <option>BPO Sector </option>
                    </select>
                  </div>
                  <div className="p-2 m-2">
                    <label> Source</label>
                    <select
                      className="form-control"
                      name="source"
                      value={leads.source}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option>Source</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>WhatsApp </option>
                    </select>
                  </div>
                  <div className="p-2 m-2">
                    <label htmlFor="employeeSelect"> Assigned To</label>
                      <Form.Select 
                      name="asign"
                      value={leads.asign}
                      onChange={handleChange}
                      id="formselect">
                        <option>Employees</option>
                        {employeelist.map((item) => (
                          <option key={item._id}>{item.fullname}</option>
                        ))}
                      
                      </Form.Select>
                  </div>
                  <div className="p-2 m-2">
                    <Button
                      type="submit"
                      className="form-control bg-dark text-light"
                    >
                      {/* Submit */}
                      {/* {leadid ? "Update" : "Submit"} */}
                      {leadid && leadid !== "" ? "Update" : "Submit"}
                    </Button>
                  </div>
              </div>
            </div>
            </Modal.Body>
                </Form>
            </Modal>
          
    </>
  );
};

export default AddLeads;
