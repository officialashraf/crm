let Lead = require("../models/LeadSchema");
let moment = require("moment");
const { trusted } = require("mongoose");
let XLSX = require("xlsx");

let CreateLeads = async (req, res) => {
  try {
    let data = req.body;

    // Check if data is an array (bulk upload)
    if (Array.isArray(data)) {
      const leads = data.map((lead) => ({
        name: lead.name,
        mobile_number: lead.mobile_number,
        email: lead.email,
        comments: lead.comments || [
          { call: "", timedate: "", comment: "", datetime: "" },
        ],
        meeting_time: lead.meeting_time,
        city: lead.city,
        sector: lead.sector,
        address: lead.address,
        quotation: lead.quotation || { items: "", amount: "" },
        asign: lead.asign,
        stage: lead.stage,
        source: lead.source,
      }));

      // Insert multiple leads at once
      await Lead.insertMany(leads);

      return res.status(201).json({
        message: "Bulk leads created successfully",
        count: leads.length,
        leads,
      });
    }
    const {
      name,
      mobile_number,
      email,
      comments,
      meeting_time,
      city,
      sector,
      address,
      quotation,
      asign,
      stage,
      source,
    } = data;

    const newLead = new Lead({
      name,
      mobile_number,
      email,
      comments: comments || [
        { call: "", timedate: "", comment: "", datetime: "" },
      ],
      meeting_time,
      city,
      sector,
      address,
      quotation: quotation || { items: "", amount: "" },
      asign,
      stage: stage,
      source:source,
    });

    await newLead.save();

    res.status(201).json({
      message: "Lead created successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });
  }
};
const GetLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error("error  fetching leads", error);
    res.status(500).json({ massage: "error fetching leads", error });
  }
};

// const GetLeadsbyAdmin = async (req, res) => {
//   try {
//     const { adminId } = req.params;
//     const leads = await Lead.find({ adminId });
//     res.status(200).json(leads);
//   } catch (error) {
//     console.error("errror Fetching lead", error);
//     res.status(500).json({ massage: "error fetching Leads", error });
//   }
  
// };

const getLeadsByAdmin = async(req,res)=>{
   try {
        const { adminId } = req.params;
        const leads = await Lead.find({ adminId });
        res.status(200).json(leads);
      } catch (error) {
        console.error("errror Fetching lead", error);
        res.status(500).json({ massage: "error fetching Leads", error });
      }
      
}


const GetLeadsByEmployee = async (req, res) => {
  try {
    const { employeeid } = req.params; 
    if(!employeeid){
      return res.status(400).json({massage:"employee id note found"})
    }
    const leads = await Lead.find({employeeid});
    res.status(200).json(leads);
  } catch (error) {
    console.error("Error fetching leads by employee:", error);
    res.status(500).json({
      message: "Error fetching leads by employee",
      error: error.message,
    });
  }
};

// const GetasignLeads = async (req, res) => {
//   try {
//     const { employeeid } = req.params;

//     const lead = await Lead.find({ employeeid });
//     res.status(200).json(lead);
//   } catch (error) {
//     console.error("error fetching lead", error);
//     res.status(500).json({ massage: "error Fetching Leads", error });
//   }
// };

const CreateAsignLeads = async (req, res) => {
  try {
    const {
      employeeid,
      adminId,
      name,
      mobile_number,
      email,
      comments,
      city,
      sector,
      address,
      quotation,
      stage,
      source,
      meeting_time,
      asign,
    } = req.body;

    const lead = new Lead({
      employeeid: employeeid || "",
      adminId: adminId || "",
      name: name || "",
      mobile_number: mobile_number || "",
      email: email || "",
      comments: comments || [
        { call: "", timedate: "", comment: "", datetime: "" },
      ],
      meeting_time: meeting_time || "",
      city: city || "",
      sector: sector || "",
      address: address || "",
      quotation: quotation || { items: "", amount: "" },
      asign: asign || "",
      stage: stage || "",
      source: source || "",
    });
    await lead.save();
    res
      .status(201)
      .json({ success: true, massage: "Lead Added successFully", data: lead });
  } catch (error) {
    console.error("error Lead Added ", error);
    res.status(500).json({ massage: "error Added Leads", error });
  }
};

