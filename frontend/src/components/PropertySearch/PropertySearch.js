import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
//import Map from "../Common/Maps/Map";
import { Map, GoogleApiWrapper } from "google-maps-react";
import cardimage from "../../images/demo1.jpg";
import Navbar from "../Common/Navbar/Navbar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";
import "./PropertySearch.css";
import { Link } from "react-router-dom";
const mapStyles = {
  width: "90%",
  height: "250%"
};

const cardimagestyle = {
  width: "100%",
  height: "150%"
};

class PropertySearch extends Component {
  constructor(props) {
    super(props);

    const { city, startDate, endDate, properties } = this.props.location.state;

    this.state = {
      city,
      startDate: "",
      endDate: "",
      properties,
      priceLow: null,
      priceHigh: null,
      sharingType: null,
      propertyType: null,
      text: null,
      internetAvailable: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlestartDate = this.handlestartDate.bind(this);
    this.handleendDate = this.handleendDate.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handlepriceHigh = this.handlepriceHigh.bind(this);
    this.handlepriceLow = this.handlepriceLow.bind(this);
    this.handlepropertyType = this.handlepropertyType.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleInternet = this.handleInternet.bind(this);
    this.handlesharingType = this.handlesharingType.bind(this);
  }

  handlesharingType = e => {
    console.log("sharing handle", e.target.value);
    this.setState({
      sharingType: e.target.value
    });
  };

  handleCity = e => {
    console.log("city handle", e.target.value);
    this.setState({
      city: e.target.value
    });
  };

  handleInternet = e => {
    console.log("internet handle", e.target.value);

    this.setState({
      internetAvailable: !this.state.internetAvailable
    });
  };

  handleText = e => {
    console.log("text handle", e.target.value);
    this.setState({
      text: e.target.value
    });
  };

  handlepropertyType = e => {
    console.log("property handle", e.target.value);
    this.setState({
      propertyType: e.target.value
    });
  };

  handlestartDate = e => {
    console.log("start date handle", e);
    this.setState({
      startDate: e
    });
  };

  handleendDate = e => {
    console.log("end date handle", e);
    this.setState({
      endDate: e
    });
  };

  handlepriceHigh = e => {
    console.log("price High handle", e.target.value);
    this.setState({
      priceHigh: e.target.value
    });
  };

  handlepriceLow = e => {
    console.log("price Low handle", e.target.value);

    this.setState({
      priceLow: e.target.value
    });
  };

  handleSearch(e) {
    e.preventDefault();

    var sdate = new Date(this.state.startDate);
    var year = sdate.getFullYear();
    var month = ("0" + (sdate.getMonth() + 1)).slice(-2);
    var day = ("0" + sdate.getDate()).slice(-2);
    var sd = `${year}-${month}-${day}`;

    var edate = new Date(this.state.endDate);
    var year = edate.getFullYear();
    var month = ("0" + (edate.getMonth() + 1)).slice(-2);
    var day = ("0" + edate.getDate()).slice(-2);
    var ed = `${year}-${month}-${day}`;

    const requestBody = {
      city: this.state.city,
      startDate: sd,
      endDate: ed,
      sharingType: this.state.sharingType,
      propertyType: this.state.propertyType,
      text: this.state.text,
      internetAvailable: this.state.internetAvailable,
      priceLow: this.state.priceLow,
      priceHigh: this.state.priceHigh
    };

    console.log("req body: ", requestBody);

    //     const reqBodyArray = Object.keys(requestBody);

    //     const ValuesArray = Object.values(requestBody);

    //     console.log("req body array", reqBodyArray);
    //     console.log("req body ValuesArray ", ValuesArray);

    //     var data = {

    //     }

    // for(const value of ValuesArray){

    // if(value !=null){

    // }

    // }

    //     for(i=0; i < ValuesArray.length;i++){

    //       if(ValuesArray[i] != null){

    // Object.assign(data , {reqBodyArray,[i]: ValuesArray[i]});

    //       }

    //     }

    //     console.log(requestBody);

    axios.post(API_ENDPOINT + "/posting/search", requestBody).then(response => {
      if (response.status == 200) {
        console.log("Filtred search successfully");
        console.log("RESPONSE", response.data);
        const result = response.data;

        this.setState({
          properties: result,
          searchFlag: true
        });
      } else {
        this.setState({
          searchFlag: false
        });
      }
    });
  }

  render() {
    console.log(this.state.internetAvailable);

    console.log("render properties", this.state.properties);
    //PROPERTY CARD CODE:
    let propertyCard = this.state.properties.map(property => {
      console.log("inside properties map function");
      return (
        <div>
          <div class="card mb-3 ml-4" style={{ "max-width": "540px" }}>
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  class="card-img"
                  src={cardimage} // replace with {property.images[0]}
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
                      {property.address.street} , {property.address.city} ,{" "}
                      {property.address.state}, {property.address.zip}{" "}
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
                    <small class="text-muted">
                      <Link
                        class="btn btn-outline-dark btn-sm"
                        to={{
                          pathname: "/propertydetails",
                          state: {
                            city: this.state.city,
                            startDate: this.state.startDate,
                            endDate: this.state.endDate,
                            property: property
                          }
                        }}
                      >
                        Details
                      </Link>
                    </small>
                  </p>
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

            <div class="container">
              <form action="#" method="post" novalidate="novalidate">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="row" style={{ "margin-top": "6%" }}>
                      <div class="col-lg-4 col-md-3 col-sm-12 p-0">
                        <input
                          id="city"
                          type="text"
                          class="form-control search-slt"
                          placeholder="Where do you want to go?"
                          onChange={this.handleCity}
                          value={this.state.city}
                        />
                      </div>
                      <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                        <DatePicker
                          className="form-control search-slt datepickercss"
                          placeholderText=" Start Date"
                          selected={this.state.startDate}
                          onChange={this.handlestartDate}
                          id="startDate"
                          value={this.state.startDate}
                          minDate={moment()}
                        />
                      </div>
                      <div class="col-lg-2 col-md-3 col-sm-12 p-0">
                        <DatePicker
                          className="form-control search-slt datepickercss"
                          placeholderText="End Date"
                          selected={this.state.endDate}
                          onChange={this.handleendDate}
                          minDate={this.state.startDate}
                          value={this.state.endDate}
                          id="endDate"
                        />
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                        <button
                          type="button"
                          class="btn btn-danger wrn-btn"
                          onClick={this.handleSearch}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row  mt-5">
                  {/* FILTERS START*/}

                  <div class="row">
                    <div class="col-lg-4 col-md-6 border-right">
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Sharing Type:{" "}
                      </span>
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            type="radio"
                            class="form-check-input"
                            name="Entire Place"
                            checked={this.state.sharingType == "Entire Place"}
                            onChange={this.handlesharingType}
                            value="Entire Place"
                          />
                          Entire Place
                        </label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            type="radio"
                            class="form-check-input"
                            onChange={this.handlesharingType}
                            checked={this.state.sharingType == "Private Room"}
                            value="Private Room"
                            name="optradio"
                          />
                          Private Room
                        </label>
                      </div>
                    </div>
                    <div class="col border-right">
                      <div class="form-group">
                        <label
                          for="propertyType"
                          style={{ fontWeight: "bold" }}
                        >
                          Property Type:
                        </label>
                        <select
                          class="form-control"
                          id="propertyType"
                          name="propertyType"
                          onChange={this.handlepropertyType}
                        >
                          <option value="apartment">Apartment</option>
                          <option value="barn">Barn</option>
                          <option value="bed &amp; breakfast">
                            Bed &amp; Breakfast
                          </option>
                          <option value="boat">Boat</option>
                          <option value="bungalow">Bungalow</option>
                          <option value="cabin">Cabin</option>
                          <option value="campground">Campground</option>
                          <option value="castle">Castle</option>
                          <option value="chalet">Chalet</option>
                          <option value="country house / chateau">
                            Chateau / Country House
                          </option>
                          <option value="condo">Condo</option>
                          <option value="corporate apartment">
                            Corporate Apartment
                          </option>
                          <option value="cottage">Cottage</option>
                          <option value="estate">Estate</option>
                          <option value="farmhouse">Farmhouse</option>
                          <option value="guest house/pension">
                            Guest House
                          </option>
                          <option value="hostel">Hostel</option>
                          <option value="hotel">Hotel</option>
                          <option value="hotel suites">Hotel Suites</option>
                          <option selected="" value="house">
                            House
                          </option>
                          <option value="house boat">House Boat</option>
                          <option value="lodge">Lodge</option>
                          <option value="Mill">Mill</option>
                          <option value="mobile home">Mobile Home</option>
                          <option value="Recreational Vehicle">
                            Recreational Vehicle
                          </option>
                          <option value="resort">Resort</option>
                          <option value="studio">Studio</option>
                          <option value="Tower">Tower</option>
                          <option value="townhome">Townhome</option>
                          <option value="villa">Villa</option>
                          <option value="yacht">Yacht</option>
                        </select>
                      </div>
                    </div>
                    <div class="col border-right">
                      {/* <p>
                        <label for="amount">Price range:</label>
                        <input
                          type="text"
                          id="amount"
                          onClick={this.handlePrice}
                          readonly
                          style={{
                            border: "0",
                            color: "#f6931f",
                            "font-weight": "bold"
                          }}
                        />
                      </p> */}

                      <form>
                        <div class="form-group">
                          <label
                            for="formControlRange"
                            style={{ fontWeight: "bold" }}
                          >
                            {" "}
                            Min Price <span> $: </span> {this.state.priceLow}{" "}
                          </label>

                          <input
                            type="range"
                            id="price"
                            name="price"
                            min="0.0"
                            max="500.0"
                            onChange={this.handlepriceLow}
                            value={this.state.priceLow}
                            class="form-control-range"
                            id="formControlRange"
                          />
                        </div>
                        <div class="form-group">
                          <label
                            for="formControlRange"
                            style={{ fontWeight: "bold" }}
                          >
                            {" "}
                            Max Price <span> $: </span> {this.state.priceHigh}{" "}
                          </label>

                          <input
                            type="range"
                            id="price"
                            name="price"
                            min={this.state.priceLow}
                            max="500.0"
                            onChange={this.handlepriceHigh}
                            value={this.state.priceHigh}
                            class="form-control-range"
                            id="formControlRange"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="col border-right">
                      <div class="form-group">
                        <label style={{ fontWeight: "bold" }} for="keywords">
                          Keywords
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="keywords"
                          onChange={this.handleText}
                          value={this.state.text}
                        />
                      </div>
                    </div>
                    <div class="col">
                      <span style={{ fontWeight: "bold" }}> Facilities </span>
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            checked={this.state.internetAvailable}
                            name="internetAvailable"
                            class="form-check-input"
                            onChange={this.handleInternet}
                            value={this.state.internetAvailable}
                          />{" "}
                          Internet
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* FILTERS ENDS */}
                </div>
              </form>
            </div>

            {/* SEARCH BAR ENDS */}
          </div>

          <div class="row">
            <div class="col-lg-8 col-md-6 col-sm-6 ">
              {/* INSERT PROPERTY CARD HERE */}

              <div> {propertyCard} </div>
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
                        <small class="text-muted">
                          <Link
                            class="btn btn-outline-dark btn-sm"
                            to={{
                              pathname: "/propertydetails",
                              state: {
                                city: this.state.city,
                                startDate: this.state.startDate,
                                endDate: this.state.endDate
                              }
                            }}
                          >
                            Details
                          </Link>
                        </small>
                      </p>
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
            <div class="col-lg-4 col-md-6 col-sm-6 ">
              Second Div
              <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCqCeF5i3qnv8799BRfzAhhsvevDUF5Ezc"
})(PropertySearch);
//export default PropertySearch;
