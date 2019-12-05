import React, { Component } from "react";
import GoogleMapReact, { Marker, GoogleApiWrapper } from "google-maps-react";

const SimpleMap = prods => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ marginBottom: "0px", height: "40vh" }}>
      <GoogleMapReact
        style={{
          height: "80vh",
          width: "90%",
          marginTop: "40px",
          marginBottom: "20px"
        }}
        google={prods.google}
        zoom={18}
        initialCenter={{
          lat: 36.963887,
          lng: -121.8067829
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCqCeF5i3qnv8799BRfzAhhsvevDUF5Ezc"
})(SimpleMap);
