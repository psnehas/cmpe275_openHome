import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import usflag from "../../../images/usflag.png";
import newhouse from "../../../images/house.jpg";

class NavbarOwner extends Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut = e => {
    window.localStorage.clear();
    window.alert("Logged out successfully");
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
          <div class="container">
            <a class="navbar-brand" href="#">
              <span class="websitename"> OpenHome &reg; </span>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active mr-2">
                  <Link class="nav-link" to="/home">
                    Home
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li class="nav-item active mr-2">
                  <Link class="nav-link" to="/ownerdashboard">
                    Dashboard
                  </Link>
                </li>
                <li class="nav-item mr-2">
                  <Link className="nav-link" to="#">
                    WELCOME:<b> {window.localStorage.getItem("host")} </b>
                  </Link>
                  {/* <a class="nav-link" href="#">
                    Login
                  </a> */}
                </li>
                <li class="nav-item mr-2">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={this.handleLogOut}
                  >
                    Log Out
                  </Link>
                </li>
                <li class="nav-item">
                  {" "}
                  <img src={usflag} class="flagcrop" alt="no pic" />{" "}
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    English (US)<span className="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item ml-4">
                  <Link
                    class="nav-link btn btn-outline-primary"
                    to="/postproperty"
                  >
                    Host Your Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavbarOwner;
