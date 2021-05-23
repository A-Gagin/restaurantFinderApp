import './App.css';
import React, { useState } from "react";
import FindRestaurants from "./FindRestaurants";

function App() {
  const [restaurants, setRestaurants] = useState(null);

  console.log("restaurants API call", restaurants); // testing

  return (
    <div>
      <FindRestaurants setRestaurants={setRestaurants} />

    </div>
  );
}

export default App;
