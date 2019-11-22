import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/routes";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    const requestBody = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post(API_ENDPOINT + "login", requestBody).then(response => {
      if (response.status === 200) {
        if (response.data.user.role === "owner") {
          this.props.history.push("/listproperty");
        } else {
          this.props.history.push("/home");
        }
      }
      console.log(response);
    });
  }

  render() {
    return <div></div>;
  }
}

export default login;
