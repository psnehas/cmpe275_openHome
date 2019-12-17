import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";
import cardimage from "../../images/usflag.png";
import Navbar from "../Common/Navbar/Navbar";
import NavbarOwner from "../Common/NavbarOwner/NavbarOwner";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
import "./OwnerDashboard.css";
import { Link } from "react-router-dom";

const cardimagestyle = {
  width: "100%",
  height: "150%"
};

class OwnerDashboard extends Component {
  constructor(props) {
    super(props);

    // const { city, startDate, endDate, properties } = this.props.location.state;

    this.state = {
      email: "openhomeowner@gmail.com",
      // email: window.localStorage.getItem("host"),
      properties: [],
      cancelled: false,
      editedFlag: false,
      openhomeClock: ""
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleEdit = (e, propertyID) => {
    const requestBody = {
      propertyID: propertyID
    };

    axios.put(API_ENDPOINT + "/posting/place", requestBody).then(response => {
      if (response.status == 200) {
        this.setState({
          editedFlag: true
        });
      } else {
        this.setState({
          editedFlag: false
        });
      }
    });
  };

  handleCancel = (e, propertyID) => {
    const requestBody = {
      propertyID: propertyID,
      startDate: "",
      endDate: "",
      cancelTime: this.state.openhomeClock
    };

    axios
      .delete(API_ENDPOINT + "/booking/owner/cancel", requestBody)
      .then(response => {
        if (response.status == 200) {
          window.alert("Booking Cancelled");
          window.location.reload();

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
    axios
      .get(`${API_ENDPOINT}/dashboard/owner/${this.state.email}`)
      .then(response => {
        console.log("inside didmount response ");

        console.log("PROPERTIES", response.data);

        if (response.status == 200) {
          this.setState({
            properties: response.data
          });
        }
      });

    axios.get(API_ENDPOINT + "/clock/current").then(response => {
      console.log("CLOCK API", response.data);

      var date = new Date(response.data);
      console.log("formatted date: ", date.toString());

      if (response.status == 200) {
        this.setState({
          openhomeClock: response.data
        });
      }
    });
  }

  render() {
    console.log("PROPERTIES:  ", this.state.properties);
    // PROPERTY CARD CODE:
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
                  <h5 class="card-title">{}</h5>
                  <p class="card-text">
                    <p>
                      {" "}
                      <i class="fas fa-map-marker-alt iconscolor"></i>{" "}
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
                      <Link
                        class="btn btn-outline-dark btn-sm"
                        to={{
                          pathname: "/editproperty"
                        }}
                      >
                        Edit
                      </Link>
                    </small>

                    <small class="text-muted mr-4">
                      <button
                        class="btn btn-outline-dark btn-sm"
                        onClick={this.handleCancel()}
                      >
                        Cancel
                      </button>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    //PROPERTY SEARCH CARD
    // let propertyCard = this.state.properties.map(property => {
    //   console.log("inside properties map function");
    //   return (
    //     <div>
    //       <div class="card mb-3 ml-4" style={{ "max-width": "540px" }}>
    //         <div class="row no-gutters">
    //           <div class="col-md-4">
    //             <img
    //               class="card-img"
    //               src={cardimage} // replace with {property.images[0]}
    //               //    style={{ height: "11rem" }}
    //             />{" "}
    //           </div>
    //           <div class="col-md-8">
    //             <div class="card-body">
    //               <h5 class="card-title">{property.propertyName}</h5>
    //               <p class="card-text">
    //                 <p>
    //                   {" "}
    //                   <i class="fas fa-map-marker-alt iconscolor"></i>{" "}
    //                   {property.address.street} , {property.address.city} ,{" "}
    //                   {property.address.state}, {property.address.zip}{" "}
    //                 </p>
    //                 <span>
    //                   {" "}
    //                   <i class="fa fa-home iconscolor" />{" "}
    //                   {property.propertyType}{" "}
    //                 </span>
    //                 <span>
    //                   {" "}
    //                   <i class="fa fa-bed iconscolor" /> {property.bedroomCount}{" "}
    //                 </span>
    //                 <span>
    //                   {" "}
    //                   <i class="fas fa-parking iconscolor"></i>{" "}
    //                   {property.parking.available ? "Yes" : "No" || "Yes"}{" "}
    //                 </span>
    //                 <span>
    //                   {" "}
    //                   <i class="fas fa-wifi iconscolor"></i>{" "}
    //                   {property.internetAvailable ? "Yes" : "No" || "Yes"}{" "}
    //                 </span>
    //               </p>
    //               <p>{property.description}</p>
    //               <p class="card-text">
    //                 <small class="text-muted">
    //                   <Link
    //                     class="btn btn-outline-dark btn-sm"
    //                     to={{
    //                       pathname: "/propertydetailsexam",
    //                       state: {
    //                         city: this.state.city,
    //                         startDate: this.state.startDate,
    //                         endDate: this.state.endDate,
    //                         property: property
    //                       }
    //                     }}
    //                   >
    //                     Details
    //                   </Link>
    //                 </small>
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });

    //PROPERTY CARD CODE ENDS

    return (
      <div>
        <div class="container-fluid ">
          <div class="row border border-primary">
            <NavbarOwner />
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
            <h1> ALL RESERVATIONS </h1>{" "}
          </div>
          <div class="row">
            {" "}
            <br />
          </div>
          <div class="row">
            <div class="col-lg-8 col-md-6 col-sm-6 ">
              {/* INSERT PROPERTY CARD HERE */}
              <div>
                {" "}
                <If condition={this.state.properties.length > 0}>
                  <Then>
                    {" "}
                    <div>{propertyCard} </div>{" "}
                  </Then>
                  <Else>
                    {" "}
                    <div> HELLO </div>{" "}
                  </Else>
                </If>
              </div>

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
                          <Link
                            class="btn btn-outline-dark btn-sm"
                            to="/editproperty"
                          >
                            Edit
                          </Link>
                        </small>

                        <small class="text-muted mr-4">
                          <button
                            class="btn btn-outline-dark btn-sm"
                            onClick={this.handleCancel()}
                          >
                            Cancel
                          </button>
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* DEMO PROPERTY CARD ENDS */}
            </div>

            {/* <div class="col-lg-4 col-md-6 col-sm-6">
              <div class="card w-50">
                <div class="card-body">
                  <h5 class="card-title">
                    Monthly Billing Summary Details{" "}
                    <i class="fas fa-info-circle"></i>
                  </h5>

                  <p>
                    <b>DETAILS</b>
                  </p>
                </div>
              </div>
            </div> */}

            <div class="col-lg-4 col-md-6 col-sm-6 "></div>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerDashboard;
