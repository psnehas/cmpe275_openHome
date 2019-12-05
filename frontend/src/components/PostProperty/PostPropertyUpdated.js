import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";
// import Navbar from "../Common/Navbar/Navbar";
import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "./PostProperty.css";
import $ from "jquery";
// import usflag from "../../images/usflag.png";
import { storage } from "./../../firebase/index";
export default class PostPropertyUpdated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharingType: "",
      available: "",
      image: null,
      url: "",
      isUploaded: "",
      dataEdited: "",
      imageUrl: [],
      urls: ""
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleStateChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, "->", e.target.value);
  };

  handleChange = e => {
    console.log("e ka target file", e.target.files[0]);
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image: image }, () => {
        console.log("change ke baad ka value", this.state.image);
      });
    }
  };

  handleUpload = () => {
    console.log("what does the image state contain?", this.state.image);
    const image = this.state.image;
    // const imageName = this.state.image.name;
    const uploadTask = storage.ref(`images/${image.name}`).put(image); //the put function returns a task function which is now stored in upload task
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
          .child(image.name)
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
              console.log("ho ja bhai:", str);
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

  // handleSubmit = () =>{

  //   var tempArr = this.state.imageUrl;
  //   var tempUrl = "";
  //   var finalUrl = "";
  //   // console.log("tempArray:::", tempArr);
  //   // // console.log("join try:", tempArr.toString());
  //   for(var i=0; i < tempArr.length; i++){
  //       var str = tempArr[i].split("https://firebasestorage.googleapis.com/v0/b/openhome275-9ad6a.appspot.com/o/images").pop();
  //       console.log("ho ja bhai:",str);
  //       tempUrl = tempUrl+str+",";
  //   }
  //   finalUrl = tempUrl.slice(0,-1);

  //   console.log("finalURL:::", finalUrl);

  //   this.setState({isUploaded : true});
  //   console.log("this.state.imageUrl me kya hai?", this.state.imageUrl);

  //   const data = {
  //       url : this.state.url
  //   }
  // }
  render() {
    return (
      <div className="postbackground">
        {" "}
        <div>
          <div class="container-fluid">
            <div class="row border border-primary"> {/*<Navbar />*/}</div>
            <div class="row border border-primary mt-3"> HELLO </div>
            <div class="row" style={{ "margin-top": "8%" }}>
              <div class="col-lg-8 col-md-8 col-sm-8 ">
                <div
                  class="card ml-5 postpropertyform"
                  style={{ width: "50rem" }}
                >
                  <b class="mt-4">
                    {" "}
                    Take a moment to quickly fill this form to post your
                    property!{" "}
                  </b>
                  <hr />
                  <div class="row"></div>
                  <div class="card-body">
                    <form>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="headline">Property Title</label>
                          <input
                            type="text"
                            class="form-control"
                            id="propertyName"
                            name="propertyName"
                            placeholder="Headline / Title"
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="sel1">Property Type:</label>
                          <select
                            name="propertyType"
                            class="form-control"
                            id="propertyType"
                            onChange={this.onChange}
                          >
                            <option value="Select">
                              --Select Property type--
                            </option>
                            <option value="apartment">Apartment</option>
                            <option value="barn">Barn</option>
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
                      <div class="form-group col-lg-8 col-md-8">
                        <label for="propertyDescription">
                          Property Description
                        </label>
                        <textarea
                          class="form-control"
                          name="description"
                          id="description"
                          rows="3"
                          placeholder="Describe your Property!"
                          onChange={this.onChange}
                        ></textarea>
                      </div>
                      <div>
                        {/*below lines are for image upload*/}
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
                      <div class="form-group col-lg-8">
                        <label for="inputAddress2">Address </label>
                        <input
                          type="text"
                          class="form-control"
                          name="street"
                          id="street"
                          placeholder="Street / Building"
                          onChange={this.onChange}
                        />
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-3">
                          <label for="inputCity">City</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputCity"
                            placeholder="City"
                          />
                        </div>
                        <div class="form-group col-md-3">
                          <label for="inputState">State</label>
                          <select id="inputState" class="form-control">
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
                          <label for="inputZip">Zip</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputZip"
                            placeholder="zip"
                          />
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="sel1">Sharing Type:</label>
                          <select
                            class="form-control"
                            id="sel1"
                            name="sharingType"
                            onChange={this.handleStateChange}
                          >
                            <option value="Select">--Select--</option>
                            <option value="Private">Private room</option>
                            <option value="EntireRoom">Entire place</option>
                          </select>
                        </div>
                      </div>
                      {this.state.sharingType == "Private" && (
                        <DetailsSharingType />
                      )}

                      <div class="row">
                        <div class="form-group col-md-6">
                          <label for="asd">Availiablity:</label>
                        </div>
                      </div>
                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Mon"
                          />
                          <label class="custom-control-label" for="Mon">
                            Mon
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Tue"
                          />
                          <label class="custom-control-label" for="Tue">
                            Tue
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Wed"
                          />
                          <label class="custom-control-label" for="Wed">
                            Wed
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Thu"
                          />
                          <label class="custom-control-label" for="Thu">
                            Thu
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Fri"
                          />
                          <label class="custom-control-label" for="Fri">
                            Fri
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Sat"
                          />
                          <label class="custom-control-label" for="Sat">
                            Sat
                          </label>
                        </div>
                      </div>

                      <div class="form-group col-md-2">
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="Sun"
                          />
                          <label class="custom-control-label" for="Sun">
                            Sun
                          </label>
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="sel1"> Parking :</label>
                          <select
                            class="form-control"
                            id="sel1"
                            name="available"
                            onChange={this.handleStateChange}
                          >
                            <option value="Select">--Select--</option>
                            <option value="true">Yes</option>
                            <option value="flase">No</option>
                          </select>
                        </div>
                      </div>
                      {this.state.available == "true" && (
                        <div class="form-row">
                          <div class="form-group col-md-3">
                            <div class="custom-control custom-switch">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="paid"
                              />
                              <label class="custom-control-label" for="paid">
                                Paid
                              </label>
                            </div>
                          </div>

                          <div class="form-group col-md-2">
                            <input
                              type="text"
                              class="form-control"
                              id="inputEmail4"
                              placeholder="Fee"
                            />
                          </div>
                        </div>
                      )}
                      <div class="form-row">
                        <div class="form-group col-md-3">
                          <label for="inputEmail4">Weekday Rent</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            placeholder="Weekday rent"
                          />
                        </div>

                        <div class="form-group col-md-3">
                          <label for="inputEmail4">Weekend Rent</label>
                          <input
                            type="text"
                            class="form-control"
                            id="inputEmail4"
                            placeholder="Weekend Rent"
                          />
                        </div>
                      </div>

                      <button type="submit" class="btn btn-success">
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

class DetailsSharingType extends Component {
  render() {
    return (
      <div class="form-row">
        <div class="form-group col-md-3">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
            />
            <label class="custom-control-label" for="customSwitch1">
              Private Bathroom
            </label>
          </div>
        </div>
        <div class="form-group col-md-3">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch2"
            />
            <label class="custom-control-label" for="customSwitch2">
              Private Shower
            </label>
          </div>
        </div>
        <div class="form-group col-md-2">
          <input
            type="number"
            class="form-control"
            id="inputEmail4"
            placeholder="Area"
          />
        </div>
      </div>
    );
  }
}
