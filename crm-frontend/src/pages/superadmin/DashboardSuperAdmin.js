import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../monocss/plugins/bootstrap/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Chart } from "react-chartjs-2";
import SideNavbar from "../../components/superadminComponent/SideNavbar";
import HeaderNavbar from "../../components/superadminComponent/HeaderNavbar";
import SalesYear from "../../components/superadminComponent/SalesYear";
import EmployeeTable from "../../components/superadminComponent/EmployeeTable";
import Status from "../../components/superadminComponent/Status";
import VendorTable from "../../components/superadminComponent/VendorTable";
// import "../../monocss/plugins/bootstrap/js/bootstrap.bundle.min";

const DashboardSuperAdmin = () => {

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
                <SalesYear />

                <div className="col-12 mb-6">
                  <VendorTable />
                </div>

                <div className="col-12">
                  <EmployeeTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSuperAdmin;
