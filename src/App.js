import './App.css';
import React, { useState } from "react";
import FindRestaurants from "./FindRestaurants";
import DisplayRestaurants from "./DisplayRestaurants";
import SortRestaurants from "./SortRestaurants"
import DisplayMap from "./DisplayMap";

function App() {
  const [restaurants, setRestaurants] = useState(null);
  const [latitude, setLatitude] = useState(38.0293); //default 38.0293
  const [longitude, setLongitude] = useState(-78.4767); //default -78.4767

  console.log("restaurants API call", restaurants); // testing
  console.log("latitude",latitude)
  console.log("longitude",longitude);

  return (
    <div style={{ backgroundColor: "lightgray"}}>
      <FindRestaurants setRestaurants={setRestaurants} setLatitude={setLatitude} setLongitude={setLongitude} />
      <DisplayMap restaurants={restaurants} latitude={latitude} longitude={longitude}/>
      <br/>
      <SortRestaurants restaurants={restaurants} setRestaurants={setRestaurants} />
      <div style={{width: "500px", marginLeft: "auto", marginRight:"auto"}}>
      <DisplayRestaurants restaurants={restaurants} latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}

export default App;