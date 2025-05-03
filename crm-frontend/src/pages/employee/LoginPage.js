// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../assets/style/employecss/Login.css";

// import { Stack, Alert } from "@mui/material";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState("send");
//   const [otp, setOtp] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [userType, setUserType] = useState("");

//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertSeverity, setAlertSeverity] = useState("success");
//   const [showAlert, setShowAlert] = useState(false);

//   const handlePhoneChange = (e) => setPhoneNumber(e.target.value);
//   const handleOtpChange = (e) => setOtp(e.target.value);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!phoneNumber) {
//       setError("Please enter your phone number.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Get user type from backend
//       const userCheckResponse = await axios.post(
//         "http://localhost:5000/check-user-type",
//         { number: phoneNumber }
//       );

//       if (userCheckResponse.data.userType) {
//         setUserType(userCheckResponse.data.userType);

//         // OTP send API
//         const endpoint =
//           userCheckResponse.data.userType === "employee"
//             ? "http://localhost:5000/employee/sendotp"
//             : "http://localhost:5000/admin/sendotp";

//         await axios.post(endpoint, { number: phoneNumber });

//         // alert("OTP sent successfully!");

//         setAlertMessage("OTP sent successfully!");
//         setAlertSeverity("success");
//         setShowAlert(true);

//         setStep("verify");

//         setError("");
//       } else {
//         setError("Phone number not found. Please check again.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setError("Failed to send OTP. Please try again.");

//       setAlertMessage("Failed to send OTP. Please try again");
//       setAlertSeverity("error");
//       setShowAlert(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       setError("Please enter your phone number and OTP.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Correct endpoint selection
//       const endpoint =
//         userType === "employee"
//           ? "http://localhost:5000/employee/verifyotp"
//           : "http://localhost:5000/admin/verify"; // Ensure this matches backend

//       const response = await axios.post(endpoint, { number: phoneNumber, otp });

//       if (response.data.token) {
//         localStorage.setItem("access-token", response.data.token);
//         // alert("OTP verified successfully!");

//         setAlertMessage("OTP verified successfully!");
//         setAlertSeverity("success");
//         setShowAlert(true);

//         // Navigate to respective dashboard
//         navigate(userType === "employee" ? "/employees" : "/admin");
//       } else {
//         setError("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setError("Failed to verify OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container fluid className="login-container">
//       <Row className="login-row">
//         <Col
//           md={6}
//           className="left-column "
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <h1>CRM </h1>
//         </Col>

//         <Col md={6} className="right-column">
//           {showAlert && (
//             <Stack sx={{ width: "50%" }} spacing={2}>
//               <Alert
//                 severity={alertSeverity}
//                 onClose={() => setShowAlert(false)}
//               >
//                 {alertMessage}
//               </Alert>
//             </Stack>
//           )}

//           <br />
//           <br />
//           <Form
//             className="login-form"
//             onSubmit={step === "send" ? handleSendOtp : handleVerifyOtp}
//           >
//             <Form.Group controlId="phoneNumber" className="mb-3">
//               {/* <Form.Label>Phone Number</Form.Label> */}
//               {step === "send" ? (
//                 <Form.Control
//                   type="text"
//                   value={phoneNumber}
//                   onChange={handlePhoneChange}
//                   placeholder="Enter your phone number"
//                   autoComplete="off"
//                   required
//                 />
//               ) : (
//                 <Form.Control
//                   type="text"
//                   value={otp}
//                   onChange={handleOtpChange}
//                   placeholder="Enter OTP"
//                   autoComplete="off"
//                   required
//                 />
//               )}
//             </Form.Group>
//             <Button type="submit" disabled={isLoading} className="mb-3 ">
//               {/* {isLoading ? "Sending OTP..." : "Send OTP"} */}
//               {isLoading
//                 ? step === "send"
//                   ? "Send OTP..."
//                   : "Verify OTP..."
//                 : step === "send"
//                 ? "Send OTP"
//                 : "Verify OTP"}
//             </Button>
//             <br />
//             {step === "verify" && (
//               <Button variant="link" onClick={() => setStep("send")}>
//                 Resend OTP
//               </Button>
//             )}
//           </Form>
//           {error && <p className="error-text mt-3">{error}</p>}
//         </Col>
//       </Row>
//       <Outlet />
//     </Container>
//   );
// };

// export default LoginPage;
