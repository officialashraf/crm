import React ,{useState}from "react";
import { useSelector } from "react-redux";
import { useTable } from "./TableData";
import { FunnelFill } from "react-bootstrap-icons";
import DynamicHeader from "./DynamicHeader";
import "../../assets/style/employecss/dashboard.css"

const TableHeader = () => {
  const data = useSelector((state) => state.employeedata);
  const { search, handleclick } = useTable();
    
  

  return (
    <>
    {/* <thead> */}
      
       <tr >
      
        <th style={{border:"1px solid black",width:"70px", backgroundColor:"#D9D9D9"}}>Sr.No </th>
        <th id="th">Name</th>
        <th id="th">Mobile No.</th>
        <th id="th">Comment</th>
        <th id="th">
          {/* <input
            type="date"
            onChange={(e) => handleclick(e)}
            value={search}
            className="d-flex"
            // id="datesearch"
            style={{
              border: "none",
              // padding: "5px",
              backgroundColor: "transparent",
              outline: "none", // Removes focus outline
              appearance: "none", // Removes default dropdown styling (optional)
            }}
          /> */}
          Follow Date & Time
        </th>
        <th id="th">Meeting Date & Time</th>
        <th id="th">Email </th>

        <th id="th">
          <select
            style={{
              border: "none",
              padding: "5px",
              backgroundColor: "transparent",
              outline: "none", // Removes focus outline
              // appearance: "none", // Removes default dropdown styling (optional)
            }}
            title="Sector"
            id="formselect"
            onChange={(e) => handleclick(e)}
          >
            <option value="">City</option>
            {data
              .filter(
                (item, index, self) =>
                  index === self.findIndex((t) => t.city === item.city)
              )
              .map((item) => (
                <option key={item._id}>{item.city}</option>
              ))}
          </select>
        </th>
        <th id="th">
          <select
            style={{
             fontWeight:"bold",
              border: "none",
              padding: "5px",
              backgroundColor: "transparent",
              outline: "none", // Removes focus outline
              // appearance: "none", // Removes default dropdown styling (optional)
            }}
            title="Sector"
            // id="formselect"
            onChange={(e) => handleclick(e)}
          >
            <option value="">Sectors</option>
            {data
              .filter(
                (item, index, self) =>
                  index === self.findIndex((t) => t.sector === item.sector)
              )
              .map((item) => (
                <option key={item._id}>{item.sector}</option>
              ))}
          </select>
        </th>
        <th id="th">Address</th>
        <th id="th">Quotation</th>
        <th id="th">
          <select
            style={{
            fontWeight:"bold",
              border: "none",
              padding: "5px",
              backgroundColor: "transparent",
              outline: "none", // Removes focus outline
              // appearance: "none", // Removes default dropdown styling (optional)
            }}
            // id="formselect"
            aria-label="Default select example"
            title="Stage"
            onChange={(e) => handleclick(e)}
          >
            <option value="">Stages </option>
            <option>Nagotiation </option>
            <option>Deal Won </option>
            <option>Deal Lost </option>
          </select>
        </th>
        <th id="th">
          <select
            style={{
             fontWeight:"bold",
              border: "none",
              padding: "5px",
              backgroundColor: "transparent",
              outline: "none", // Removes focus outline
              // appearance: "none", // Removes default dropdown styling (optional)
            }}
            // id="formselect"
            aria-label="Default select example"
            title="Stage"
            onChange={(e) => handleclick(e)}
          >
            <option value="">Source </option>
            <option>WhatsApp </option>
            <option>FaceBook </option>
            <option>Instagram </option>
          </select>

          {/* <FunnelFill type="button" onClick={() => setDropdownOpen(!dropdownOpen)}/> */}
        </th>
      </tr> 
    {/* </thead> */}
    </>
  );
};

export default TableHeader;
