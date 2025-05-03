import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <>
     <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <NavLink className="nav-link" to="/admin">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Dashboard
            </NavLink>
            <div class="sb-sidenav-menu-heading">Employee</div>
            <NavLink className="nav-link" to="/admin/employees">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Employees
            </NavLink>
            <NavLink className="nav-link" to="/admin/leads">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Leads
            </NavLink>
            <NavLink className="nav-link" to="/admin/reports">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Reports
            </NavLink>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          CRM 
        </div>
      </nav>
    </div>
    </>
  )
}

export default SideNavbar