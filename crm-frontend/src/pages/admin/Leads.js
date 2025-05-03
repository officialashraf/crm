import React, { useEffect, useState } from "react";
import { Form, Navbar, NavbarText } from "react-bootstrap";
import Leadscss from "../../assets/style/admincss/Leads.css";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeList } from "../../redux/slice/AdminSlice/AddLeadSlice";
import axios from "axios";
import LeadUpload from "../../components/adminComponant/LeadUpload";
import { useNavigate } from "react-router-dom";
import Navbars from '../../components/adminComponant/Navbar'

const Leads = () => {
  let dispatch = useDispatch();
  let { employeelist, leadid } = useSelector((state) => state.addlead);
  let [emplyeelist, setEmployeeList] = useState([]);
  let [selectemployee, setSelectEmployee] = useState("");
  let [selectempshow, setSelectEmpShow] = useState(null);
  let navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee");
        setEmployeeList(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  let handleChange = (event) => {
    setSelectEmployee(event.target.value);
    const employee = emplyeelist.find(
      (emp) => emp.fullname === event.target.value
    );
    setSelectEmpShow(employee);
  };

  const handleBulkUpdate = async (event) => {
    event.preventDefault();

    if (!selectemployee) {
      alert("Please enter an assigned value.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/leads/", {
        asign: selectemployee,
      });

      if (response.status === 200) {
        alert(`Updated ${response.data.modifiedCount} leads successfully!`);
        // selectempshow("")
        // setSelectEmployee("")
        navigate('/admin')
      } else {
        alert("Failed to update leads.");
      }
    } catch (error) {
      console.error("Error updating leads:", error);
      // alert("An error occurred while updating leads.");
    }
  };

  console.log(selectemployee);

  return (
    <>
      <>
      <div className="container-fluid d-flex" style={{margin:"0", padding:"0"}}>
<div className="LeadNavbar">
          <Navbars/>

</div>
          {/* <form onSubmit={handleBulkUpdate}> */}
        <div className="container " id="navLead">
            <div className="excelLead">
              <h2 className="text-center">When Admin Will upload Excel Leads Will Appear Here</h2>
            </div>
            <div className="leads-container">
              <div className="lead-cards">
                <div className="cardheaders">
                  {/* <h4>Employees </h4> */}
                  <Form.Select
                    value={selectemployee}
                    onChange={handleChange}
                    id="formselect"
                  >
                    <option>Employees</option>
                    {emplyeelist.map((item) => (
                      <option key={item._id}>{item.fullname}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="cardbodys">
                  <h3>
                    {selectempshow
                      ? `Selected Employee: ${selectempshow.fullname}`
                      : "No Employee Selected"}
                  </h3>
                </div>
              </div>
              <div className="lead-cards">
                <div className="cardheaders">
                  <h4> Leads</h4>
                </div>
                <div className="cardbodys">
                  <LeadUpload />
                </div>
              </div>
            </div>
            <div className="buttoncontainer">
              <button
                type="submit"
                onClick={handleBulkUpdate}
                className="buttonB"
              >
                Assign
              </button>
            </div>
          {/* </form> */}
        </div>
      </div>
      </>
    </>
  );
};

export default Leads;
