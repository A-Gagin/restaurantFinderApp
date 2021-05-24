import React, { useState } from "react";
import { Button, ButtonGroup, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const API_KEY = process.env.REACT_APP_api_key;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function FindRestaurants(props) {
    const [address, setAddress] = useState(""); // used for geocoding api
    const [location, setLocation] = useState(""); // used for places api

    const [bar, setBar] = useState(false);
    const [cafe, setCafe] = useState(false);
    const [rest, setRest] = useState(true);
    const [typeFilter, setTypeFilter] = useState("Restaurant");

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
    const classes = useStyles();
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h3">Restaurant Finder</Typography>
            <br />
            <Typography variant="h6">— Search Filters —</Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField id="outlined-search" label="Street Address" type="search" variant="outlined" onChange={handleAddressSearch} />
                    <TextField id="outlined-search" label="Max Distance (miles)" type="search" variant="outlined" onChange={handleRadiusChange} />
                    <TextField id="outlined-search" label="Keyword" type="search" variant="outlined" onChange={handleKeywordChange} />
                </div>
            </form>


            <div>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={changeRest}>
                        Search for Restaurants
                    </Button>

                    <Button onClick={changeBar}>
                        Search for Bars
                    </Button>

                    <Button onClick={changeCafe}>
                        Search for Cafes
                    </Button>
                </ButtonGroup>

            </div>
            <br />
            <div style={{ display: "flex", height: "200px", width: "300px", flexDirection: "column", alignItems: "center", border: "dotted", borderColor: "darkslategray", flexWrap: "wrap", backgroundColor: "darkgray", padding: "10px", margin: "4px", borderRadius: "10px"}}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6">— Active Filters —</Typography>
                <br />
            </div>

            <div>
                <li>Location: {address}</li>
                <li>Max Distance: {radius} miles</li>
                <li>Cuisine Keywords: {keyword}</li>
                <li>Type of Establishment: {typeFilter}</li>
            </div>
            <br />

            <Button variant="contained" color="secondary" onClick={getLocation}>
                Set Filters
            </Button>
            </div>

            <br />
            <br />

            <Button variant="contained" color="primary" onClick={getRestaurants}>
                Get Some Locations!
            </Button>
            <br />

        </div>
    );
}
export default FindRestaurants;