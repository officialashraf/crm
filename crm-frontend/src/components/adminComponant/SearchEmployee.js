import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import {setEmployeeShow,removeEmployee,setDelShow, setAddEmployee,setEmployeeTarget,setEmployeeUserId} from "../../redux/slice/AdminSlice/AddEmployeSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchEmployeecss from "../../assets/style/admincss/SearchEmployeecss.css";
import axios from "axios";
import DeleteEmp from "./DeleteEmp";

const SearchEmployee = () => {
  let dispatch = useDispatch();

  let { employeeadd } = useSelector((state) => state.addemployee);
  let [employeesearch, setEmployeeSearch] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employee");
        dispatch(setAddEmployee(response.data));
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, [employeeadd]);
  
  


  const DeleteEmployee = (id) => {
  
        dispatch(setDelShow(true))
        dispatch(setEmployeeUserId(id))
  };

  const handleEditEmploye = (event,id) => {
    dispatch(setEmployeeShow(true));
    dispatch(setEmployeeUserId(id))
  };
  const filteredData = employeeadd.filter(
    (item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(employeesearch.toLowerCase())
      ))

  return (
    <div className="container">
      <div className="row">
        <input
          type="text"
          id="input"
          value={employeesearch}
          onChange={(e) => setEmployeeSearch(e.target.value)}
          className="form-control"
          placeholder="Search Employees"
        />
        <div className="card-box">
          {filteredData.map((item, index) => (
            <div className="cards" key={item._id}>
              <div className="cardheader">{item.fullname}</div>
              <div className="cardbody">
                <div className="EmployeeImage">
                  <img
                   src={item.photo}
                    className="img-pics" />
                </div>
              </div>
              <br/>
              <div className=" cardfooter">
                <h6> Position :{item.designation}</h6>
                <br/>
                <h6> Mobile Number : {item.number} </h6>
                <div className="emp-btns">
                  <button onClick={(e)=>handleEditEmploye(e,item._id)} className="btn-emp">
                    <Pencil size={30} />
                  </button>

                  <button
                    className="btn-emp"
                    onClick={() => DeleteEmployee(item._id)}
                  >
                    <Trash size={30} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteEmp/>
    </div>
  );
};

export default SearchEmployee;
