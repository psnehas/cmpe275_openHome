import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Common/Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import PropertySearch from "./PropertySearch/PropertySearch";
import HomePage from "./Home/HomePage";
import PostProperty from "./PostProperty/PostProperty";
import PropertyDetails from "./Property/PropertyDetails";
import OwnerDashboard from "./OwnerDashboard/OwnerDashboard";
import GuestDashboard from "./GuestDashboard/GuestDashboard";
import LandingPage from "./LandingPage/LandingPage";
import PropertyDetailsUpdated from "./Property/PropertyDetailsUpdated";
import PostPropertyUpdated from "./PostProperty/PostPropertyUpdated";
import PostPropertyLatest from "./PostProperty/PostPropertyLatest";
import Clock from "./Common/Clock/Clock";
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/signup" component={SignUp} />
        <Route path="/clock" component={Clock} />
        <Route path="/login" component={Login} />
        <Route path="/propertysearch" component={PropertySearch} />
        <Route path="/home" component={HomePage} />
        <Route path="/navbar" component={Navbar} />
        <Route path="/postproperty" component={PostProperty} />
        <Route path="/propertydetails" component={PropertyDetails} />
        <Route path="/ownerdashboard" component={OwnerDashboard} />
        <Route path="/guestdashboard" component={GuestDashboard} />
        <Route path="/landingpage" component={LandingPage} />
        <Route path="/postpropertylatest" component={PostPropertyLatest} />
        <Route
          path="/propertydetailsupdated"
          component={PropertyDetailsUpdated}
        />
      </div>
    );
  }
}

export default Main;
