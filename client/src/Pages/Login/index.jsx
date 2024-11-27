import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/User";
import { FadeLoader } from "react-spinners";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);
  const onFinish = async (values) => {
    dispatch(ShowLoading());
    try {
      const response = await LoginUser(values);
      if (response && response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        message.error(response.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <>
      <main className="App-header">
        {loading ? (
          <FadeLoader height={40} radius={20} width={10} />
        ) : (
          <>
            <h1>Login to Book My Show</h1>
            <section className="mw-500 text-center px-3">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Email"
                  htmlFor="email"
                  name="email"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input
                    className="w-100"
                    type="email"
                    placeholder="Enter your email"
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
                    // {
                    //   min: 4,
                    //   message: "Password must be atleast 4 characters long",
                    // },
                    // {
                    //   max: 8,
                    //   message: "Password must be atmost 8 characters long",
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
                    className="w-100"
                    type="password"
                    placeholder="Enter your password"
                  ></Input>
                </Form.Item>
                <Form.Item className="d-block">
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ fontSize: "1.5rem", fontWeight: "600" }}
                  >
                    Login
                  </Button>
                </Form.Item>
                <div>
                  <p>
                    New User? <Link to={"/register"}>Register</Link>
                  </p>
                  <p>
                    Forget Password? <Link to={"/forget"}>Click Here</Link>
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

export default Login;
