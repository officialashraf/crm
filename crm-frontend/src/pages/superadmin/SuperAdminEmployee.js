import React from 'react'
import HeaderNavbar from '../../components/superadminComponent/HeaderNavbar'
import SideNavbar from '../../components/superadminComponent/SideNavbar'
import Vendors from './Vendors'
import Employees from './Employees'

const SuperAdminEmployee = () => {
  return (
    <>
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
                {/* <Vendors/> */}
                <Employees/>

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
    
    </>
                  
  )
}

export default SuperAdminEmployee