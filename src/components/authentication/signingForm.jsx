import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Register } from '../../services/authService';
import { Container } from "react-bootstrap";


const SigningForm = (props) => {
  const [state, setState] = useState({
    account: {
      email: "",
      password: "",
      userType: "user",
      isSaved: false,
      fullName: ""
    },
    errors: {}
  })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const schema = {
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
    fullName: Joi.string().required().max(15),
    isSaved: Joi.required(),
    userType: Joi.string().required()
  };
  const handleChange = ({ target }) => {
    const account = { ...state.account };
    account[target.name] = target.value;
    //set state
    setState({ account });
  };
  const handleCheckBox = () => {
    const account = { ...state.account };
    account.isSaved = !account.isSaved;
    setState({ ...state, account });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    //validate

    const errors = validate();
    if (errors === null || Object.keys(errors).length === 0) {
      setState({ ...state, errors: {} });
      // call backend
      const path = props.match.path;
      const account = { ...state.account }

      if (path === "/login") {
        delete errors.fullName;
        Login(account)
          .then(({ data }) => {
            props.history.replace("/home");
            console.log(data)
            localStorage.setItem("Id", data.user._id);
            localStorage.setItem("Name", data.user.fullName);
            localStorage.setItem("JWT", data.token);
            localStorage.setItem("UserType", data.user.userType);
          })
          .catch((err) => {
            if (err.response.status === 404) {
              toast.warning("Invalid Data!!", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
            } else {
              toast.warning("Something went wrong");
            }

          })

      }
      else if (path === "/register") {
        Register(account).then(({ data }) => {
          props.history.replace("/home");
          console.log(data)
          localStorage.setItem("Id", data.user._id);
          localStorage.setItem("Name", data.user.fullName);
          localStorage.setItem("JWT", data.token);
          localStorage.setItem("UserType", data.user.userType);

        }).catch((err) => {
          if (err.response.status === 400) {
            toast.warning("This email is already exists!!", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            toast.warning("Something went wrong");
          }
        })

      }
      return;
    }
    //clone
    console.log("errors", errors)
    setState({ ...state, errors });


  };
  const validate = () => {
    const res = Joi.validate(state.account, schema, {
      abortEarly: false
    });
    if (res.error === null) {
      return null;
    }
    const errors = {};

    for (const err of res.error.details) {
      errors[err.path] = err.message;
    }
    if (props.match.path === "/login" && errors.fullName) {
      delete errors.fullName;
    }
    return errors;
  };

  return (

    <React.Fragment>
      <ToastContainer />
      <Container className="containerSignForm">

        <div className="limiter ">
          <div className="container-login100">
            <div className="wrap-login100">
              <div
                className="login100-form-title"
                style={{ backgroundImage: "url(/assets/auth/bg-01.jpg)" }}
              >
                <span className="login100-form-title-1">{window.location.pathname == '/login' ? "Sign In" : "Sign Up"}</span>
              </div>

              <form
                className="login100-form validate-form"
                onSubmit={handleSubmit}
              >
                {/* Name */}

                {window.location.pathname == '/register' && <div
                  className={
                    state.errors && state.errors.fullName
                      ? "wrap-input100 validate-input m-b-26 alert-validate"
                      : "wrap-input100 validate-input m-b-26 "
                  }
                  data-validate={
                    state.errors && state.errors.fullName == null
                      ? "Email is required"
                      : state.errors && state.errors.fullName
                  }
                >
                  <span className="label-input100">Name</span>
                  <input
                    className="input100"
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />

                  <span className="focus-input100"></span>
                  {/* <MdError style={{ color: "red" }} /> */}
                </div>
                }
                <div
                  className={
                    state.errors && state.errors.email
                      ? "wrap-input100 validate-input m-b-26 alert-validate"
                      : "wrap-input100 validate-input m-b-26 "
                  }
                  data-validate={
                    state.errors && state.errors.email == null
                      ? "Email is required"
                      : state.errors && state.errors.email
                  }
                >
                  <span className="label-input100">Email</span>
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />

                  <span className="focus-input100"></span>
                </div>

                <div
                  className={
                    state.errors && state.errors.password
                      ? "wrap-input100 validate-input m-b-18 alert-validate"
                      : "wrap-input100 validate-input m-b-18"
                  }
                  data-validate={
                    state.errors && state.errors.password == null
                      ? "Password is required"
                      : state.errors && state.errors.password
                  }
                  onChange={handleChange}
                >
                  <span className="label-input100">Password</span>
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                  />
                  <span className="focus-input100"></span>
                </div>

                {window.location.pathname == '/login' && <div className="m-b-18">
                  <input
                    className="radioInput"
                    type="radio"
                    name="userType"
                    value="user"
                    onClick={handleChange}
                  />{" "}
                  <span style={{ color: "#808080", marginRight: "10px" }}>
                    User
                  </span>
                  <input
                    className="radioInput"
                    type="radio"
                    name="userType"
                    value="admin"
                    onClick={handleChange}
                  />{" "}
                  <span style={{ color: "#808080" }}>Admin</span>
                  {state.errors && state.errors.userType && <label className="chooseType">choose your type</label>}
                </div>}
                <div className="flex-sb-m w-full p-b-30">
                  <div className="contact100-form-checkbox">
                    <input
                      className="input-checkbox100"
                      id="ckb1"
                      type="checkbox"
                      name="remember-me"
                      onClick={handleCheckBox}
                    />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>

                  <div>
                    {
                      window.location.pathname == '/login' ?
                        <Link to="/register" className="txt1">
                          New user? Register Here!
                    </Link> :
                        <Link to="/login" className="txt1">
                          Have an account? SIGN IN!
              </Link>
                    }


                  </div>
                </div>

                <button className="login100-form-btn" type="submit">
                  {window.location.pathname == '/login' ? "Login" : "Register"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}


export default SigningForm;
