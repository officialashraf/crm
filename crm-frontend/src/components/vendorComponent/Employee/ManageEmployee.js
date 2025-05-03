import React, { createContext, useEffect, useState } from "react";
import {
  PencilSquare,
  PersonFill,
  Plus,
  PlusCircle,
  PlusCircleFill,
  Trash3Fill,
} from "react-bootstrap-icons";

import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAddEmploye,setEmployeeShow,setEmployeeId ,setDelShow} from "../../../redux/slice/VendorSlice/AddEmployeeSlice";



const ManageEmployee = () => {
  let dispatch = useDispatch();
  let { employeeAdd } = useSelector((state) => state.addEmp);
  let {adminshow,adminprofile} = useSelector((state)=>state.addEmp);
  let [loading, setLoading] = useState(true)

  let [employeedata, setEmployeeData] = useState([])
 
   useEffect(() => {
      const fetchData = async () => {
        if (!adminprofile || !adminprofile._id || !employeeAdd) {
          console.error("Admin ID is missing");
          return;
        }
        try {
          const response = await axios.get(`http://localhost:5000/employee/adminby/${adminprofile._id}`);
          // dispatch(setAddEmploye(response.data));

          if (Array.isArray(response.data)) {
            dispatch(setAddEmploye(response.data)); 
          } else {
            dispatch(setAddEmploye([]));
          }
        } catch (error) {
          console.log("error");
        }finally{
          setLoading(false)
        }
      };
      fetchData();
    }, [dispatch ,loading, adminprofile._id]);

 
  
  

  const handleClick = () => {
    dispatch(setEmployeeShow(true))
    dispatch(setEmployeeId(''))
  };

const handleEdit = (id)=>{
  
  dispatch(setEmployeeShow(true))
  dispatch(setEmployeeId(id))
}


  const handleDelete = (id) => {
    dispatch(setEmployeeId(id))
    dispatch(setDelShow(true));
  };
 
  if(loading){
    return <p>Loading....</p>
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
    
          <div className="col-md-12 d-flex gap-4">
              {
                Array.isArray(employeeAdd) && employeeAdd.length > 0 ? (
                  employeeAdd.map((item,index)=>(
                    <div className="card shadow" key={item._id}>

              <div className="card-header text-center">
                <h6> {item.fullname}</h6>
              </div>
              <div className="card-body d-flex justify-content-center">
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  >
                    {
                      item.photo ? (

                        <img src={item.photo} className="img-pics" />
                      ):(

                        <PersonFill size={100} />
                      )
                    }
                </div>
              </div>
              <div className="card-footer">
                <h6> Position-{item.designation} </h6>
                <h6> Mobile Number - {item.number}</h6>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  >
                  <PencilSquare onClick={()=>handleEdit(item._id)} size={30} />
                  <Trash3Fill onClick={()=>handleDelete(item._id)} size={30} />
                </div>
              </div>
            </div>
            ))) : (
              <p>No Employees Found</p>
            )
          
              }
          </div>
          
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "50px", right: "50px" }}>
        <PlusCircleFill size={50} onClick={handleClick} />
      </div>
      <AddEmployee/>
      <DeleteEmployee />
    </>
  );
};

export default ManageEmployee;
