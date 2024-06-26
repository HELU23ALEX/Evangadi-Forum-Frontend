import { useRef, useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import LayOut from "../components/LayOut/LayOut";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const emailDom = useRef();
  const passwordDom = useRef();

  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // const passwordDom = useRef();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      // alert("please provide all required fields !");
      setError("please provide all required fields !");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      // alert("logged in successfully");

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      console.log(data);
      setSuccess("logged in successfully");
    } catch (error) {
      // alert(error?.response?.data?.msg);
      console.log(error.response.data);
      setError("Invalid credential");
    }
  };

  return (
    <LayOut>
      <section className={classes.both}>
        <section className={classes.login}>
          <div className={classes.login_container}>
            <h2>Login to your account</h2>
            {error && (
              <p
                style={{
                  textAlign: "center",
                  color: "red",
                  marginBottom: "13px",
                }}
              >
                {error}
              </p>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "15px",
              }}
            >
              <span>Don't Have an Account?</span>
              <Link to={"/register"} style={{ marginTop: "0px" }}>
                Create a new account
              </Link>
            </div>

            {/* <Link to={"/register"} className={classes.createAccountLink}>
              Create a new account
            </Link> */}
            <form onSubmit={handleSubmit}>
              <div>
                <span>email </span>
                <input ref={emailDom} type="email" placeholder="email" />
              </div>
              <br />
              <div>
                <span>Password </span>
                {/* <input ref={passwordDom} type="password" placeholder="password" /> */}
                <div
                  className={classes.password_container}
                  style={{
                    outline: "2px solid #ccc",
                    // backgroundColor: "#E8F0FE",
                    backgroundColor: isFocused ? "#white" : "#E8F0FE",
                    alignItems: "center",
                  }}
                >
                  <input
                    ref={passwordDom}
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    id="password-field"
                    style={{
                      border: "none",
                      backgroundColor: isFocused ? "#white" : "#E8F0FE",
                      // backgroundColor: "white",
                      // backgroundColor: "lightblue",
                      outline: "none",
                      zIndex: "1",
                      // alignItems: "center",
                    }}
                    onFocus={() => setIsFocused(false)}
                  />
                  <section
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      color: "black",
                      justifyContent: "center",
                      // backgroundColor: "white",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  </section>
                </div>
              </div>
              <br />
              <button className={classes.btn} type="submit">
                Login
              </button>
            </form>
            <Link to={"/register"}>Create an account</Link>
            {success && (
              <p style={{ color: "green", textAlign: "center" }}>{success}</p>
            )}
          </div>
        </section>
        <section className={classes.para}>
          <div className={classes.para_container}>
            <Link>About</Link>
            <div>
              <h1>Evangadi Networks Q&A</h1>
            </div>
            <div>
              <p>
                No matter what stage of life you are in, whether you’re just
                starting elementary school or being promoted to CEO of a Fortune
                500 company, you have much to offer to those who are trying to
                follow in your footsteps.
              </p>
              <p>
                Wheather you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
            </div>
            <button>How it Works</button>
          </div>
        </section>
      </section>
    </LayOut>
  );
};

export default Login;
