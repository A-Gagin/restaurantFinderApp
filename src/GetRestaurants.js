import axios from "axios";
//import React, { useState } from "react";

// for some reason this absolutely EATS CPU so I can't use it currently

const API_KEY = process.env.REACT_APP_api_key;

function GetRestaurants(props) {
    axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
            key: API_KEY,
            location: "38.0293,-78.4767",
            radius: 10 * 1609.34,
        }
    })
    .then ((result) => {
        props.setRestaurants(result.data.results);
    })

    return null;

}
export default GetRestaurants;