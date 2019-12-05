import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
//import Map from "../Common/Maps/Map";
import { Map, GoogleApiWrapper } from "google-maps-react";
// import cardimage from "../../images/usflag.png";
// import Navbar from "../Common/Navbar/Navbar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
import "./PropertyDetails.css";
import { addDays } from "date-fns/esm";
var momentBus = require("moment-business-days");
//var momentHoli = require('moment-holiday');

// import usflag from "../../images/usflag.png";
// import test1 from "../../images/test1.jpg";
// import test2 from "../../images/test2.jpg";
// import test3 from "../../images/test3.jpg";

class PropertyDetailsUpdated extends Component {
  constructor(props) {
    super(props);
    var minDay = moment(new Date()).format("YYYY-MM-DD");
    var maxDay = moment(addDays(new Date(), 365)).format("YYYY-MM-DD");

    this.state = {
      //  property,
      startDate: "",
      endDate: "",
      minDay: minDay,
      maxDay: maxDay,
      parking: false,
      estimate: 0.0,
      isEstimated: ""
    };
  }

  showEstimate = e => {
    var start = moment(
      moment(new Date(this.state.startDate)).format("YYYY-MM-DD")
    );
    var end = moment(moment(new Date(this.state.endDate)).format("YYYY-MM-DD"));
    console.log("start: ", start);
    var noOfDays = end.diff(start, "days", false) + 1;
    console.log("noOfDays: ", noOfDays);

    if (start < end && noOfDays > 0 && noOfDays < 16) {
      console.log("valid dates");
      var businessDays = momentBus(start).businessDiff(momentBus(end)) + 1;
      var holidays = noOfDays - businessDays;
      console.log("Holidays: " + holidays);

      //calculate total estimated payment

      // var bRent = this.state.property.rentWeekday * businessDays;
      // var hRent = this.state.property.rentWeekend * holidays;
      // var parkingRent = 0.0;
      // if(this.state.parking == true){
      //     parkingRent = noOfDays * this.state.property.parking.daily_fee;
      // }

      // var totalBill = bRent + hRent + parkingRent;
      this.setState({
        estimate: 50,
        isEstimated: true
      });
    } else {
      this.setState({
        estimate: 0.0,
        isEstimated: false
      });
    }
  };

  handleBooking = e => {
    e.preventDefault();
    this.showEstimate();
    // if(this.state.isEstimated === false || this.state.isEstimated ===""){
    //   this.showEstimate();
    // }
    if (this.state.isEstimated === true) {
      const data = {
        //  id: this.state.property.property_id,
        userID: this.state.userID,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        payment: this.state.estimate
      };

      console.log("Start date: " + data.startDate);
      console.log("Start date: " + data.endDate);

      // axios.post("http://localhost:5000/bookproperty", data).then(response => {
      //   if (response.status == 200) {
      //     console.log("Booked successfully");
      //     window.alert("Property Booked Successfuly");
      //     this.setState({
      //       bookedFlag: true
      //     });
      //   } else {
      //     this.setState({
      //       bookedFlag: false
      //     });
      //   }
      // });
    }
  };

