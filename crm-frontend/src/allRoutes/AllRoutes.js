import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/employee/Dashboard";
import Profile from "../pages/employee/Profile";
import Report from "../pages/employee/Report";
import Home from "../pages/admin/Home";
import Employee from "../pages/admin/Employee";
import Leads from "../pages/admin/Leads";
import Reports from "../pages/admin/Reports";
import EmployeeLogin from "../pages/employee/EmployeeLogin";
import AdminLogin from "../pages/admin/AdminLogin";
import LoginPage from "../pages/employee/LoginPage";
import SuperAdminDashboard from "../pages/Vendor/SuperAdminDashboard";
import Employees from "../pages/Vendor/Employees";
import Lead from "../pages/Vendor/Lead";
import AdminReports from "../pages/Vendor/AdminReports";
import Login from "../pages/Login";
import Vendor from "../pages/Vendor/Vendor";
import DashboardSuperAdmin from "../pages/superadmin/DashboardSuperAdmin";
import SuperAdmin from "../pages/superadmin/SuperAdmin";
import SuperAdminReports from "../pages/superadmin/SuperAdminReports";
import SuperAdminVendor from "../pages/superadmin/SuperAdminVendor";
import SuperAdminEmployee from "../pages/superadmin/SuperAdminEmployee";
import ServerError from "../pages/ServerError";
import NoteFound from "../pages/NoteFound";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<LoginPage />}/>
        <Route path="/employees" element={<EmployeeLogin />}>
           <Route index element={<Dashboard />} />
           <Route path="profile" element={<Profile />} />
           <Route path="report" element={<Report />} />
        </Route>
        
        {/* <Route path="/admin" element={<AdminLogin />}>
           <Route index element={<Home />} />
           <Route path="employees" element={<Employee />} />
           <Route path="leads" element={<Leads />} />
           <Route path="reports" element={<Reports />} />
        </Route> */}
        <Route path="/admin" element={<Vendor />}>
           <Route index element={<SuperAdminDashboard />} />
           <Route path="employees" element={<Employees />} />
           <Route path="leads" element={<Lead />} />
           <Route path="reports" element={<AdminReports />} />
        </Route>
        <Route path="/superadmin" element={<SuperAdmin/>}>
           <Route index element={<DashboardSuperAdmin />} />
           <Route path="vendor" element={<SuperAdminVendor/>} />
           <Route path="employees" element={<SuperAdminEmployee />} />
           <Route path="reports" element={<SuperAdminReports />} />
        </Route>
        {/* <Route path="/superadmins" element={<DashboardSuperAdmin/>}/> */}
        <Route path="*" element={<NoteFound/>} />
        <Route path="/serverError" element={<ServerError/>} />

    </Routes>
  );
};

export default AllRoutes;

