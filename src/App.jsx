import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import {Spinner } from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import axios from "axios";


import Navbar from "./components/core/navbar";
import Home from "./components/core/home";
import About from "./components/core/about";
import PageNotFound from "./components/core/pageNotFound";
import CourseData from "./components/forms/courseData";
import CourseDetails from "./components/courses/courseDetails";
import CourseLessons from "./components/courses/courseLessons";
import Footer from "./components/core/footer";
import Profile from "./components/profile";
import PaymentForm from "./components/forms/paymentForm";
import SigningForm from "./components/authentication/signingForm";
import GuardedRoute from './guards/guardedRoute'
import Manage from "./components/features/manage"

const App = () => {
  const [spinner,setSpinner]=useState(false)
  //intercerptor
  axios.interceptors.request.use(function (config) {
    const jwt = localStorage.getItem("JWT");
    config.headers.Authorization = jwt;
    return config;
  });
const handleSpinner=(spinner)=>{
  setSpinner(spinner)
}
  return (
    <React.Fragment>

      <Route render={props => <Navbar {...props} onSpinner={handleSpinner} spinner={spinner} />} />
      {spinner&&<div className="spinner"><Spinner animation="border" variant="warning" className="spinner__icon" /></div>}
      <Switch>
        <GuardedRoute path='/manage' component={Manage} onSpinner={handleSpinner} spinner={spinner} />
        <GuardedRoute path='/courses/:id/edit' component={CourseData} onSpinner={handleSpinner} spinner={spinner}/>
        <GuardedRoute path='/courses/add' component={CourseData} onSpinner={handleSpinner} spinner={spinner}/>

        <Route path="/home" render={props => <Home onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/about" render={() => <About />} />
        <Route path="/profile/:id" render={props => <Profile onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/profile/edit" render={props => <Profile onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/profile" render={props => <Profile onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/courses/:id/details" render={props => <CourseDetails onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/courses/:id/lessons" render={props=><CourseLessons onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/courses/:id/paymentform" component={PaymentForm} />
        <Route path="/login" render={props => <SigningForm onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/register" render={props => <SigningForm onSpinner={handleSpinner} spinner={spinner} {...props} />} />
        <Route path="/notfound" component={PageNotFound} />

        <Redirect exact from="/" to="/home" />
        <Redirect to="/notfound" />
      </Switch>

      <Footer />
    </React.Fragment>
  );
};

export default App;
