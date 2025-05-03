import React from 'react'
import { NavLink } from 'react-router-dom'
const SideNavbar = () => {
  return (
    <>


              <aside className="left-sidebar sidebar-dark" id="left-sidebar">
                <div id="sidebar" className="sidebar sidebar-with-footer">
                  {/* <!-- Aplication Brand --> */}
                  <div className="app-brand">
                    <a>
                      <img src="/monocss/images/logo.png" alt="Mono" />
                      <span className="brand-name">SuperVizer</span>
                    </a>
                  </div>
                  {/* <!-- begin sidebar scrollbar --> */}
                  <div
                    className="sidebar-left"
                    data-simplebar
                    style={{ height: "100%" }}
                  >
                    {/* <!-- sidebar menu --> */}
                    <ul className="nav sidebar-inner" id="sidebar-menu">
                      <li className="active">
                        <NavLink className="sidenav-item-link" to="/superadmin">
                          <i className="mdi mdi-briefcase-account-outline"></i>
                          <span className="nav-text">Business Dashboard</span>
                        </NavLink>
                      </li>

                      <li className="section-title">Pages</li>

                      <li>
                        <NavLink className="sidenav-item-link" to="/superadmin/vendor">
                          <i className="mdi mdi-table-large"></i>
                          <span className="nav-text">Vendor</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink className="sidenav-item-link" to="/superadmin/employees">
                          <i className="mdi mdi-chart-pie"></i>
                          <span className="nav-text">Employee</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink className="sidenav-item-link" to="/superadmin/reports">
                          <i className="mdi mdi-account-group"></i>
                          <span className="nav-text">Report</span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink className="sidenav-item-link" to="/superadmin">
                          <i className="mdi mdi-calendar-check"></i>
                          <span className="nav-text">Graph</span>
                        </NavLink>
                      </li>

                    </ul>
                  </div>
                </div>
              </aside>
    
    </>
  )
}

export default SideNavbar