const BulkUploadLeadsByEmployee = async (req, res) => {
  try {
    const { employeeid,adminId } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, massage: "no file Upload" });
    }
    if (!employeeid) {
      return res
        .status(400)
        .json({ success: false, massage: "Employee Id is require" });
    }
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return res
        .status(400)
        .json({ success: false, massage: "excel is empty" });
    }

    const leads = sheetData.map((row) => ({
      employeeid: employeeid, 
      adminId: adminId, 
      name: row.name || "",
      mobile_number: row.mobile_number || "",
      email: row.email || "",
      comments: row.comments
        ? [{ call: "", timedate: "", comment: row.comments, datetime: "" }]
        : [],
      meeting_time: row.meeting_time || "",
      city: row.city || "",
      sector: row.sector || "",
      address: row.address || "",
      quotation: row.quotation
        ? { items: row.quotation, amount: "" }
        : { items: "", amount: "" },
      asign: row.asign || "",
      stage: row.stage || "",
      source: row.source || "",
    }));

    await Lead.insertMany(leads);

    res
      .status(201)
      .json({
        success: true,
        massage: "bulk UPload Successfully",
        data: leads,
      });
  } catch (error) {
    console.error("error in bulk upload ", error);
    res.status(500).json({ massage: "error in bulk upload", error });
  }
};

const BulkDeletLeads = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || id.length === 0) {
      return res
        .status(400)
        .json({ success: false, massage: "No Lead selected " });
    }
    const result = Lead.deleteMany({ _id: { $in: id } });
    if ((await result).deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, massage: "no Matching Leads" });
    }
    res.status(200).json({
      success: true,
      massage: `${result.deletedCount} Lead Delete Successfully`,
    });
  } catch (error) {
    console.error("error Deleting Leads", error);
    res
      .status(500)
      .json({ success: false, massage: "Delete Lead error", error });
  }
};

const DeleteLeads = async (req, res) => {
  try {
    let { id } = req.params;
    let deleteLeads = await Lead.findByIdAndDelete(id);
    if (!deleteLeads) {
      return res.status(404).json({ massage: "Leads Note found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

const UpdateLeads = async (req, res) => {
  try {
    const { id } = req.params; 
    const { employeeid } = req.body;

    // Validate required field
    if (!employeeid) {
      return res.status(400).json({ message: "Assigned value is required" });
    }

    let updatedData = { ...req.body }; // Include all fields from req.body

    if (id) {
      // **SINGLE UPDATE** (If id is provided)
      const updatedEmployee = await Lead.findByIdAndUpdate(
        id,
        updatedData,
        { new: true } // Return the updated document
      );

      // Handle case where no document is found
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Lead not found" });
      }

      // Return success response with updated document
      return res.status(200).json({
        message: "Lead updated successfully",
        data: updatedEmployee,
      });
    } else {
      // **BULK UPDATE** (If id is NOT provided)
      const updateResult = await Lead.updateMany(
        {
          $or: [
            { employeeid: null },
            { employeeid: "" },
            { employeeid: "null" },
          ],
        }, // Check for unassigned leads
        { $set: { employeeid: employeeid } }
      );

      // Handle case where no leads are updated
      if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "No leads found to update" });
      }

      // Return success response with count of updated leads
      return res.status(200).json({
        message: `Updated ${updateResult.modifiedCount} leads successfully`,
      });
    }
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({
      message: "Failed to update lead(s)",
      error: error.message,
    });
  }
};


const CallingReport = async (req, res) => {
  try {
    const {id, day, month, year} = req.params;

    // console.log("🆔 Employee ID:", employeeid);
    // console.log("📅 Day:", day);
    // console.log("📅 Month:", month);
    // console.log("📅 Year:", year)

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    // Convert to UTC dates for the specific day
    const startDate = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0, 0));
const endDate = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));


// let filter = {};

// if(employeeid){
//   filter.employeeid = employeeid;
// }else if(adminId){
//   filter.adminId = adminId;
// }

