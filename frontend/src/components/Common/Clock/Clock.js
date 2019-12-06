import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants/routes";
import moment from "moment";
class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      hours: "",
      minutes: "",
      openhomeClock: ""
    };

    this.handleDate = this.handleDate.bind(this);
    this.handleHours = this.handleHours.bind(this);
    this.handleMinutes = this.handleMinutes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    console.log("submit handle", e.target.value);

    const requestBody = {
      date: this.state.date,
      hours: this.state.hours,
      minutes: this.state.minutes
    };

    axios.post(API_ENDPOINT + "/clock/jump", requestBody).then(response => {
      console.log("ssss ", response.status);
      console.log("data  ", response.data);
      var check = new Date(response.data);
      var dateS = moment(check).format("YYYY-MM-DD");
      var timeS = moment(check).format("HH:MM");
      var dateFinal = dateS + " " + timeS;
      if (response.status === 200) {
        this.setState({
          openhomeClock: dateFinal
        });
      }
      console.log(response);
    });
  };

  handleDate = e => {
    console.log("date handle", e.target.value);
    this.setState({
      date: e.target.value
    });
  };

  handleHours = e => {
    console.log("hours handle", e.target.value);
    this.setState({
      hours: e.target.value
    });
  };

  handleMinutes = e => {
    console.log("minutes handle", e.target.value);
    this.setState({
      minutes: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div>
          {" "}
          <h1> OPENHOME CLOCK API : Enter time to jump </h1>{" "}
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="date">Date</label>
            <input
              type="text"
              class="form-control"
              value={this.state.date}
              onChange={this.handleDate}
              id="date"
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div class="form-group col-md-3">
            <label for="hours">Hours</label>
            <input
              type="text"
              class="form-control"
              value={this.state.hours}
              onChange={this.handleHours}
              id="hours"
              placeholder="HH"
            />
          </div>

          <div class="form-group col-md-3">
            <label for="minutes">Minutes</label>
            <input
              type="text"
              class="form-control"
              value={this.state.minutes}
              onChange={this.handleMinutes}
              id="minutes"
              placeholder="MM"
            />
          </div>
          <div class="form-group col-md-3">
            <button
              type="submit"
              class="btn btn-success"
              onClick={this.handleSubmit}
            >
              Jump in time
            </button>
          </div>

          <div>
            {" "}
            <h2> OpenHome Current time: {this.state.openhomeClock} </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
