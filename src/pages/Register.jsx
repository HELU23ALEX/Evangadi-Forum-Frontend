import { useRef, useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";
import LayOut from "../components/LayOut/LayOut";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
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

    // const usernameValue=e.target.value
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      // alert("please provide all required fields !");
      setError("please provide all required fields !");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successfully.please login");
      navigate("/");
      setSuccess("register successfully.please login");
    } catch (error) {
      // alert("something went wrong!");
      console.log(error.response);
      setError("something went wrong!");
    }
  };

  return (
    <LayOut>
      <div className={classes.bg}>
        <section className={classes.both}>
          <section className={classes.register}>
            <div className={classes.register_container}>
              <h2>Join the network</h2>
              {success && (
                <p
                  style={{
                    textAlign: "center",
                    color: "green",
                    marginBottom: "13px",
                  }}
                >
                  {success}
                </p>
              )}
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
                <span>Already have an account?</span>
                <Link to={"/"} style={{ marginTop: "0px" }}>
                  sign in
                </Link>
              </div>
              <form
                onSubmit={handleSubmit}
                className={classes.registration__form}
              >
                <div>
                  <span>username </span>
                  <input
                    ref={usernameDom}
                    type="text"
                    placeholder="user name"
                  />
                </div>
                <br />
                <div className={classes.register_first_last}>
                  <div>
                    <span>First name </span>
                    <input
                      ref={firstnameDom}
                      type="text"
                      placeholder="first name"
                    />
                  </div>

                  <div>
                    <span>Last name </span>
                    <input
                      ref={lastnameDom}
                      type="text"
                      placeholder="last name"
                    />
                  </div>
                </div>

                <div>
                  <span>email </span>
                  <input ref={emailDom} type="email" placeholder="email" />
                </div>
                <br />

                {/* <div>
                  <span>Password </span>
                  <div
                    className={classes.password_container}
                    style={{
                      outline: "2px solid #ccc",
                      onfocus: ""
                      // backgroundColor: "#E8F0FE",
                    }}
                  >
                    <input
                      ref={passwordDom}
                      type={showPassword ? "text" : "password"}
                      placeholder="password must be at least 8 characters"
                      id="password-field"
                      style={{
                        border: "none",
                        // backgroundColor: "white",
                        outline: "none",
                        zIndex: "1",
                        // backgroundColor: "#E8F0FE",
                      }}
                    />
                    <section
                      type="button"
                      onClick={togglePasswordVisibility}
                      style={{
                        color: "black",
                        // backgroundColor: "#E8F0FE",
                        // backgroundColor: "white",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                      
                    </section>
                  </div>
                </div> */}

                <div>
                  <span>Password </span>
                  <div
                    className={classes.password_container}
                    style={{
                      outline: "2px solid #ccc",
                      // outline: isFocused ? "2px solid #ccc" : "2px solid #red",
                      backgroundColor: isFocused ? "#white" : "#E8F0FE",
                      // outline: isFocused ? "2px solid #ccc" : "2px solid #red",
                      //  onFocus={() => setIsFocused(true)}
                    }}
                  >
                    {/* <div> */}
                    <input
                      ref={passwordDom}
                      type={showPassword ? "text" : "password"}
                      placeholder="password must be at least 8 characters"
                      id="password-field"
                      style={{
                        border: "none",
                        outline: "#FF0000",
                        zIndex: "1",
                        // backgroundColor: "white",
                        backgroundColor: isFocused ? "#white" : "#E8F0FE", // Dynamic background color
                      }}
                      onFocus={() => setIsFocused(false)} // Set focus state on focus
                      // onBlur={() => setIsFocused(false)} // Reset focus state on blur
                    />
                    <section
                      type="button"
                      onClick={togglePasswordVisibility}
                      style={{
                        color: "black",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    </section>
                    {/* </div> */}
                  </div>
                </div>

                <br />
                <button className={classes.btn} type="submit">
                  Register
                </button>
              </form>
              <Link to={"/"}>Already have an account</Link>
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
                  starting elementary school or being promoted to CEO of a
                  Fortune 500 company, you have much to offer to those who are
                  trying to follow in your footsteps.
                </p>
                <p>
                  Wheather you are willing to share your knowledge or you are
                  just looking to meet mentors of your own, please start by
                  joining the network here.
                </p>
              </div>
              <button>How it Works</button>
            </div>
          </section>
        </section>
      </div>
    </LayOut>
  );
};

export default Register;
