import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
import Navbar from "../Common/Navbar/Navbar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PostProperty.css";
import $ from "jquery";
import usflag from "../../images/usflag.png";
import { storage } from "./../../firebase/index";

class PostProperty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: window.localStorage.getItem("user"),
      propertyName: "",
      propertyType: "",
      sharingType: "Entire Room",
      description: "",
      street: "",
      city: "",
      state: "",
      zip: 2121,
      area: 123.1,
      booked: false,
      checkedIn: false,
      internetAvailable: false,
      paid: false,
      dailyFee: 132.2,
      bedroomCount: 1,
      rentWeekday: 1231.1,
      rentWeekend: 1231.1,
      available: false,
      alwaysAvailable: false,
      privateBathAvailable: false,
      privateShowerAvailable: false,
      images: "",
      isUploaded: "",
      dataEdited: "",
      imageUrl: [],
      urls: "",
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      postedFlag: false
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadThruExt = this.uploadThruExt.bind(this);

    this.handleinternetAvailable = this.handleinternetAvailable.bind(this);

    this.handleAvailable = this.handleAvailable.bind(this);

    this.handlepropertyName = this.handlepropertyName.bind(this);

    this.handlepropertyType = this.handlepropertyType.bind(this);

    this.handlesharingType = this.handlesharingType.bind(this);

    this.handleDescription = this.handleDescription.bind(this);

    this.handleCity = this.handleCity.bind(this);
    this.handleStreet = this.handleStreet.bind(this);
    this.handleFee = this.handleFee.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleweekDayRent = this.handleweekDayRent.bind(this);
    this.handleArea = this.handleArea.bind(this);
    this.handlePaid = this.handlePaid.bind(this);
    this.handleParking = this.handleParking.bind(this);
    this.handleweekEndRent = this.handleweekEndRent.bind(this);
    this.handleprivateBath = this.handleprivateBath.bind(this);
    this.handleprivateShower = this.handleprivateShower.bind(this);
    this.handlebedroomCount = this.handlebedroomCount.bind(this);
    this.handlePostProperty = this.handlePostProperty.bind(this);
    this.handlealwaysAvailable = this.handlealwaysAvailable.bind(this);
  }
  handleChange = e => {
    console.log("e ka target file", e.target.files);
    if (e.target.files[0]) {
      const images = Array.from(e.target.files);
      this.setState({ images: images }, () => {
        console.log("image value after handleChange", this.state.images);
      });
    }
  };
  uploadThruExt = images => {
    const uploadTask = storage.ref(`images/${images.name}`).put(images);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function
      },
      error => {
        //error function
        console.log("Upload Image error: " + error);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(images.name)
          .getDownloadURL()
          .then(url => {
            //this is the target URL. storing this in a variable. need to store it in DB
            console.log("url: " + url);
            this.state.imageUrl.push(url);
            console.log(
              "this.state.imageUrl.length: " + this.state.imageUrl.length
            );
            for (var i = 0; i < this.state.imageUrl.length; i++) {
              console.log("imageURL: " + this.state.imageUrl[i]);
              //this.setState({urls : this.state.urls + this.state.imageUrl[i]})
            }
            var tempArr = this.state.imageUrl;
            var tempUrl = "";
            var finalUrl = "";
            // console.log("tempArray:::", tempArr);
            // // console.log("join try:", tempArr.toString());
            for (var i = 0; i < tempArr.length; i++) {
              var str = tempArr[i]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/openhome275-9ad6a.appspot.com/o/images"
                )
                .pop();
              console.log("hdsadas:", str);
              tempUrl = tempUrl + str + ",";
            }
            finalUrl = tempUrl.slice(0, -1);

            console.log("finalURL:::", finalUrl);

            this.setState({ isUploaded: true });
            console.log("this.state.imageUrl me kya hai?", this.state.imageUrl);
          });
      }
    );
  };

  handleUpload = () => {
    console.log(
      "image value within the state, checking in handleUpload:",
      this.state.images
    );
    const images = this.state.images;
    // const imageName = this.state.image.name;
    images.map(this.uploadThruExt);
  };

  handlePostProperty = e => {
    e.preventDefault();
    const requestBody = {
      user: {
        userID: this.state.email
      },
      address: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      },
      propertyName: this.state.propertyName,
      sharingType: this.state.sharingType,
      description: this.state.description,
      propertyType: this.state.propertyType,
      area: this.state.area,
      booked: this.state.booked,
      checkedIn: this.state.checkedIn,
      internetAvailable: this.state.internetAvailable,
      alwaysAvailable: this.state.alwaysAvailable,
      images: this.state.images,
      parking: {
        available: this.state.available,
        paid: this.state.paid,
        dailyFee: this.state.dailyFee
      },
      bedroomCount: this.state.bedroomCount,
      rentWeekday: this.state.rentWeekday,
      rentWeekend: this.state.rentWeekend,

      privateBathAvailable: this.state.privateBathAvailable,
      privateShowerAvailable: this.state.privateShowerAvailable,
      images: this.state.images,
      availablity: {
        alwaysAvailable: this.state.alwaysAvailable,
        mon: this.state.mon,
        tue: this.state.tue,
        wed: this.state.wed,
        thu: this.state.thu,
        fri: this.state.fri,
        sat: this.state.sat,
        sun: this.state.sun
      }
    };

    axios.post(API_ENDPOINT + "/posting/place", requestBody).then(response => {
      if (response.status == 200) {
        window.alert("Property Posted Successfully!");
        this.setState({
          postedFlag: true
        });
      } else {
        this.setState({
          postedFlag: false
        });
      }
    });
  };

  handlealwaysAvailable = e => {
    console.log("alwaysAvailable handle", e.target.value);
    this.setState({
      alwaysAvailable: !this.state.alwaysAvailable
    });
  };

  handleinternetAvailable = e => {
    console.log("internet handle", e.target.value);
    this.setState({
      internetAvailable: !this.state.internetAvailable
    });
  };

  handleAvailable = e => {
    console.log("available handle", e.target.name);

    var day = e.target.name;

    console.log("day", day);

    switch (day) {
      case "mon":
        console.log("mon switch handle");

        this.setState({
          mon: !this.state.mon
        });
        break;

      case "tue":
        this.setState({
          tue: !this.state.tue
        });
        break;

      case "wed":
        this.setState({
          wed: !this.state.wed
        });
        break;

      case "thu":
        this.setState({
          thu: !this.state.thu
        });
        break;

      case "fri":
        this.setState({
          fri: !this.state.fri
        });
        break;

      case "sat":
        this.setState({
          sat: !this.state.sat
        });
        break;

      case "sun":
        this.setState({
          sun: !this.state.sun
        });
        break;
    }
  };

  handlePaid = e => {
    console.log("paid handle", e.target.value);
    this.setState({
      paid: !this.state.paid
    });
  };

  handlebedroomCount = e => {
    console.log("bedroom handle", e.target.value);
    this.setState({
      bedroomCount: e.target.value
    });
  };

  handleFee = e => {
    console.log("fee handle", e.target.value);
    this.setState({
      dailyFee: e.target.value
    });
  };

  handleprivateBath = e => {
    console.log("private bath handle", e.target.value);
    this.setState({
      privateBathAvailable: !this.state.privateBathAvailable
    });
  };

  handleParking = e => {
    console.log("parking handle", e.target.value);

    if (e.target.value === "Yes") {
      this.setState({
        available: true
      });
    } else {
      this.setState({
        available: false
      });
    }
  };

  handleprivateShower = e => {
    console.log("privateShowerAvailable handle", e.target.value);
    this.setState({
      privateShowerAvailable: !this.state.privateShowerAvailable
    });
  };

  handleweekDayRent = e => {
    console.log("weekday rent handle", e.target.value);
    this.setState({
      rentWeekday: e.target.value
    });
  };

  handleStreet = e => {
    console.log("street handle", e.target.value);
    this.setState({
      street: e.target.value
    });
  };

  handleArea = e => {
    console.log("area handle", e.target.value);
    this.setState({
      area: e.target.value
    });
  };

  handleweekEndRent = e => {
    console.log("weekend rent handle", e.target.value);
    this.setState({
      rentWeekend: e.target.value
    });
  };

  handleCity = e => {
    console.log("city handle", e.target.value);
    this.setState({
      city: e.target.value
    });
  };

  handleState = e => {
    console.log("state handle", e.target.value);
    this.setState({
      state: e.target.value
    });
  };

  handleZip = e => {
    console.log("zip handle", e.target.value);
    this.setState({
      zip: e.target.value
    });
  };

  handlepropertyType = e => {
    console.log("propertyType handle", e.target.value);
    this.setState({
      propertyType: e.target.value
    });
  };

  handlepropertyName = e => {
    console.log("name handle", e.target.value);
    this.setState({
      propertyName: e.target.value
    });
  };

  handlesharingType = e => {
    console.log("sharing handle", e.target.value);
    this.setState({
      sharingType: e.target.value
    });
  };

  handleDescription = e => {
    console.log("description handle", e.target.value);
    this.setState({
      description: e.target.value
    });
  };
  render() {
    return (
      <div className="postbackground">
        {" "}
        <div>
          <div class="container-fluid">
            <div class="row border border-primary">
              {" "}
              <Navbar />
            </div>
            <div class="row border border-primary mt-3"> HELLO </div>
            <div class="row" style={{ "margin-top": "8%" }}>
              <div class="col-lg-8 col-md-8 col-sm-8 ">
                <div
                  class="card ml-5 postpropertyform"
                  style={{ width: "50rem" }}
                >
                  <hr />

                  <b class="mt-4 ml-4"> POST YOUR PROPERTY </b>
                  <hr />
                  <div class="row"></div>
                  <div class="card-body">
                    <form>
                      <div class="form-row">
                        <div class="form-group col-md-3">
                          <label for="propertyName">Property Title</label>
                          <input
                            type="text"
                            class="form-control"
                            value={this.state.propertyName}
                            onChange={this.handlepropertyName}
                            id="propertyName"
                            placeholder="Headline / Title"
                          />
                        </div>
                        <div class="form-group col-md-3">
                          <label for="propertyType">Property Type:</label>
                          <select
                            class="form-control"
                            id="propertyType"
                            value={this.state.propertyType}
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
                      <div class="form-row">
                        <div class="form-group col-lg-8 col-md-8">
                          <label for="exampleFormControlTextarea1">
                            Property Description
                          </label>
                          <textarea
                            class="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            placeholder="Describe your Property!"
                            value={this.state.description}
                            onChange={this.handleDescription}
                          ></textarea>
                        </div>
                      </div>
                      <div class="form-row">
                        <form className="form-inline ">
                          <div class="custom-file col-md-6 mb-4 form-group ">
                            <input
                              type="file"
                              class="custom-file-input"
                              id="customFile"
                              aria-describedby="inputGroupFileAddon01"
                              multiple
                              onChange={this.handleChange}
                            />
                            <label class="custom-file-label" for="customFile">
                              Upload Property Images
                            </label>
                            <div className="input-group mb-3 form-group">
                              <div class="input-group-append">
                                <button
                                  class="btn "
                                  type="button"
                                  onClick={this.handleUpload}
                                >
                                  Upload
                                </button>
                                <br />
                              </div>
                              <br />
                            </div>
                          </div>
                        </form>
                        <div className="col-md-12">
                          {this.state.imageUrl.map(imgLink => {
                            return (
                              <img
                                src={imgLink}
                                alt="Uploaded url"
                                height="200"
                                width="200"
                              />
                            );
                          })}
                        </div>
                      </div>
                      <br />

                      <div class="form-row">
                        <div class="form-group col-lg-8">
                          <label for="street">Address </label>
                          <input
                            type="text"
                            class="form-control"
                            id="street"
                            name="street"
                            value={this.state.street}
                            onChange={this.handleStreet}
                            placeholder="Street / Building"
                          />
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-3">
                          <label for="city">City</label>
                          <input
                            type="text"
                            name="city"
                            class="form-control"
                            onChange={this.handleCity}
                            value={this.state.city}
                            id="city"
                            placeholder="City"
                          />
                        </div>
                        <div class="form-group col-md-3">
                          <label for="state">State</label>
                          <select
                            id="state"
                            class="form-control"
                            onChange={this.handleState}
                            value={this.state.state}
                          >
                            <option selected> State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                          </select>
                        </div>
                        <div class="form-group col-md-2">
                          <label for="zip">Zip</label>
                          <input
                            type="text"
                            class="form-control"
                            id="zip"
                            placeholder="zip"
                            onChange={this.handleZip}
                            value={this.state.zip}
                          />
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-3">
                          <label for="area"> Property Area (Sq. ft):</label>
                          <input
                            type="text"
                            class="form-control"
                            id="area"
                            name="area"
                            value={this.state.area}
                            onChange={this.handleArea}
                            placeholder="Area"
                          />
                        </div>
                        <div class="form-group col-md-3">
                          <label for="area"> Bedrooms:</label>
                          <input
                            type="text"
                            class="form-control"
                            id="bedroomCount"
                            name="bedroomCount"
                            value={this.state.bedroomCount}
                            onChange={this.handlebedroomCount}
                            placeholder="Bedrooms"
                          />
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-2">
                          <label for="sharingType">Sharing Type:</label>
                          <select
                            class="form-control"
                            id="sharingType"
                            value={this.state.sharingType}
                            onChange={this.handlesharingType}
                          >
                            <option value="EntireRoom">Entire Room</option>
                            <option value="Private">Private</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-2">
                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="internetAvailable"
                              name="internetAvailable"
                              value={this.state.internetAvailable}
                              onChange={this.handleinternetAvailable}
                            />
                            <label
                              class="custom-control-label"
                              for="internetAvailable"
                            >
                              Internet
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* PRIVATE STARTS*/}

                      {this.state.sharingType === "Private" && (
                        <div class="form-row">
                          <div class="form-group col-md-3">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="privateBathAvailable"
                                value={this.state.privateBathAvailable}
                                onChange={this.handleprivateBath}
                              />
                              <label
                                class="custom-control-label"
                                for="privateBathAvailable"
                              >
                                Private Bathroom
                              </label>
                            </div>
                          </div>
                          <div class="form-group col-md-3">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="privateShowerAvailable"
                                value={this.state.privateShowerAvailable}
                                onChange={this.handleprivateShower}
                              />
                              <label
                                class="custom-control-label"
                                for="privateShowerAvailable"
                              >
                                Private Shower
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      <div> </div>
                      {/* PRIVATE ENDS*/}
                      <div class="row">
                        <div class="form-group col-md-6">
                          <label for="asd">Availablity:</label>
                        </div>
                      </div>
                      <div class="form-group col-md-4">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="alwaysAvailable"
                            name="alwaysAvailable"
                            value={this.state.alwaysAvailable}
                            onChange={this.handlealwaysAvailable}
                          />
                          <label
                            class="custom-control-label"
                            for="alwaysAvailable"
                          >
                            Always Available
                          </label>
                        </div>
                      </div>
                      {this.state.alwaysAvailable === true ? (
                        <div> </div>
                      ) : (
                        <div>
                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="mon"
                                name="mon"
                                value={this.state.mon}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="mon">
                                Mon
                              </label>
                            </div>
                          </div>

                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="tue"
                                name="tue"
                                value={this.state.tue}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="tue">
                                Tue
                              </label>
                            </div>
                          </div>

                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="wed"
                                name="wed"
                                value={this.state.wed}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="wed">
                                Wed
                              </label>
                            </div>
                          </div>

                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="thu"
                                name="thu"
                                value={this.state.thu}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="thu">
                                Thu
                              </label>
                            </div>
                          </div>

                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="fri"
                                name="fri"
                                value={this.state.fri}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="fri">
                                Fri
                              </label>
                            </div>
                          </div>

                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="sat"
                                name="sat"
                                value={this.state.sat}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="sat">
                                Sat
                              </label>
                            </div>
                          </div>
                          <div class="form-group col-md-2">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="sun"
                                name="sun"
                                value={this.state.sun}
                                onChange={this.handleAvailable}
                              />
                              <label class="custom-control-label" for="sun">
                                Sun
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="mon"
                            name="mon"
                            value={this.state.mon}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="mon">
                            Mon
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="tue"
                            name="tue"
                            value={this.state.tue}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="tue">
                            Tue
                          </label>
                        </div>
                      </div> */}

                      {/* <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="wed"
                            name="wed"
                            value={this.state.wed}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="wed">
                            Wed
                          </label>
                        </div>
                      </div> */}

                      {/* <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="thu"
                            name="thu"
                            value={this.state.thu}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="thu">
                            Thu
                          </label>
                        </div>
                      </div> */}

                      {/* <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="fri"
                            name="mon"
                            value={this.state.fri}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="fri">
                            Fri
                          </label>
                        </div>
                      </div> */}

                      {/* <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="sat"
                            name="sat"
                            value={this.state.sat}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="sat">
                            Sat
                          </label>
                        </div>
                      </div> */}

                      {/* <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="sun"
                            name="sun"
                            value={this.state.sun}
                            onChange={this.handleAvailable}
                          />
                          <label class="custom-control-label" for="sun">
                            Sun
                          </label>
                        </div>
                      </div> */}

                      <div class="form-row">
                        <div class="form-group col-md-2">
                          <label for="available"> Parking :</label>
                          <select
                            class="form-control"
                            id="available"
                            onClick={this.handleParking}
                            name="available"
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                      </div>
                      {this.state.available === true && (
                        <div class="form-row">
                          <div class="form-group col-md-3">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="paid"
                                onClick={this.handlePaid}
                                value={this.state.paid}
                              />
                              <label class="custom-control-label" for="paid">
                                Paid
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.paid === true && (
                        <div class="form-row">
                          <div class="form-group col-md-2">
                            <input
                              type="text"
                              class="form-control"
                              id="dailyFee"
                              onChange={this.handleFee}
                              value={this.state.dailyFee}
                              placeholder="Daily Fee "
                            />
                          </div>
                        </div>
                      )}

                      <div class="form-row">
                        <div class="form-group col-md-3">
                          <label for="rentWeekday">Weekday Rent</label>
                          <input
                            type="text"
                            class="form-control"
                            id="rentWeekday"
                            name="rentWeekday"
                            value={this.state.rentWeekday}
                            onChange={this.handleweekDayRent}
                            placeholder="Weekday rent"
                          />
                        </div>

                        <div class="form-group col-md-3">
                          <label for="rentWeekend">Weekend Rent</label>
                          <input
                            type="text"
                            class="form-control"
                            id="rentWeekend"
                            placeholder="Weekend Rent"
                            value={this.state.rentWeekend}
                            onChange={this.handleweekEndRent}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-success"
                        onClick={this.handlePostProperty}
                      >
                        Post your Property!
                      </button>
                    </form>
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
export default PostProperty;
