import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Common/Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import PropertySearch from "./PropertySearch/PropertySearch";
import HomePage from "./Home/HomePage";
import PostProperty from "./PostProperty/PostProperty";

import OwnerDashboard from "./OwnerDashboard/OwnerDashboard";
import GuestDashboard from "./GuestDashboard/GuestDashboard";
import LandingPage from "./LandingPage/LandingPage";

import EditProperty from "./EditProperty/EditProperty";
import Clock from "./Common/Clock/Clock";
import NavbarUser from "./Common/NavbarUser/NavbarUser";
import PropertyDetails from "./Property/PropertyDetails";
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={Login} />
        <Route path="/navbaruser" component={NavbarUser} />
        <Route path="/clock" component={Clock} />
        <Route path="/login" component={Login} />
        <Route path="/propertysearch" component={PropertySearch} />
        <Route path="/home" component={HomePage} />
        <Route path="/navbar" component={Navbar} />
        <Route path="/postproperty" component={PostProperty} />
        <Route path="/editproperty" component={EditProperty} />
        <Route path="/propertydetails" component={PropertyDetails} />
        <Route path="/ownerdashboard" component={OwnerDashboard} />
        <Route path="/guestdashboard" component={GuestDashboard} />
        <Route path="/landingpage" component={LandingPage} />

        <Route path="/propertydetails" component={PropertyDetails} />
      </div>
    );
  }
}

export default Main;