  // isPrivate=(e)=>{
  //   if(this.state.property.sharingType == "Private Room"){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  estimation = () => {
    if (this.state.isEstimated === true)
      return (
        <a style={{ fontSize: 12 }}>
          Your Estimated rent is: ${this.state.estimate}{" "}
        </a>
      );
    if (this.state.isEstimated === false)
      return <b style={{ fontSize: 13, color: "red" }}>Enter Valid Dates </b>;
    else return "";
  };

  render() {
    // var imgLink = "https://firebasestorage.googleapis.com/v0/b/openhome275-9ad6a.appspot.com/o/images";
    // var nameArr = this.state.property.imageList.split(',');
    // var image1 = imgLink + nameArr[0];
    // var image2 = imgLink + nameArr[1];
    // var image3 = imgLink + nameArr[2];

    return (
      <div>
        {" "}
        <div class="detailsbackground">
          <div class="container-fluid">
            <div class="row border border-primary"> {/* <Navbar /> */}</div>
            <div class="row border border-primary mt-3"> HELLO </div>
            <div class="row" style={{ "margin-top": "8%" }}>
              <div class="col-lg-6 col-md-6 col-sm-6 ">
                <div class="card fullproperty ml-4" style={{ width: "50rem" }}>
                  <div
                    id="carouselExampleIndicators"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <ol class="carousel-indicators">
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        class="active"
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                      ></li>
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                      ></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          class="d-block w-100"
                          // src={image1}
                          alt="First slide"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          class="d-block w-100"
                          // src={image2}
                          alt="Second slide"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          class="d-block w-100"
                          // src={image3}
                          alt="Third slide"
                        />
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                  <div class="row"></div>
                  <div class="card-body">
                    <p class="card-text">
                      <p>HEADLINE </p>
                      <p> DESCRIPTION </p>
                      {/* {this.state.property.description} */}
                      Quick sample text to create the card title and make up the
                      body of the card's content. Quick sample text to create
                      the card title and make up the body of the card's content.
                      Quick sample text to create the card title and make up the
                      body of the card's content. Quick sample text to create
                      the card title and make up the body of the card's content.
                      Quick sample text to create the card title and make up the
                      body of the card's content. Quick sample text to create
                      the card title and make up the body of the card's content.
                    </p>
                    <hr />
                    <table cellpadding="20px">
                      <tr>
                        <th>
                          {" "}
                          <i class="fa fa-home fa-3x iconscolor" />
                        </th>
                        <th>
                          {" "}
                          <i class="fa fa-bed fa-3x iconscolor" />
                        </th>
                        <th>
                          {" "}
                          <i class="fas fa-wifi fa-3x iconscolor"></i>
                        </th>
                        <th>
                          {" "}
                          <i class="fa fa-bath fa-3x iconscolor" />
                        </th>
                        <th>
                          {" "}
                          <i class="fa fa-shower fa-3x iconscolor" />
                        </th>
                        <th>
                          {" "}
                          <i class="fa fa-moon-o fa-3x iconscolor" />
                        </th>

                        <th>
                          {" "}
                          <i class="fas fa-parking fa-3x iconscolor"></i>
                        </th>
                      </tr>
                      <tr>
                        <td>Apartment type</td>
                        <td>Bedrooms</td>
                        <td>Internet</td>
                        <td>Private Bathroom</td>
                        <td>Private Shower</td>
                        <td>Area</td>
                        <td>Parking</td>
                      </tr>
                      <tr>
                        <td>Entire Place</td>
                        {/* {this.state.property.sharingType} */}
                        <td>2</td>
                        {/* {this.state.property.bedroomCount} */}
                        <td>Yes</td>
                        {/* {this.state.property.internetAvailable ? 'Yes' : 'No'} */}
                        <td>No</td>
                        {/* {this.state.property.privateBathAvailable ? 'Yes' : 'No'} */}
                        <td>No</td>
                        {/* {this.state.property.privateShowerAvailable ? 'Yes' : 'No'} */}
                        <td>400 sq.ft</td>
                        {/* {this.state.property.area} */}
                        <td>Yes</td>
                        {/* {this.state.property.parking.available ? 'Yes' : 'No'} */}
                      </tr>
                    </table>
                    <hr />

                    {/* TABLE STARTS*/}
                    <div>
                      <table>
                        <tr>
                          <th> Sharing Type </th>
                        </tr>

                        <tr>
                          <td>
                            {" "}
                            Entire Place
                            {/* {this.state.property.sharingType} */}
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </div>
                    {/*TABLE ENDS */}

                    {/* TABLE STARTS*/}
                    <div>
                      <table>
                        <tr>
                          <th> Property Area </th>
                        </tr>

                        <tr>
                          <td>
                            {" "}
                            800 sq. ft
                            {/* {this.state.property.area} */}
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </div>
                    {/*TABLE ENDS */}
                    {/* TABLE STARTS*/}
                    <div>
                      <table>
                        <tr>
                          <th> Bedrooms </th>
                        </tr>

                        <tr>
                          <td>
                            {" "}
                            2
                            {/* {this.state.property.bedroomCount} Bedroom(s) */}
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </div>
                    {/*TABLE ENDS */}
                    {/* TABLE STARTS*/}
                    {/* {this.isPrivate() ? */}
                    <div>
                      <table>
                        <tr>
                          <th> Private Bath / Shower </th>
                        </tr>

                        <tr>
                          <td> Bath </td>
                          <td> Shower </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            Yes
                            {/* {this.state.property.privateBathAvailable ? 'Yes' : 'No'} */}
                          </td>
                          <td>
                            {" "}
                            Yes
                            {/* {this.state.property.privateShowerAvailable ? 'Yes' : 'No'}  */}
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </div>
                    {/* :
                    {}} */}

                    {/*TABLE ENDS */}

                    {/* TABLE STARTS*/}
                    <div>
                      <table>
                        <tr>
                          <th> Internet </th>
                        </tr>

                        <tr>
                          <td>
                            {" "}
                            Yes
                            {/* {this.state.property.internetAvailable ? 'Yes' : 'No'} */}
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </div>
                    {/*TABLE ENDS */}
                    {/* TABLE STARTS*/}
                    <div>
                      <table>
                        <tr>
                          <th> Parking </th>
                        </tr>

                        <tr>
                          <td> Availiablity </td>
                          <td> Paid </td>
                          <td> Charges (Daily)</td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            Yes
                            {/* {this.state.property.parking.available ? 'Yes' : 'No'} */}
                          </td>
                          <td>
                            {" "}
                            Yes
                            {/* {this.state.property.parking.paid ? 'Yes' : 'No'} */}
                          </td>
                          <td>
                            {" "}
                            10 ${/* {this.state.property.parking.dailyFee} */}
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </div>
                    {/*TABLE ENDS */}
                  </div>
                </div>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-6 ">
                <div class="card w-50">
                  <div class="card-body">
                    <h5 class="card-title">Booking Details</h5>
                    {/* <div align="left" style={{fontSize:13}}><a>Week Days: ${this.state.property.rentWeekday}/night</a><br></br>
                    <a>Week Days: ${this.state.property.rentWeekend}/night</a>  </div>*/}
                    <div align="left" style={{ fontSize: 13 }}>
                      <a>Week Days: $200/night</a>, <a>Week End: $300/night</a>
                    </div>
                    {/* <p>
                      <i class="fa fa-check-circle checkboxcolor" />
                      Your dates are Available!
                    </p> */}
                    <div class="row">
                      <div class="col-lg-6 col-md-3 col-sm-12 p-0">
                        {/* <DatePicker
                          className="form-control search-slt datepickercss"
                          placeholderText=" Start Date"
                          minDate={this.state.minDay}
                          maxDate={this.state.maxDay}
                        /> */}
                        <input
                          type="date"
                          id="startDate"
                          min={this.state.minDay}
                          max={this.state.maxDay}
                          onChange={e => {
                            this.setState({ startDate: e.target.value });
                          }}
                          value={this.state.startDate}
                          placeholder="Start Date"
                        />
                      </div>
                      <div class="col-lg-6 col-md-3 col-sm-12 p-0">
                        <input
                          type="date"
                          id="endDate"
                          min={this.state.minDay}
                          max={this.state.maxDay}
                          onChange={e => {
                            this.setState({ endDate: e.target.value });
                          }}
                          value={this.state.endDate}
                        />
                        {/* <DatePicker
                          className="form-control search-slt datepickercss"
                          placeholderText="End Date"
                          minDate={moment()}
                        /> */}
                      </div>
                    </div>
                    {/* {this.state.property.parking.available && */}
                    <div>
                      <br></br>
                      <b>Book Parking</b>
                      <br></br>
                      <label class="radio-inline" style={{ paddingRight: 35 }}>
                        <input
                          type="radio"
                          name="rb"
                          onClick={this.checkHandler}
                          value="true"
                        />
                        Yes
                      </label>
                      <label class="radio-inline">
                        <input
                          type="radio"
                          name="rb"
                          onClick={this.checkHandler}
                          value="false"
                        />
                        No
                      </label>
                    </div>
                    {/* } */}
                    <a
                      href="#"
                      onClick={() => this.showEstimate()}
                      style={{ fontSize: 12 }}
                    >
                      Show Estimate
                    </a>
                    <br></br>
                    {this.estimation()}
                    <br></br>
                    <a
                      href="#"
                      class="btn btn-primary mt-4"
                      onClick={this.handleBooking}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyDetailsUpdated;
