const express = require("express");
const { CreateLeads,GetLeads,DeleteLeads,BulkDeletLeads,getAdminAggregateDate,getLeadsByAdmin,GetLeadsbyAdmin,BulkUploadLeadsByEmployee,CreateAsignLeads,GetasignLeads,UpdateLeads,GetLeadsByEmployee,CallingReport,getEmployeeAggregateDate} = require("../controllers/LeadController");
const upload = require("../middlewares/upload")


let routes = express.Router();


routes.post("/bulk-upload",upload.single("file"),BulkUploadLeadsByEmployee)
routes.post('/asignlead',CreateAsignLeads)
routes.get('/employee/:employeeid',GetLeadsByEmployee)

routes.get('/admin/:adminId',getLeadsByAdmin)


routes.post('/bulk-delete',BulkDeletLeads)

// routes.get('/admin/:adminId',getLeadsByAdmin)

// routes.get('/employee/:employeeid',GetLeadsByEmployee)

routes.post('/',CreateLeads)
routes.get('/',GetLeads)

routes.delete('/:id',DeleteLeads)

routes.put('/:id?',UpdateLeads)

routes.get('/report/:id/:day/:month/:year/',CallingReport)
routes.get('/aggregatedtask/:employeeid/',getEmployeeAggregateDate)


routes.get('/admin/aggregatedtask/:adminId/',getAdminAggregateDate)

module.exports = routes;