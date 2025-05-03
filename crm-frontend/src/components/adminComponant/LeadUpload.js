import axios from "axios";
import React ,{useEffect, useState}from "react";
import * as XLSX from "xlsx";
import LeadsCss from '../../assets/style/admincss/Leads.css'


const LeadUpload = () => {

    const [excelData, setExcelData] = useState([]);
 

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0]; // Get first sheet
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert to JSON

      // Map Excel data to MongoDB Schema
      const formattedData = jsonData.map((row) => ({
        name: row["Name"]|| "",
        mobile_number: row["Mobile Number"]|| "",
        email: row["Email"]|| "",
        city: row["City"]|| "",
        sector: row["Sector"]|| "",
        address: row["Address"]|| "",
        meeting_time: row["Meeting Time"]|| "",
        asign: row["Assigned To"]|| "",
        stage: row["Status"]|| "",
        source: row["Source"]|| "",

        // Handling nested objects
        quotation: {
          items: row["Quotation Items"] || "",
          amount: row["Quotation Amount"] || "",
        },
        comments: row["Comments"]
          ? [
              {
                call: row["Call"] || "",
                timedate: row["TimeDate"] || "",
                comment: row["Comments"]|| "",
                datetime: row["Datetime"]|| "",
              },
            ]
          : [],
      }));

      setExcelData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };
  const handleUploadToServer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/leads",
        excelData
      );
      console.log("Upload successful:", response.data);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading data.");
    }
  };

  return (
    <>
    <div class="container">
        <label for="file-UPLOAD" className="file-LABEL">Select Excel File</label>
        <input type="file" id="file-UPLOAD" className="file-INPUT" accept=".xls,.xlsx" onChange={handleFileUpload}/>
        <p id="file-NAME" className="file-NAME"></p>

        <button id="upload-BTN" className="upload-BTN" onClick={handleUploadToServer}
        disabled={excelData.length === 0}>Upload to Server</button>
    </div>
  
          </>
  );
};

export default LeadUpload;