let filter = {
  $or: [{ adminId: id }, { employeeid: id }]
};



    
    const leads = await Lead.find({
      // employeeid: employeeid,
      // createdAt: { $gte: startDate, $lte: endDate },
      // updatedAt: { $gte: startDate, $lte: endDate },
     $and:[
      filter,
      {$or:[
        {createdAt: { $gte: startDate, $lte: endDate }},
        {updatedAt: { $gte: startDate, $lte: endDate }},
      ]}]
    });

    
    console.log("📌 Leads Found:", leads.length);

    
    let report = {
      // adminId: adminId || null,
      // employeeid: employeeid || null,
      id:'',
      date: `${day}/${month}/${year}`,
      totalCalls: leads.length,
      callPickedUp: 0,
      callNotPickedUp: 0,
      followUpScheduled: 0,
      interested: 0,
      notInterested: 0,
      followUpDate: 0,
      meetingScheduled: 0,
      dealWon: 0,
      dealLost: 0,
      negotiation: 0,
      totalDeals: 0,
      totalQuotation: 0,
      quotationItems: [],
      quotationAmounts: [],
    };

    // Process leads to count call statuses
    leads.forEach((lead) => {
      let hasCalling = false;
      let hasDeal = false;

      if (lead.comments && lead.comments.length > 0) {
        lead.comments.forEach((comment) => {
          if (comment.call === "Call Picked Up") report.callPickedUp++;
          if (comment.call === "Call Not Picked Up") report.callNotPickedUp++;
          if (comment.call === "Follow Up scheduled") report.followUpScheduled++;
          if (comment.call === "Interested") report.interested++;
          if (comment.call === "Not Interested") report.notInterested++;
          hasCalling = true;
        });
      }

      if(lead.comments && lead.comments.length > 0){
        lead.comments.forEach((followup)=>{
          if(followup.datetime === "") report.followUpDate++;
        })
      }

      // Count meetings
  if (lead.meeting_time && lead.meeting_time !== "") {
    report.meetingScheduled++;
  }

  // Count deal stages
  if (lead.stage === "Deal Won"){
    report.dealWon++;
    hasDeal = true;

  } 
  if (lead.stage === "Deal Lost"){
    report.dealLost++;
    hasDeal = true;
  }
    if (lead.stage === "Nagotiation"){
      report.negotiation++;
      hasDeal = true;
    }

  // Count total deals
  if(hasDeal){
    report.totalDeals++;
  }
  if(hasCalling){
    report.totalCalls++
  }

  // Process quotations
  if (lead.quotation) {
    if (lead.quotation.amount) {
      report.totalQuotation += parseFloat(lead.quotation.amount);
      report.quotationAmounts.push(lead.quotation.amount);
    }
    if (lead.quotation.items) {
      report.quotationItems.push(lead.quotation.items);
      // report.quotationItems = [...new Set([...report.quotationItems, ...lead.quotation.items])]
    }
  }
    });

    // Send final report as response
    console.log("final report", report)
    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      message: "Error fetching leads",
      error: error.message,
    });
  }
};



