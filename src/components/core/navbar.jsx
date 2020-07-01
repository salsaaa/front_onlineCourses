import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Search from '../features/search'
import { LogOut } from '../../services/authService'
import { GoSignIn } from "react-icons/go";
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Joi from "joi-browser";
import 'react-toastify/dist/ReactToastify.css';
import { addAdmin } from '../../services/authService';



const Navbar = props => {
  const handleSearch = () => {
    setSearchComp(true)
  }
  const handleClosingSearch = () => {
    setSearchComp(false)
  }
  const handleSearchChange = ({ target }) => {
    console.log(target.value)
    setSearchWord(target.value)
  }

  useEffect(() => {

  }, [props.match.path])
  const handleChange = ({ target }) => {
    const account = { ...state.account };
    account[target.name] = target.value;
    //set state
    setState({ account });
  };
  const [searchComp, setSearchComp] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [addAdminShow, setAddAdminShow] = useState(false);

  const handleClose = () => setAddAdminShow(false);
  const handleShow = () => setAddAdminShow(true);
  const schema = {
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
    fullName: Joi.string().required().max(15),
    userType: Joi.string().required()
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
  const handleSubmit = async e => {
    e.preventDefault();
    //validate

    const errors = validate();
    if (errors === null || Object.keys(errors).length === 0) {
      setState({ ...state, errors: {} });
      // call backend
      const account = { ...state.account }
      props.onSpinner(true)
      addAdmin(account).then(({ data }) => {
        console.log(data)
        setAddAdminShow(false)
        props.onSpinner(false)

      }).catch((err) => {
        props.onSpinner(false)
        if (err.response.status === 400) {
          toast.warning("This email is already exists!!", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else {
          toast.warning("Something went wrong");
        }
      })
      return;
    }
    //clone
    console.log("errors", errors)
    setState({ ...state, errors });


  };
  const [state, setState] = useState({
    account: {
      email: "",
      password: "",
      userType: "admin",
      fullName: ""
    },
    errors: {}
  })
  return (

    <React.Fragment>
      <ToastContainer />
      <nav className="nav fixed-top navbar navbar-expand-lg  py-3 border-bottom">
        <div className="container navContainer">
          <Link to="/home">
            <div className="logo"></div>
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link
                  to="/home"
                  className="nav-link text-uppercase font-weight-bold "
                >
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-uppercase font-weight-bold "
                >
                  About
                </Link>
              </li>
              {localStorage.getItem("JWT") &&
                localStorage.getItem("UserType") === "user" ?
                <li className="nav-item">
                  <Link
                    to={`/profile`}
                    className="nav-link text-uppercase font-weight-bold"
                  >
                    Profile
                </Link>
                </li>
                :
                localStorage.getItem("UserType") === "admin" && <li className="nav-item">
                  <Link
                    to={`/manage`}
                    className="nav-link text-uppercase font-weight-bold"
                  >
                    Manage
                </Link>
                </li>

              }
              {/* <li className="nav-item ">
              <Button variant="warning" size="sm">Add Admin</Button>{' '}
            </li> */}


            </ul>
            {localStorage.getItem("JWT") && <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onFocus={handleSearch}
                onChange={handleSearchChange}
              />
              {localStorage.getItem("UserType") === "admin" &&

                <Button onClick={handleShow} variant="outline-warning" size="sm">Add Admin</Button>

              }


            </form>}

            {localStorage.getItem("JWT") ?
              <Link to="/login" onClick={LogOut} className="logout" >
                <FiLogOut title="logout" className="logout_icon" />
              </Link> :
              <Link to="/login" onClick={LogOut} className="logout" >
                <GoSignIn title="login" className="logout_icon" />
              </Link>
            }
          </div>
        </div>
      </nav>
      {localStorage.getItem("UserType") === "admin" && <Modal show={addAdminShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal__title" >Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="add-admin validate-form"
          >
            <div
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
                placeholder="Enter name"
                onChange={handleChange}
              />

              <span className="focus-input100"></span>
            </div>

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
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>}
      {searchComp && <Search
        onClosingSearch={handleClosingSearch}
        searchWord={searchWord}
        onSpinner={props.onSpinner}
        spinner={props.spinner}
      />}
    </React.Fragment>
  );
};

export default Navbar;
