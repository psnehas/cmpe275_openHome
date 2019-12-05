import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";

import cardimage from "../../images/usflag.png";
import Navbar from "../Common/Navbar/Navbar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
import "./GuestDashboard.css";
import { Link } from "react-router-dom";

const cardimagestyle = {
  width: "100%",
  height: "150%"
};

class GuestDashboard extends Component {
  constructor(props) {
    super(props);

    // const { city, startDate, endDate, properties } = this.props.location.state;

    this.state = {
      email: window.localStorage.getItem("user"),
      properties: [],
      startDate: "",
      endDate: "",
      checkedIn: false,
      checkedOut: false,
      cancelled: false,
      openhomeClock: ""
    };

    this.handlecheckIn = this.handlecheckIn.bind(this);
    this.handlecheckOut = this.handlecheckOut.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handlecheckIn = (e, propertyID) => {
    const requestBody = {
      propertyID: propertyID
    };

    axios.put(API_ENDPOINT + "/booking/checkin", requestBody).then(response => {
      if (response.status == 200) {
        this.setState({
          checkedIn: true
        });
      } else {
        this.setState({
          checkedIn: false
        });
      }
    });
  };

  handlecheckOut = (e, propertyID, startDate, endDate) => {
    const requestBody = {
      propertyID: propertyID,
      startDate: startDate,
      endDate: endDate,
      checkedInTime: this.state.openhomeClock
    };

    axios.put(API_ENDPOINT + "/booking/checkin", requestBody).then(response => {
      if (response.status == 200) {
        this.setState({
          checkedIn: true
        });
      } else {
        this.setState({
          checkedIn: false
        });
      }
    });
  };

  handleCancel = (e, propertyID) => {
    const requestBody = {
      propertyID: propertyID,
      payment: this.state.payment
    };

    axios.put(API_ENDPOINT + "/booking/cancel", requestBody).then(response => {
      if (response.status == 200) {
        this.setState({
          cancelled: true
        });
      } else {
        this.setState({
          cancelled: false
        });
      }
    });
  };

  componentDidMount() {
    axios.get(API_ENDPOINT + "/clock/current").then(response => {
      console.log("CLOCK API", response.data);

      if (response.status == 200) {
        this.setState({
          openhomeClock: response.data
        });
      }
    });

    axios
      .get(`${API_ENDPOINT}/hostproperties/${this.state.email}`)
      .then(response => {
        console.log(response.data);

        if (response.status == 200) {
          this.setState({
            properties: response.data
          });
        }
      });
  }

  render() {
    console.log(this.state.internetAvailable);
    //PROPERTY CARD CODE:
    let propertyCard = this.state.properties.map(property => {
      return (
        <div>
          <div class="card mb-3 ml-4" style={{ "max-width": "540px" }}>
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  class="card-img"
                  src={cardimage}
                  //    style={{ height: "11rem" }}
                />{" "}
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{property.propertyName}</h5>
                  <p class="card-text">
                    <p>
                      {" "}
                      <i class="fas fa-map-marker-alt iconscolor"></i>{" "}
                      {property.address}{" "}
                    </p>
                    <span>
                      {" "}
                      <i class="fa fa-home iconscolor" /> sdf{" "}
                    </span>
                    <span>
                      {" "}
                      <i class="fa fa-bed iconscolor" /> da{" "}
                    </span>
                    <span>
                      {" "}
                      <i class="fas fa-parking iconscolor"></i> sdfss{" "}
                    </span>
                    <span>
                      {" "}
                      <i class="fas fa-wifi iconscolor"></i>Sleeps: sfsad{" "}
                    </span>
                  </p>
                  <p>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p class="card-text">
                    <small class="text-muted mr-4">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        onClick={this.handlecheckIn(property.propertyID)}
                      >
                        Check In
                      </button>
                    </small>

                    <small class="text-muted mr-4">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        onClick={this.handlecheckOut(property.propertyID)}
                      >
                        Check Out
                      </button>
                    </small>
                  </p>
                  <div>
                    <small class="text-muted">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        onClick={this.handleCancel(property.propertyID)}
                      >
                        Cancel
                      </button>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    //PROPERTY CARD CODE ENDS

    return (
      <div>
        <div class="container-fluid ">
          <div class="row border border-primary">
            <Navbar />
          </div>
          <div
            class="row search-sec"
            style={{ "margin-top": "8%", background: "whitesmoke" }}
          >
            {/* SEARCH BAR STARTS */}

            <div class="container"></div>

            {/* SEARCH BAR ENDS */}
          </div>
          <div>
            {" "}
            <h1> BOOKED PROPERTIES </h1>{" "}
          </div>
          <div class="row">
            {" "}
            <br />
          </div>
          <div class="row">
            <div class="col-lg-8 col-md-6 col-sm-6 ">
              {/* INSERT PROPERTY CARD HERE */}
              {propertyCard}
              {/* DEMO PROPERTY CARD STARTS */}
              <div class="card mb-3 ml-6" style={{ "max-width": "540px" }}>
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      class="card-img"
                      src={cardimage}
                      //    style={{ height: "11rem" }}
                    />{" "}
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Property title</h5>
                      <p class="card-text">
                        <p>
                          {" "}
                          <i class="fas fa-map-marker-alt iconscolor"></i>{" "}
                          ADDRESS{" "}
                        </p>
                        <span>
                          {" "}
                          <i class="fa fa-home iconscolor" /> sdf{" "}
                        </span>
                        <span>
                          {" "}
                          <i class="fa fa-bed iconscolor" /> da{" "}
                        </span>
                        <span>
                          {" "}
                          <i class="fas fa-parking iconscolor"></i> sdfss{" "}
                        </span>
                        <span>
                          {" "}
                          <i class="fas fa-wifi iconscolor"></i>Sleeps: sfsad{" "}
                        </span>
                      </p>
                      <p>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                      <p class="card-text">
                        <small class="text-muted mr-4">
                          <button
                            class="btn btn-outline-dark btn-sm"
                            onClick={this.handlecheckIn()}
                          >
                            Check In
                          </button>
                        </small>

                        <small class="text-muted">
                          <button
                            class="btn btn-outline-dark btn-sm"
                            onClick={this.handlecheckOut()}
                          >
                            Check Out
                          </button>
                        </small>
                      </p>
                      <div>
                        <small class="text-muted">
                          <button
                            class="btn btn-outline-dark btn-sm"
                            onClick={this.handleCancel()}
                          >
                            Cancel
                          </button>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* DEMO PROPERTY CARD ENDS */}
              {/* <div class="row border border-primary">
                <div
                  class="media mediastyle col-lg-8 col-md-8"
                  style={{ "margin-left": "10%" }}
                >
                  <div class="media-left col-lg-4 col-md-4 col-sm-4 border border-primary">
                    <a href="#">
                      {" "}
                      <img
                        class="media-object"
                        src={cardimage}
                        style={cardimagestyle}
                      />{" "}
                    </a>
                  </div>

                  <div class="media-body col-lg-6 col-md-6 col-sm-6 ">
                    <h4> PROPERTY NAME </h4>
                    <p>
                      {" "}
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Natus voluptate suscipit explicabo distinctio sit magnam
                      consectetur modi, vero eaque eos asperiores placeat vitae
                      et reiciendis commodi voluptatibus, expedita sint
                      voluptas.
                    </p>
                    <p>
                      {" "}
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Natus voluptate suscipit explicabo distinctio sit magnam
                      consectetur modi, vero eaque eos asperiores placeat vitae
                      et reiciendis commodi voluptatibus, expedita sint
                      voluptas.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 "></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuestDashboard;
