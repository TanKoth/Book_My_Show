import { Link } from "react-router-dom";
import { Form, Button, Input, message, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/User";
import { useState } from "react";
// import { ShimmerTitle } from "react-shimmer-effects";
import { FadeLoader } from "react-spinners";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await RegisterUser(values);
      console.log("response", response);
      if (response && response.success) {
        message.success(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        message.error(response.message);
        setIsLoading(false);
      }
    } catch (error) {
      message.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="App-header">
        {isLoading ? (
          <FadeLoader height={40} radius={20} width={10} />
        ) : (
          <>
            <h1>Register to Book My Show</h1>
            <section className="mw-500 text-center px-3">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Name"
                  htmlFor="name"
                  name="name"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                    { type: "String", message: "Please enter a valid name" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="w-100"
                  ></Input>
                </Form.Item>
                <Form.Item
                  label="Email"
                  htmlFor="email"
                  name="email"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your email"
                    className="w-100"
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
                      message: "Please enter your password",
                    },
                    // {
                    //   min: 4,
                    //   message: "Password must be atleast 4 characters",
                    // },
                    // {
                    //   max: 8,
                    //   message: "Password must be atmost 8 characters",
                    // },
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
                    type="password"
                    placeholder="Enter your password"
                    className="w-100"
                  ></Input>
                </Form.Item>
                <Form.Item
                  className="d-block"
                  label="Register as a Partner"
                  htmlFor="role"
                  name="role"
                  initialValue={false}
                  rules={[{ required: true, message: "Please select a role" }]}
                >
                  <div>
                    <Radio.Group name="radiogroup" className="flex-start">
                      <Radio value={"partner"}>Yes</Radio>
                      <Radio value={"user"}>No</Radio>
                    </Radio.Group>
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ fontSize: "1.5rem", fontWeight: "600" }}
                  >
                    Register
                  </Button>
                </Form.Item>
                <div>
                  <p>
                    Already User?<Link to={"/login"}>Login</Link>
                  </p>
                </div>
              </Form>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Register;
