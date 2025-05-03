import React, { useEffect, useState, useRef } from "react";
import ManageLeadsTable from "../../assets/style/admincss/ManageLeadsTable.css";
import { Table } from "react-bootstrap";
import {
  setLeadShow,
  setLeadId,
  setLeadTarget,
  setLeadData,
  setAsignShow,
  setDelShow,
  removeLeads,
} from "../../redux/slice/AdminSlice/AddLeadSlice";
import { useDispatch, useSelector } from "react-redux";
import AddLeads from "./AddLeads";
import axios from "axios";
import AddEmploye from "./AddEmploye";
import DeleteLead from "./DeleteLead";
import LeadUpload from "./LeadUpload";
import ReasignLead from "./ReasignLead";
import * as XLSX from "xlsx"; // Import xlsx library
import AdminPagination from "./AdminPagination";
import { Form } from "react-router-dom";

const ManageLeads = () => {
  const dispatch = useDispatch();
  let [leadsearch, setLeadSearch] = useState("");
  let { leaddata, leadid,employeelist } = useSelector((state) => state.addlead);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leads");
        dispatch(setLeadData(response.data));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [dispatch,leaddata]);
  // dispatch,leadid

  const filteredData = leaddata.filter((item) =>
    Object.keys(item).some((key) =>
      item[key].toString().toLowerCase().includes(leadsearch.toLowerCase())
    )
  );

  const downloadExcel = () => {
    if (leaddata.length === 0) {
      alert("No data to download!");
      return;
    }

    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(leaddata);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    // Write the file and trigger the download
    XLSX.writeFile(workbook, "employee_data.xlsx");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let handleclick = (e) => {
    e.preventDefault();
    setLeadSearch(e.target.value);
  };

  const handLeads = () => {
    dispatch(setLeadShow(true));
  };
  const handDelete = (id) => {
    dispatch(setDelShow(true));
    dispatch(setLeadId(id));
  };

  const handleEdit = (id) => {
    dispatch(setLeadShow(true));
    // dispatch(setLeadTarget(event.target));
    dispatch(setLeadId(id));
  };
  const handleReasign = (id) => {
    dispatch(setAsignShow(true));
    // dispatch(setLeadTarget(event.target));
    dispatch(setLeadId(id));
  };

  return (
    <div className="container-fluid">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Leads"
          value={leadsearch}
          id="inputfield"
          onChange={(e) => setLeadSearch(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="pagin-lead">
        <div className="nav-btns">
          <button onClick={handLeads} className="btn1">
            Add Lead
          </button>

          <div className="upload-excels">
            <LeadUpload />
          </div>
        </div>
        <div>
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="leads">
        <h1>Manage Leads</h1>
        <a
          style={{
            textDecoration: "underLine",
            cursor: "pointer",
            color: "red",
          }}
          onClick={downloadExcel}
        >
          Download Excel
        </a>
      </div>
      <div style={{ maxHeight: "100%",overflowX:"auto",whiteSpace:"nowrap" }}>
      <Table
        // size="sm"
        // responsive="sm"
        className="border-vertical-only"
        bordered
        hover
      // striped
      >
        <thead id="thead">
          <tr>
            <th id="th">S.N</th>
            <th id="th">Lead Name</th>
            <th id="th">Mobile Number</th>
            <th id="th">Meeting Date & Time</th>
            <th id="th">Sector</th>
            <th id="th">Email</th>
            {/* <th id="th">Quotation</th> */}
            <th id="th">City</th>
            <th id="th">Address</th>
            <th id="th">Source</th>
            <th id="th">
              
              <select
                id="formselect"
                // aria-label="Default select example"
                title="status"
                onChange={(e) => handleclick(e)}
              >
                <option>Status </option>
                <option>Nagotiation </option>
                <option>Deal Won </option>
                <option>Deal Lost </option>
              </select>
            </th>
            <th id="th">
              {/* Assigned to */}
              <select
                title="Asign"
                id="formselect"
                onChange={(e) => handleclick(e)}
              >
                <option>Assigned to</option>
                {employeelist
                  .map((item) => (
                    <option key={item._id}>{item.fullname}</option>
                  ))}
              </select>
            </th>
            <th colSpan={3} id="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td>{item.name}</td>
              <td>{item.mobile_number}</td>
              <td>{item.meeting_time}</td>
              <td>{item.sector}</td>
              <td>{item.email}</td>
              {/* <td>{item.quotation}</td> */}
              <td>{item.city}</td>
              <td>{item.address}</td>
              <td>{item.source}</td>
              <td>{item.stage}</td>
              <td>{item.asign}</td>
              <td>
                <a
                  onClick={(e) => handleEdit(item._id)}
                  style={{ cursor: "pointer", textDecoration:"underline"}}
                >
                  Edit
                </a>
                </td>
                <td >
                <a
                
                  onClick={(e) => handleReasign(item._id)}
                  style={{ cursor: "pointer",textDecoration:"underline"}}
                >
                  Reassign
                </a>
                </td>
                 <td>
                <a
                  onClick={() => handDelete(item._id)}
                  style={{ cursor: "pointer" ,textDecoration:"underline"}}
                  className="text-danger"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <DeleteLead />
      <AddLeads />
      <ReasignLead />
    </div>
  );
};

export default ManageLeads;
