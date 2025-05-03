import React from "react";
import Navbar from "../../components/vendorComponent/Header/Navbar";
import SideNavbar from "../../components/vendorComponent/Header/SideNavbar";
import Content from "../../components/vendorComponent/Dashboard/Content";
import MainTable from "../../components/vendorComponent/Dashboard/MainTable";


const SuperAdminDashboard = () => {
  return (
    <>
      {/* <Navbar/> */}

      <div className="sb-nav-fixed">
        <Navbar />
        <div
          id="layoutSidenav"
          style={{ display: "flex", height: "100vh", overflow: "hidden" }}
        >
          <SideNavbar />
          <div
            id="layoutSidenav_content"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <main
              style={{
                flex: 1,
                overflow: "auto",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
              className="Dash"
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "50px",
                }}
              >
                <Content />
                <MainTable />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
