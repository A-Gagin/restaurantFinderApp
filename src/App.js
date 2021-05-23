import './App.css';
import React, { useState } from "react";
import FindRestaurants from "./FindRestaurants";
import DisplayRestaurants from "./DisplayRestaurants";

function App() {
  const [restaurants, setRestaurants] = useState(null);

  console.log("restaurants API call", restaurants); // testing

  return (
    <div>
      <FindRestaurants setRestaurants={setRestaurants} />
      <DisplayRestaurants restaurants = {restaurants} />
    </div>
  );
}

export default App;
