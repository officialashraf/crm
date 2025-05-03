import React from 'react'
import HeaderNavbar from '../../components/superadminComponent/HeaderNavbar'
import SideNavbar from '../../components/superadminComponent/SideNavbar'
import Vendors from './Vendors'


const SuperAdminVendor = () => {
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
                <Vendors/>
                

                <div className="col-12 mb-6">
                  {/* <VendorTable /> */}
                </div>

                <div className="col-12">
                  {/* <EmployeeTable /> */}
                </div>

        
              </div>
            </div>

            {/* <!-- Footer --> */}
            {/* <footer className="footer mt-auto">
              <div className="copyright bg-white">
                <p>
                  &copy; <span id="copy-year"></span> Copyright Mono
                  Dashboard Bootstrap Template by{" "}
                  <a
                    className="text-primary"
                    href="http://www.iamabdus.com/"
                    target="_blank"
                  >
                    Abdus
                  </a>
                  .
                </p>
              </div>
             
            </footer> */}
          </div>
        </div>
      </div>
    {/* </div> */}
  {/* // </div> */}
  {/* // </div> */}
    </>
  )
}

export default SuperAdminVendor