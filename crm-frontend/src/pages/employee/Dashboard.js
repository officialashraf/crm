/* eslint-disable no-unused-vars */
import React from "react";
import dashboard from "../../assets/style/employecss/dashboard.css";
import Plusbutton from "../../components/employeeComponant/Plusbutton";
// import { Outlet } from "react-router-dom";
import { TableData } from "../../components/employeeComponant/TableData";
import { Table } from "react-bootstrap";
import TableHeader from "../../components/employeeComponant/TableHeader";
import TableBody from "../../components/employeeComponant/TableBody";
import NavbarTable from "../../components/employeeComponant/NavbarTable";
import TodayReport from "../../components/employeeComponant/TodayReport";
import PaginatedList from "../../components/employeeComponant/PaginatedList";
import DataTable from "../../components/employeeComponant/DataTable";

const Dashboard = () => {
  return (
    <>
      <TableData> 
        <div className="dashboard"> 
    {/* <div className="navbarTable"> */}
            <NavbarTable />
    {/* </div> */}

            <div className="tableresponsive">
              <Table className="custom-table">
        
                <thead id="thead">
                  <TableHeader />
                </thead>
                <tbody>
                  <TableBody />
                </tbody>
              </Table>
            </div>
          {/* </div> */}

          <div id="dashboardFloatingButton">
            <Plusbutton />
          </div>
        </div>
      </TableData>
    </>
  );
};

export default Dashboard;
