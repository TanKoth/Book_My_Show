import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { ResetPassword } from "../../api/User";
import { message } from "antd";
import { useParams, useNavigate } from "react-router-dom";

function Reset() {
  const { email } = useParams(); // Extract email from URL parameters
  console.log("email", email);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await ResetPassword(values, email);
      if (response.success) {
        message.success(response.message);
        // window.location.href = "/login";
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Reset Password</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="OTP"
                htmlFor="otp"
                name="otp"
                className="d-block"
                rules={[{ required: true, message: "OTP is required" }]}
              >
                <Input
                  id="otp"
                  type="number"
                  placeholder="Enter your otp"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[
                  {
                    required: true,
                    message: "Please input your passwword ",
                  },
                  {
                    pattern: new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
                    ),
                    message:
                      "Password must contain atleast 1 uppercase, 1 lowercase and 1 number",
                  },
                ]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                ></Input>
              </Form.Item>
              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  RESET PASSWORD
                </Button>
              </Form.Item>
            </Form>
          </section>
        </main>
      </header>
    </>
  );
}

export default Reset;
