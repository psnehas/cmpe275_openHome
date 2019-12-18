import React, { Component } from "react";
import axios from "axios";
import "./SignUp.css";
import Navbar from "../Common/Navbar/Navbar";
import { API_ENDPOINT } from "../../constants/routes";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      cardNumber: "",
      cvv: "",
      expirationDate: "",
      nameOnCard: "",
      signupflag: false
    };

    this.handlefirstName = this.handlefirstName.bind(this);
    this.handlelastName = this.handlelastName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleconfirmPassword = this.handleconfirmPassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleCardNumber = this.handleCardNumber.bind(this);
    this.handleCVV = this.handleCVV.bind(this);
    this.handleExpiration = this.handleExpiration.bind(this);
    this.handleCardName = this.handleCardName.bind(this);
    this.handleGuestSignUp = this.handleGuestSignUp.bind(this);
    this.handleOwnerSignUp = this.handleOwnerSignUp.bind(this);
  }

  handleGuestSignUp(e) {
    e.preventDefault();
    console.log(this.state);
    const requestBody = {
      userID: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      cardNumber: this.state.cardNumber,
      cvv: this.state.cvv,
      expiration: this.state.expirationDate,
      nameOnCard: this.state.nameOnCard,
      role: "user"
    };
    axios
      .post(API_ENDPOINT + "/user/register", requestBody)
      .then(response => {
        if (response.status == 200) {
          window.alert("Signed Up Successfully!");
          this.setState({
            signupflag: true
          });
          console.log();
          this.props.history.push("/login");
        }
      })
      .catch(error => {
        console.log("ERROR OBJECT", error.response.data);

        window.alert(error.response.data);
      });
  }

  handleOwnerSignUp(e) {
    e.preventDefault();

    const requestBody = {
      userID: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      cardNumber: this.state.cardNumber,
      cvv: this.state.cvv,
      expiration: this.state.expirationDate,
      nameOnCard: this.state.nameOnCard,
      role: "host"
    };
    axios
      .post(API_ENDPOINT + "/user/register", requestBody)
      .then(response => {
        console.log("response -----", response);

        if (response.status == 200) {
          window.alert("Sign Up Successful");

          this.setState({
            signupflag: true
          });

          this.props.history.push("/login");
        }
      })
      .catch(error => {
        console.log("ERROR OBJECT", error.response.data);

        window.alert(error.response.data);
      });
  }

  handleCardName = e => {
    console.log("card name handle", e.target.value);
    this.setState({
      nameOnCard: e.target.value
    });
  };

  handleCardNumber = e => {
    console.log("card no handle", e.target.value);
    this.setState({
      cardNumber: e.target.value
    });
  };

  handleCVV = e => {
    console.log("cvv handle", e.target.value);
    this.setState({
      cvv: e.target.value
    });
  };

  handleExpiration = e => {
    console.log("expiration handle", e.target.value);
    this.setState({
      expirationDate: e.target.value
    });
  };

  handlePhone = e => {
    console.log("phone handle", e.target.value);
    this.setState({
      phoneNumber: e.target.value
    });
  };
  handlePassword = e => {
    console.log("password handle", e.target.value);
    this.setState({
      password: e.target.value
    });
  };

  handleEmail = e => {
    console.log("email handle", e.target.value);
    this.setState({
      email: e.target.value
    });
  };

  handleconfirmPassword = e => {
    console.log("confirm password handle", e.target.value);
    this.setState({
      confirmpassword: e.target.value
    });
  };

  handlelastName = e => {
    console.log("lastName handle", e.target.value);
    this.setState({
      lastName: e.target.value
    });
  };

  handlefirstName = e => {
    console.log("firstName handle", e.target.value);
    this.setState({
      firstName: e.target.value
    });
  };

  render() {
    return (
      <div className="backimage">
        <Navbar />
        <div class="container register">
          <div class="row">
            <div class="col-md-3 register-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>Welcome</h3>
              <p style={{ color: "black" }}>
                SignUp and Get started by answering a few questions!
              </p>

              <br />
            </div>
            <div class="col-md-9 register-right">
              <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Guest
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Owner
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 class="register-heading">Sign Up as Guest</h3>
                  <div class="row register-form">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          placeholder="First Name *"
                          required
                          onChange={this.handlefirstName}
                          value={this.state.firstName}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last Name *"
                          required
                          name="lastName"
                          onChange={this.handlelastName}
                          value={this.state.lastName}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password *"
                          name="password"
                          onChange={this.handlePassword}
                          value={this.state.password}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Confirm Password *"
                          name="confirmpassword"
                          onChange={this.handleconfirmPassword}
                          value={this.state.confirmpassword}
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email *"
                          name="email"
                          required
                          onChange={this.handleEmail}
                          value={this.state.email}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          minlength="10"
                          maxlength="10"
                          name="phoneNumber"
                          required
                          onChange={this.handlePhone}
                          value={this.state.phoneNumber}
                          class="form-control"
                          placeholder="Phone *"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form group">
                        <p class="welcometext">
                          {" "}
                          Please Enter Credit Card details*{" "}
                        </p>
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Name on card*"
                          name="nameOnCard"
                          required
                          onChange={this.handleCardName}
                          value={this.state.nameOnCard}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Card Number*"
                          name="cardNumber"
                          required
                          onChange={this.handleCardNumber}
                          value={this.state.cardNumber}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="CVV*"
                          name="cvv"
                          onChange={this.handleCVV}
                          required
                          value={this.state.cvv}
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Expiration Date *"
                          name="expirationDate"
                          onChange={this.handleExpiration}
                          value={this.state.expirationDate}
                          required
                        />
                      </div>
                      <input
                        type="submit"
                        class="btnRegister"
                        value="Sign Up"
                        onClick={this.handleGuestSignUp}
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade show"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <h3 class="register-heading">Sign Up as Owner</h3>
                  <form>
                    <div class="row register-form">
                      <div class="col-md-6">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            name="firstName"
                            placeholder="First Name *"
                            onChange={this.handlefirstName}
                            value={this.state.firstName}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last Name *"
                            name="lastName"
                            onChange={this.handlelastName}
                            value={this.state.lastName}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password *"
                            name="password"
                            onChange={this.handlePassword}
                            value={this.state.password}
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Confirm Password *"
                            name="confirmpassword"
                            onChange={this.handleconfirmPassword}
                            value={this.state.confirmpassword}
                          />
                        </div>

                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email *"
                            name="email"
                            onChange={this.handleEmail}
                            value={this.state.email}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            minlength="10"
                            maxlength="10"
                            name="phoneNumber"
                            onChange={this.handlePhone}
                            value={this.state.phoneNumber}
                            required
                            class="form-control"
                            placeholder="Phone *"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form group">
                          <p class="welcometext">
                            {" "}
                            Please Enter Credit Card details*{" "}
                          </p>
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Name on card*"
                            name="nameOnCard"
                            onChange={this.handleCardName}
                            value={this.state.nameOnCard}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Card Number*"
                            name="cardNumber"
                            onChange={this.handleCardNumber}
                            value={this.state.cardNumber}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="CVV*"
                            name="cvv"
                            onChange={this.handleCVV}
                            value={this.state.cvv}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Expiration Date *"
                            name="expirationDate"
                            onChange={this.handleExpiration}
                            value={this.state.expirationDate}
                            required
                          />
                        </div>
                        <input
                          type="submit"
                          class="btnRegister"
                          value="Sign Up"
                          onClick={this.handleOwnerSignUp}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid footsign mt-5"></div>
      </div>
    );
  }
}

export default SignUp;
