import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const HeaderNavbar = ({toggleSideBar}) => {
let navigate = useNavigate()

const handleLogout = ()=>{
  localStorage.removeItem("access-token")
  navigate("/")
}


  return (
    <>
    <header className="main-header" id="header">
                  <nav
                    className="navbar navbar-expand-lg navbar-light"
                    id="navbar" style={{height:"77px"}}
                  >
                    {/* <!-- Sidebar toggle button --> */}
                    <button id="sidebar-toggler" className="sidebar-toggle" onClick={toggleSideBar}>
                      <span className="sr-only">Toggle navigation</span>
                    </button>

                    <span className="page-title">dashboard</span>

                    <div className="navbar-right ">
                      {/* <!-- search form --> */}
                      <div className="search-form">
                        <form action="index.html" method="get">
                          <div
                            className="input-group input-group-sm"
                            id="input-group-search"
                          >
                            <input
                              type="text"
                              autocomplete="off"
                              name="query"
                              id="search-input"
                              className="form-control"
                              placeholder="Search..."
                            />
                            <div className="input-group-append">
                              <button className="btn" type="button">
                                {/* / */}
                              </button>
                            </div>
                          </div>
                        </form>
                  
                      </div>

                      <ul className="nav navbar-nav">
                      
                        <li className="custom-dropdown">
                          <button className="notify-toggler custom-dropdown-toggler">
                            <i className="mdi mdi-bell-outline icon"></i>
                            <span className="badge badge-xs rounded-circle">
                              21
                            </span>
                          </button>
                          <div className="dropdown-notify">
                            <header>
                              <div
                                className="nav nav-underline"
                                id="nav-tab"
                                role="tablist"
                              >
                                <a
                                  className="nav-item nav-link active"
                                  id="all-tabs"
                                  data-toggle="tab"
                                  href="#all"
                                  role="tab"
                                  aria-controls="nav-home"
                                  aria-selected="true"
                                >
                                  All (5)
                                </a>
                                <a
                                  className="nav-item nav-link"
                                  id="message-tab"
                                  data-toggle="tab"
                                  href="#message"
                                  role="tab"
                                  aria-controls="nav-profile"
                                  aria-selected="false"
                                >
                                  Msgs (4)
                                </a>
                                <a
                                  className="nav-item nav-link"
                                  id="other-tab"
                                  data-toggle="tab"
                                  href="#other"
                                  role="tab"
                                  aria-controls="nav-contact"
                                  aria-selected="false"
                                >
                                  Others (3)
                                </a>
                              </div>
                            </header>

                           
                            <footer className="border-top dropdown-notify-footer">
                              <div className="d-flex justify-content-between align-items-center py-2 px-4">
                                <span>Last updated 3 min ago</span>
                                <a
                                  id="refress-button"
                                  href="javascript:"
                                  className="btn mdi mdi-cached btn-refress"
                                ></a>
                              </div>
                            </footer>
                          </div>
                        </li>
                        {/* <!-- User Account --> */}
                        <li className="dropdown user-menu">
                          <button
                            className="dropdown-toggle nav-link"
                            data-toggle="dropdown"
                          >
                            <img
                              src="/monocss/images/user/user-xs-01.jpg"
                              className="user-image rounded-circle"
                              alt="User Image"
                            />
                            <span className="d-none d-lg-inline-block">
                              John Doe
                            </span>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-right">
                            <li>
                              <a
                                className="dropdown-link-item"
                                href="user-profile.html"
                              >
                                <i className="mdi mdi-account-outline"></i>
                                <span className="nav-text">My Profile</span>
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-link-item"
                                href="email-inbox.html"
                              >
                                <i className="mdi mdi-email-outline"></i>
                                <span className="nav-text">Message</span>
                                <span className="badge badge-pill badge-primary">
                                  24
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-link-item"
                                href="user-activities.html"
                              >
                                <i className="mdi mdi-diamond-stone"></i>
                                <span className="nav-text">Activitise</span>
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-link-item"
                                href="user-account-settings.html"
                              >
                                <i className="mdi mdi-settings"></i>
                                <span className="nav-text">
                                  Account Setting
                                </span>
                              </a>
                            </li>

                            <li className="dropdown-footer">
                              <a 
                                className="dropdown-link-item"
                                onClick={handleLogout}
                              >
                                
                                <i className="mdi mdi-logout" onClick={handleLogout}>
                                  
                                  </i> Log Out
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </header>
   
    </>
  )
}

export default HeaderNavbar