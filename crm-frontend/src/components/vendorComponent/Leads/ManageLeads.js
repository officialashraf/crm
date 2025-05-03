import React,{useEffect, useState} from 'react'
import { PencilSquare, PlusSquareFill, Trash3 } from 'react-bootstrap-icons';
import BulkUpload from './BulkUpload';
import BulkDelete from './BulkDelete';
import AddLead from './AddLead';
import { useDispatch, useSelector } from "react-redux";
import { setAddEmploye,setEmployeeShow,setEmployeeId ,setDelShow} from "../../../redux/slice/VendorSlice/AddEmployeeSlice";
import { setLeadId,setAddLeadShow,setBulkDeleteShow,setBulkLeadShow } from '../../../redux/slice/VendorSlice/AddLeadSlice';
import axios from 'axios';
const ManageLeads = () => {

  
    let dispatch = useDispatch()
   let { employeeAdd,adminprofile } = useSelector((state) => state.addEmp);
    


    // useEffect(() => {
    //   const fetchData = async () => {
    //     if (!adminprofile || !adminprofile._id) {
    //       console.error("Admin ID is missing");
    //       return;
    //     }
    //     try {
    //       const response = await axios.get(`http://localhost:5000/employee/adminby/${adminprofile._id}`);
    //       dispatch(setAddEmploye(response.data));
    //     } catch (error) {
    //       console.log("error");
    //     }
    //   };
    //   fetchData();
    // }, [dispatch,adminprofile._id]);
  


  let [show, setShow] = useState(false)
  
  const handleBulkDelete = (id)=>{
    dispatch(setBulkDeleteShow(true))
    dispatch(setLeadId(id))
    
  }
  const handleBulkUpload = (id)=>{
    dispatch(setLeadId(id))
    dispatch(setBulkLeadShow(true))
    
  }
  const handleLeadAdd = (id)=>{
    dispatch(setLeadId(id))
    dispatch(setAddLeadShow(true))

  }
  const handleClose = (()=>{
    setShow(false)
  })

const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 5;

const totalPages = Math.ceil(employeeAdd.length / rowsPerPage);
const startIndex = (currentPage - 1) * rowsPerPage;
const displayedData = employeeAdd.slice(startIndex, startIndex + rowsPerPage);

  return (
    <>
     <div className="container-fluid">
        {/* Table */}

        <div className="card">
          <div className="card-header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p> Team Lead</p>
              <a href="http://localhost:5000/download-sample">Donwload Semple</a>
              
            </div>
          </div>

          <div className="card-body">
            <table className="table table-bordered text-center">
              <thead className="table">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Designation</th>
                  {/* <th>Delete</th> */}
                  <th colSpan={3}>Action </th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                    <td>{item.fullname}</td>
                    <td>{item.number}</td>
                    <td>{item.designation}</td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={()=>handleBulkDelete(item._id)}
                        style={{
                          width: "100px",
                          display: "inline",
                          margin: "0px",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    {/* <td><PencilSquare size={20}/></td> */}
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={()=>handleLeadAdd(item._id)}
                        style={{
                          width: "100px",
                          display: "inline",
                          margin: "0px",
                        }}
                      >
                        Add Lead
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={()=>handleBulkUpload(item._id)}
                        style={{
                          width: "100px",
                          display: "inline",
                          margin: "0px",
                        }}
                      >
                        Bulk Upload
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}

            {/* <div className='card-footer'> */}
            {/* Pagination */}
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <BulkUpload/>
      <BulkDelete show={show} displayedData={employeeAdd}  />
      <AddLead/>
    </>
  )
}

export default ManageLeads