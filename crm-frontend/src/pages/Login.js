import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/style/employecss/Login.css";

import { toast } from "react-toastify";

const Login = () => {
  let [otp, setOtp] = useState("");
  let [number, setNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!number) {
      toast.error("please Enter Your Number");
      return;
    }
    try {
      await axios.post("http://localhost:5000/login/sendotp", { number });
      toast.success("otp send Successfully");
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.massage || "error sending OTP");
    }
  };

  const verifyotp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please Enter the OTP");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/login/verify", {
        number,
        otp,
      });
      console.log("Api response", response.data)

      const { token, user } = response.data;

      if(!token || !user?.role){
        toast.error("invalid response from server")
      }

      console.log("user role", user.role)
    
      localStorage.setItem("access-token",token);
      toast.success("login Successfully");

      const role = user.role.toLowerCase()

      if (role === "superadmin") {
        navigate("/superadmin");
      } else if (role === "admin") {
        navigate("/admin");
      } else if (role === "employee") {
        navigate("/employees");
      }else{
        toast.error(`invalid User role ${role}`)
      }
    } catch (error) {
      toast.error(error.response?.data?.massage || "Invalid OTP");
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="login-row">
        <Col
          md={6}
          className="left-column "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>CRM </h1>
        </Col>

        <Col md={6} className="right-column">
          <br />
          <br />
          <Form className="login-form">
            <Form.Group controlId="phoneNumber" className="mb-3">
              {/* <Form.Label>Phone Number</Form.Label> */}

              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your phone number"
                autoComplete="off"
                required
              />
              { !isOtpSent ? (

              <Button type="submit" onClick={sendOtp} className="mb-3 ">
                send OTP
              </Button>
               ):( 
<>
              <Form.Control
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                autoComplete="off"
                required
                />

              <Button type="submit" className="btn btn-success" onClick={verifyotp}>
                verifyotp
              </Button>
                </>
  )}
            </Form.Group>

          </Form>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default Login;
