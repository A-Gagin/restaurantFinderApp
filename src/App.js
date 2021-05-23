import './App.css';
import React, { useState } from "react";
//import GetRestaurants from "./GetRestaurants"; -- uses axios... but for some reason eats up a bunch of cpu? not sure why. Makes machine inoperable

const API_KEY = process.env.REACT_APP_api_key;

function App() {

  // MAKE THIS INTO A SEPARATE COMPONENT
  const [restaurants, setRestaurants] = useState(null);
  console.log("restaurants API call", restaurants); // testing

  const getRestaurants = () => {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("location", "38.0293,-78.4767"); // for now this only looks at Charlottesville. Use Geocoding API later.
    url.searchParams.append("radius", 10 * 1609.34); // Max distance from current location. '* 1609.34' converts meters to miles.
    url.searchParams.append("type", "restaurant"); // Allow for user filtering later.
    url.searchParams.append("opennow", ""); // Only display locations that are open.


    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        if (obj.status === "OK") {
          setRestaurants(obj.results);
        } else {
          setRestaurants(null);
        }
      });
  };

  return (
    <div>
      <button onClick={getRestaurants}>
        Get Restaurants
      </button>
      {/* <GetRestaurants setRestaurants={setRestaurants}/> */}

    </div>
  );
}

export default App;
