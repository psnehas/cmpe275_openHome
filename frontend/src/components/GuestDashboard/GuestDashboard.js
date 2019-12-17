import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";

import cardimage from "../../images/demo1.jpg";
import Navbar from "../Common/Navbar/Navbar";
import NavbarUser from "../Common/NavbarUser/NavbarUser";
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
      checkOut: false,
      cancelled: false,
      openhomeClock: ""
    };
  }

  handlecheckIn(propertyID, startDate, endDate) {
    console.log("checkin hit");
    console.log("property id", propertyID);
    console.log("start date handle checkin", startDate);

    var sd = new Date(startDate);
    var start = moment(sd).format("YYYY-MM-DD");
    console.log("start date formatted handle checkin", start);

    console.log("end date handle checkin", endDate);
    var ed = new Date(endDate);
    var end = moment(ed).format("YYYY-MM-DD");
    console.log("end date formatted handle checkin", end);

    const requestBody = {
      propertyID: propertyID.toString(),
      startDate: start,
      endDate: end,
      checkInTime: this.state.openhomeClock
    };

    console.log("checkin req body ", requestBody);

    axios.put(API_ENDPOINT + "/booking/checkin", requestBody).then(response => {
      if (response.status == 200) {
        window.alert(response.data);

        this.setState({
          checkedIn: true
        });
      } else if (response.status == 400) {
        console.log(response.data);

        window.alert(response.data);

        this.setState({
          checkedIn: false
        });
      }
    });
  }

  handlecheckOut(propertyID, startDate, endDate) {
    console.log("checkout hit");
    console.log("property id", propertyID);
    console.log("start date handle checkout", startDate);

    var sd = new Date(startDate);
    var start = moment(sd).format("YYYY-MM-DD");
    console.log("start date formatted handle checkout", start);

    console.log("end date handle checkout", endDate);
    var ed = new Date(endDate);
    var end = moment(ed).format("YYYY-MM-DD");
    console.log("end date formatted handle checkout", end);

    const requestBody = {
      propertyID: propertyID.toString(),
      startDate: start,
      endDate: end,
      checkOutTime: this.state.openhomeClock
    };

    console.log("checkout req body ", requestBody);

    axios
      .put(API_ENDPOINT + "/booking/checkout", requestBody)
      .then(response => {
        if (response.status == 200) {
          window.alert(response.data);

          this.setState({
            checkOut: true
          });
        } else if (response.status == 400) {
          console.log(response.data);

          window.alert(response.data);

          this.setState({
            checkOut: false
          });
        }
      });
  }
  handleCancel(propertyID, startDate, endDate) {
    console.log("cancel hit");
    console.log("property id", propertyID);
    console.log("start date handle cancel", startDate);

    var sd = new Date(startDate);
    var start = moment(sd).format("YYYY-MM-DD");
    console.log("start date formatted handle cancel", start);

    console.log("end date handle cancel", endDate);
    var ed = new Date(endDate);
    var end = moment(ed).format("YYYY-MM-DD");
    console.log("end date formatted handle cancel", end);

    const requestBody = {
      propertyID: propertyID.toString(),
      startDate: start,
      endDate: end,
      cancelTime: this.state.openhomeClock
    };

    console.log("cancel req body ", requestBody);

    axios.put(API_ENDPOINT + "/booking/cancel", requestBody).then(response => {
      if (response.status == 200) {
        window.alert(response.data);

        this.setState({
          cancelled: true
        });
      } else if (response.status == 400) {
        console.log(response.data);

        window.alert(response.data);

        this.setState({
          cancelled: false
        });
      }
    });
  }

  componentDidMount() {
    axios.get(API_ENDPOINT + "/clock/current").then(response => {
      console.log("CLOCK API", response.data);

      var check = new Date(response.data);
      var dateS = moment(check).format("YYYY-MM-DD");
      var timeS = moment(check).format("HH:MM");
      var dateFinal = dateS + " " + timeS;

      if (response.status == 200) {
        this.setState({
          openhomeClock: dateFinal
        });
      }
    });

    axios
      .get(`${API_ENDPOINT}/dashboard/user/${this.state.email}`)
      .then(response => {
        console.log("LIST OF PROPERTIES DID MOUNT", response.data);

        if (response.status == 200) {
          this.setState({
            properties: response.data
          });
        }
      });
  }

  render() {
    console.log(this.state.internetAvailable);
    console.log("TIME", this.state.openhomeClock);

    //PROPERTY CARD CODE:
    let propertyCard = this.state.properties.map(property => {
      console.log(
        "property bookings start date: ",
        property.bookings[0].startDate
      );
      console.log("property bookings end date: ", property.bookings[0].endDate);

      return (
        <div>
          <div class="card mb-3 ml-4" style={{ "max-width": "540px" }}>
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  class="card-img"
                  //src={cardimage}
                  src={property.images[0]}
                  style={{ height: "11rem" }}
                />{" "}
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{property.propertyName}</h5>
                  <p class="card-text">
                    <p>
                      {" "}
                      <i class="fas fa-map-marker-alt iconscolor"></i>{" "}
                      {property.address.street != null
                        ? property.address.street
                        : "899"}{" "}
                      , {property.address.city} , {property.address.state},{" "}
                      {property.address.zip}{" "}
                    </p>
                    <span>
                      {" "}
                      <i class="fa fa-home iconscolor" />{" "}
                      {property.propertyType}{" "}
                    </span>
                    <span>
                      {" "}
                      <i class="fa fa-bed iconscolor" /> {property.bedroomCount}{" "}
                    </span>
                    <span>
                      {" "}
                      <i class="fas fa-parking iconscolor"></i>{" "}
                      {property.parking.available ? "Yes" : "No" || "Yes"}{" "}
                    </span>
                    <span>
                      {" "}
                      <i class="fas fa-wifi iconscolor"></i>{" "}
                      {property.internetAvailable ? "Yes" : "No" || "Yes"}{" "}
                    </span>
                  </p>
                  <p>{property.description}</p>
                  <p class="card-text">
                    <small class="text-muted mr-4">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        onClick={this.handlecheckIn.bind(
                          this,
                          property.propertyID,
                          property.bookings[0].startDate,
                          property.bookings[0].endDate
                        )}
                      >
                        Check In
                      </button>
                    </small>

                    <small class="text-muted mr-4">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        onClick={this.handlecheckOut.bind(
                          this,
                          property.propertyID,
                          property.bookings[0].startDate,
                          property.bookings[0].endDate
                        )}
                      >
                        Check Out
                      </button>
                    </small>
                  </p>
                  <div>
                    <small class="text-muted">
                      <button
                        class="btn btn-outline-dark btn-md"
                        onClick={this.handleCancel.bind(
                          this,
                          property.propertyID,
                          property.bookings[0].startDate,
                          property.bookings[0].endDate
                        )}
                      >
                        Cancel Booking
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
            <NavbarUser />
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
              {/* <div class="card mb-3 ml-6" style={{ "max-width": "540px" }}>
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
              </div> */}
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
