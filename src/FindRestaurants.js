import React, { useState } from "react";
const API_KEY = process.env.REACT_APP_api_key;

function FindRestaurants(props) {
    const [address, setAddress] = useState(""); // used for geocoding api
    const [location, setLocation] = useState(""); // used for places api

    const [bar, setBar] = useState(false);
    const [cafe, setCafe] = useState(false);
    const [rest, setRest] = useState(false);
    const [typeFilter, setTypeFilter] = useState("");

    const [radius, setRadius] = useState(0);
    const [keyword, setKeyword] = useState("");

    const handleAddressSearch = (e) => {
        setAddress(e.target.value);
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    }

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const changeRest = () => {
        setRest(true);
        setBar(false);
        setCafe(false);
        setTypeFilter("Restaurant");
    }

    const changeBar = () => {
        setBar(true);
        setRest(false);
        setCafe(false);
        setTypeFilter("Bar");
    }

    const changeCafe = () => {
        setCafe(true);
        setRest(false);
        setBar(false);
        setTypeFilter("Cafe");
    }

    const getLocation = () => {
        const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("address", address.replaceAll(" ", "%20"));

        console.log("url", url); // testing

        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                if (obj.status === "OK") {
                    console.log("Geocoding call", obj) // testing
                    let lat = obj.results[0].geometry.location.lat.toString();
                    let long = obj.results[0].geometry.location.lng.toString();
                    props.setLatitude(lat);
                    props.setLongitude(long);
                    setLocation(lat + "," + long);
                    console.log(location);
                } else {
                    setLocation("38.0293,-78.4767");
                    console.log("uh oh!"); //TODO: Make this an actual error statement lmao
                }
            })
    }

    const getRestaurants = () => {
        let type = "";
        if (bar) {
            type = "bar";
        } else if (cafe) {
            type = "cafe";
        } else if (rest) {
            type = "restaurant";
        }

        console.log("type", type);

        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("location", location); // Uses geocoding api to determine location
        url.searchParams.append("radius", radius * 1609.34); // Max distance from current location. '* 1609.34' converts meters to miles.
        url.searchParams.append("type", type); // Restaurant, bar, or cafe
        url.searchParams.append("keyword", keyword); // Search keyword... enables looking up particular cuisine
        url.searchParams.append("opennow", ""); // Only display locations that are open.


        // Tried using axios earlier, for some reason it absolutely ate CPU on my machine to the point that it was inoperable
        fetch(url)
            .then((resp) => {
                return resp.json();
            })
            .then((obj) => {
                if (obj.status === "OK") {
                    props.setRestaurants(obj.results);
                } else {
                    props.setRestaurants(null);
                }
            });
    };

    return (
        <div>
            <h3>Search Filters:</h3>
            <div>
                <input name="Street Address" onChange={handleAddressSearch} />

                <input name="Max Distance" onChange={handleRadiusChange} />

                <input name="Keyword" onChange={handleKeywordChange} />
            </div>

            <div>
                <button onClick={changeRest}>
                    Search for Restaurants
                </button>

                <button onClick={changeBar}>
                    Search for Bars
                </button>

                <button onClick={changeCafe}>
                    Search for Cafes
                </button>
            </div>



            <div>
                Filters active: <br />
                <li>Location: {address}</li>
                <li>Max Distance: {radius} miles</li>
                <li>Cuisine Keywords: {keyword}</li>
                <li>Type of Establishment: {typeFilter}</li>
            </div>

            <button onClick={getLocation}>
                Set Filters
            </button>

            <br />

            <button onClick={getRestaurants}>
                Get Some Locations!
            </button>

        </div>
    );
}
export default FindRestaurants;