import React, { useEffect, useState } from "react";
import { Modal, Button, Table, ModalFooter } from "react-bootstrap";
import { setLeadId,setAddLeadShow,setBulkDeleteShow,setBulkLeadShow,setLeadData } from '../../../redux/slice/VendorSlice/AddLeadSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddEmploye,
  setEmployeeShow,
  setEmployeeId,
} from "../../../redux/slice/VendorSlice/AddEmployeeSlice";
import axios from "axios";

const BulkDelete = ({ displayedData }) => {


  let dispatch = useDispatch()
    let {employeeId} = useSelector((state) => state.addEmp);
  let {bulkDeleteShow,leaddata,LeadId} = useSelector((state)=>state.leads)


useEffect(()=>{
  const fetchData = async()=>{
    try{
      if(!LeadId) return;
      let response = await axios.get(`http://localhost:5000/leads/employee/${LeadId}`);
      console.log(response.data)
      dispatch(setLeadData(response.data))
    }catch(error){
console.error("note fetch data", error)
    }
  }
  fetchData()
},[dispatch,LeadId])

// useEffect(()=>{
//   const fetchData = async()=>{
//     try{
//       let response = await axios.get(`http://localhost:5000/employee`);
//       dispatch(setAddEmploye(response.data))
//     }catch(error){
//       console.error("note fetch", error)

//     }
//   }
//   fetchData()
// },[])






let handleClose = ()=>{
  dispatch(setBulkDeleteShow(false))
}


const handleDelete = async()=>{
  if(selectrow.length === 0){
    alert("please selecte one ");
    return
  }
  try{
    const response = await axios.post("http://localhost:5000/leads/bulk-delete/",
      {
      id: selectrow
    })
    alert(response.data.massage);
    SetSelectRow([])
    dispatch(setBulkDeleteShow(false))

  }catch(error){
    console.error("error deleting leads");
    alert("failed to Delete Leads")
  }
}


  let [selectrow, SetSelectRow] = useState([]);

  const handleSelectAll = (e) => {
    SetSelectRow(e.target.checked ? leaddata.map((item) => item._id) : []);
  };

  const handleSingleSelect = (id) => {
    SetSelectRow(
      selectrow.includes(id)
        ? selectrow.filter((item) => item !== id)
        : [...selectrow, id]
    );
  };

  let [currentPage, setCurrentPage]= useState(1)
  let rowsPerPage = 5;
  let totalPages = Math.ceil(leaddata.length / rowsPerPage)
  let startIndex = (currentPage - 1) * rowsPerPage
  if (!Array.isArray(leaddata)) {
    console.error("LeadData is not an array:", leaddata);
    leaddata = []; // ✅ Fix: Default empty array
  }
  let currentData = leaddata.slice(startIndex, startIndex + rowsPerPage)


  return (
    <div>
      <Modal show={bulkDeleteShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Delete Lead </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table table-responsive" style={{ maxHeight: "400px", width: "auto"}}>
            <table className="table">
              <thead>
                <tr>
                  <th><input type="checkbox" onChange={handleSelectAll} checked={selectrow.length === leaddata.length}/></th>
                  <th> S.No</th>
                  <th> Name </th>
                  <th> Mobile</th>
                  <th> Email</th>
                  <th> Stage</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentData.map((item, index)=>(
                    <tr key={item._id}>
                  <td> <input type="checkbox" checked={selectrow.includes(item._id)} onChange={()=>handleSingleSelect(item._id)}/> </td>
                  <td>{index + 1} </td>
                  <td>{item.name} </td>
                  <td>{item.mobile_number} </td>
                  <td>{item.email} </td>
                  <td>{item.stage} </td>
                </tr>
                  ))
                }
              </tbody>
            </table>
      <nav>
  <ul className="pagination">
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
    </li>

    {Array.from({ length: totalPages }, (_, i) => (
      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </button>
      </li>
    ))}

    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    </li>
  </ul>
</nav>
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button  onClick={handleDelete} className="mt-3 btn btn-dark"> Delete Selected Leads</Button>
        </ModalFooter>

      </Modal>

    </div>
  );
};

export default BulkDelete;
