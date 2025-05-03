import React from 'react'
import HeaderNavbar from '../../components/superadminComponent/HeaderNavbar'
import SideNavbar from '../../components/superadminComponent/SideNavbar'


const SuperAdminReports = () => {
  return (
    <div
    className="bg-light-gray navbar-fixed sidebar-fixed"
    style={{ backgroundColor: "#F0F1F5" }}
    id="body"
  >
    <div id="toaster"></div>
    <div class="wrapper">
        <SideNavbar />
      <div className="page-wrapper">
        <HeaderNavbar />

        <div className="content-wrapper">
          <div className="content">
            {/* <SalesYear /> */}

            <div className="col-12 mb-6">
              {/* <VendorTable /> */}
            </div>

            <div className="col-12">
              {/* <EmployeeTable /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SuperAdminReports