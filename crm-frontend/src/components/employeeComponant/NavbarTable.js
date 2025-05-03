import React, { useState } from 'react'
import Profile from '../../pages/employee/Profile'
import { BellFill, PersonCircle } from 'react-bootstrap-icons'
import PaginatedList from './PaginatedList'
import { Navbar, Form, Row, Col, Table,Dropdown, Nav, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setShow} from "../../redux/slice/EmployeSlice/ProfileSlice";
import { useTable } from './TableData';
import TodayReport from './TodayReport';
import CustomPagination from './CustomPagination';
const NavbarTable = () => {

  const {currentPage,totalPages,handlePageChange,handleclick} = useTable()

  let dispatch = useDispatch()
  const { profiledata } = useSelector((state) => state.empleeprofile);

  let [targetf, setTargetF] = useState(null);
  let [expanded, setExpanded] = useState(false)
  // let navigate = useNavigate();
  const ProfileEvent = (event) => {
    dispatch(setShow(true));
    setTargetF(event.target);
  };

  return (
    <>
    <Navbar expand="lg" id="navbartB" className='navbar-main' expanded={expanded}>
      <Container fluid>
        {/* CRM Title */}
        <Navbar.Brand className="navbar-title">CRM</Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Centered Report Section */}
          <Nav className="mx-auto">
            <TodayReport />
          </Nav>
          {/* Right Side (Search & Icons) */}
          <Nav className="ms-auto d-flex align-items-center navbar-right">
          <div className="pagination-container">
              <PaginatedList
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
            <Form className="search-form d-flex">
                {/* <CustomPagination/> */}
              {/* <Row> */}
                {/* <Col xs="auto"> */}
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="search-input"
                    onChange={(e) => handleclick(e)}
                  />
                {/* </Col> */}
              {/* </Row> */}
            </Form>

            {/* Notification & Profile Icons */}
            <div className="icon-group d-flex align-items-center">
              <BellFill size={25} className="nav-icon" />
              <PersonCircle size={25} className="nav-icon" onClick={ProfileEvent} />
              <Profile target={targetf} />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

  )
}

export default NavbarTable





// <div className="navbarTable">
// <Navbar className="justify-content-between" id="navbartB">
// {/* <PaginatedList
//     currentPage={currentPage}
//     totalPages={totalPages}
//     handlePageChange={handlePageChange}
//   /> */}
//   <h2 style={{color:"black", position:'relative', top:"3px", paddingLeft:"5px"}}>CRM</h2>

//   <div className='container'>

//    <TodayReport/>
//   </div>
//   <div style={{display:"flex", gap:"20px",}}>

//   {/* <h4> */}
//   <Form inline>
//     <Row>
//       <Col xs="auto">
//         <Form.Control
//           onChange={(e) => handleclick(e)}
//           type="text"
//           placeholder="Search"
//           className=" mr-sm-2 p-2 border border-dark"
//           id="searchbar"
//         />
//       </Col>
//     </Row>
//   </Form> 
//     <a className="profile">
//       <BellFill size={30}  style={{marginRight:"20px"}}/>
//       <PersonCircle size={30} onClick={ProfileEvent}/>
//       <Profile target={targetf} />
      
//     </a>

//   </div>
  
// </Navbar>

// </div>
