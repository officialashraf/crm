// require('../config/db');
const mongoose = require("../config/db");
const moment = require("moment");

const CommentSchema = new mongoose.Schema({
  call: { type: String },
  timedate: { type: String },
  comment: { type: String },
  datetime: { type: String },
});

// Define the schema for quotation
const QuotationSchema = new mongoose.Schema({
  items: { type: String },
  amount: { type: String },
});

// Define the main schema for employees (or entities)
const LeadSchema = new mongoose.Schema(
  {
    name: { type: String },
    mobile_number: { type: String },
    email: { type: String },
    comments: [CommentSchema], 
    meeting_time: { type: String },
    city: { type: String },
    sector: { type: String },
    address: { type: String },
    quotation: QuotationSchema, 
    asign: { type: String },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    employeeid: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    stage: { type: String },
    source: { type: String },
  },
  { timestamps: true }
);

const Leads = mongoose.model("Lead", LeadSchema);
module.exports = Leads;