const getEmployeeAggregateDate = async (req, res) => {
  try {
    const { employeeid } = req.params;
    const leads = await Lead.find({ employeeid });
    if (!leads || leads.length === 0) {
      return res.status(200).json({
        totalFollowUp: 0,
        totalMeetings: 0,
        totalInterested: 0,
        totalQuotations: 0,
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let totalFollowUp = 0;
    let totalMeetings = 0;
    let totalInterested = 0;
    let totalQuotations = 0;

    leads.forEach((lead) => {
      if (lead.comments.length > 0) {
        // Ensure there are comments
        const lastComment = lead.comments[lead.comments.length - 1]; // Get the last comment

        if (lastComment.datetime && lastComment.datetime.trim() !== "") {
          const commentDate = new Date(lastComment.datetime);
          commentDate.setHours(0, 0, 0, 0);

          if (commentDate.getTime() <= today.getTime()) {
            // Check if it's today or earlier
            totalFollowUp++;
          }
        }
      }

      // lead.comments.forEach((comment) => {
      //   if (comment.call === "Interested") {
      //     totalInterested++;
      //   }
      // });

      if (lead.meeting_time && lead.meeting_time.trim() !== "") {
        const meetingDate = moment(lead.meeting_time, "D/M/YYYY, h:mm:ss a");
        // meetingDate.setHours(0,0,0,0);
        if (meetingDate.isValid()) {
          if (meetingDate.isSameOrBefore(moment(today), "day")) {
            totalMeetings++;
          }
        } else {
          console.error("Invalid Date time formate", lead.meeting_time);
        }

        // if(meetingDate.isValid() && meetingDate.isSame(moment(today),'day')){
        //   totalMeetings++;
        // }else if(!meetingDate.isValid()){
        //   console.error("Invalid Meeting Date Formate", lead.meeting_time);
        // }
      }

      // if (lead.quotation && lead.quotation.amount) {
      //   totalQuotations++;
      // }
    });
    res.status(200).json({
      totalFollowUp,
      totalMeetings,
      totalInterested,
      totalQuotations,
    });
  } catch (error) {
    console.error(" Error Aggregating employee lead data (simple):", error);
    res
      .status(500)
      .json({ massage: "Internal Server error", error: error.massage });
  }
};

const getAdminAggregateDate = async (req, res) => {
  try {
    const { adminId } = req.params;
    const leads = await Lead.find({ adminId });
    if (!leads || leads.length === 0) {
      return res.status(200).json({
        totalFollowUp: 0,
        totalMeetings: 0,
        totalDealWon: 0,
        totalQuotations: 0,
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let totalFollowUp = 0;
    let totalMeetings = 0;
    let totalDealWon = 0;
    let totalQuotations = 0;

    leads.forEach((lead) => {
      if (lead.comments.length > 0) {
        // Ensure there are comments
        const lastComment = lead.comments[lead.comments.length - 1]; // Get the last comment

        if (lastComment.datetime && lastComment.datetime.trim() !== "") {
          const commentDate = new Date(lastComment.datetime);
          commentDate.setHours(0, 0, 0, 0);

          if (commentDate.getTime() <= today.getTime()) {
            // Check if it's today or earlier
            totalFollowUp++;
          }
        }
      }

      
        if (lead.stage === "Deal Won") {
          const dealdate = moment(lead.updatedAt);
          if(dealdate.isValid() && dealdate.isSame(today, 'day')){

            totalDealWon++;
          }
        }
    

      if (lead.meeting_time && lead.meeting_time.trim() !== "") {
        const meetingDate = moment(lead.meeting_time, "D/M/YYYY, h:mm:ss a");
        // meetingDate.setHours(0,0,0,0);
        if (meetingDate.isValid()) {
          if (meetingDate.isSameOrBefore(moment(today), "day")) {
            totalMeetings++;
          }
        } else {
          console.error("Invalid Date time formate", lead.meeting_time);
        }

        // if(meetingDate.isValid() && meetingDate.isSame(moment(today),'day')){
        //   totalMeetings++;
        // }else if(!meetingDate.isValid()){
        //   console.error("Invalid Meeting Date Formate", lead.meeting_time);
        // }
      }

      if (lead.quotation && lead.quotation.amount || lead.quotation.items) {
        const quotationDate = moment(lead.quotation.createdAt);
        if(quotationDate.isValid() && quotationDate.isSame(today, 'day')){

          totalQuotations++;
        }
      }
    });
    res.status(200).json({
      totalFollowUp,
      totalMeetings,
      totalDealWon,
      totalQuotations,
    });
  } catch (error) {
    console.error(" Error Aggregating employee lead data (simple):", error);
    res
      .status(500)
      .json({ massage: "Internal Server error", error: error.massage });
  }
};




module.exports = {
  CreateLeads,
  GetLeads,
  DeleteLeads,
  UpdateLeads,
  GetLeadsByEmployee,
  CallingReport,
  getEmployeeAggregateDate,
  
  // GetasignLeads,
  CreateAsignLeads,
  BulkUploadLeadsByEmployee,
  BulkDeletLeads,
  // GetLeadsbyAdmin,


  getLeadsByAdmin,



  getAdminAggregateDate
};











































// console.log("Requested Date:", `${day}/${month}/${year}`);

    

// const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
// const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

// console.log("Start Date (UTC):", startDate);
// console.log("End Date (UTC):", endDate);

// const allLeads = await Lead.find({ employeeid: employeeid });
// console.log("All Leads for Employee:", allLeads.length);

// Fetch leads from database
// const leads = await Lead.find({
  // employeeid: employeeid,
  // createdAt: { $gte: startDate, $lte: endDate },
// });
// console.log("Total Leads Found:", leads.length);

// console.log("Leads Found on Given Date:", leads.length);

// if (leads.length === 0) {
//   return res.status(404).json({ message: "No leads found for this date." });
// }

// let report = {
  // employeeid: employeeid,
  // date: `${day}/${month}/${year}`,
  // totalCalls: 0,
  // callPickedUp: 0,
  // callNotPickedUp: 0,
  // followUpScheduled: 0,
  // interested: 0,
  // notInterested: 0,
  // meetingScheduled: 0,
  // dealWon: 0,
  // dealLost: 0,
  // negotiation: 0,
  // totalDeals: 0,
  // totalQuotation: 0,
  // quotationItems: [],
  // quotationAmounts: [],
// };

// Process each lead
// leads.forEach((lead) => {
//   report.totalCalls++;

  // Process comments
  // if (lead.comments && lead.comments.length > 0) {
  //   lead.comments.forEach((comment) => {
  //     if (comment.call === "Call Picked Up") report.callPickedUp++;
  //     if (comment.call === "Call Not Picked Up") report.callNotPickedUp++;
  //     if (comment.call === "Follow Up scheduled") report.followUpScheduled++;
  //     if (comment.call === "Interested") report.interested++;
  //     if (comment.call === "Not Interested") report.notInterested++;
  //   });
  // }

  // Count meetings
  // if (lead.meeting_time && lead.meeting_time !== "") {
  //   report.meetingScheduled++;
  // }

  // Count deal stages
  // if (lead.stage === "Deal Won") report.dealWon++;
  // if (lead.stage === "Deal Lost") report.dealLost++;
  // if (lead.stage === "Negotiation") report.negotiation++;

  // Count total deals
  // report.totalDeals++;

  // Process quotations
//   if (lead.quotation) {
//     if (lead.quotation.amount) {
//       report.totalQuotation += parseFloat(lead.quotation.amount);
//       report.quotationAmounts.push(lead.quotation.amount);
//     }
//     if (lead.quotation.items) {
//       report.quotationItems.push(lead.quotation.items);
//     }
//   }
// });