import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './Map.css';
const API_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // for some reason doesn't work
//Bug: can't update map focus. Not sure how to fix.

function DisplayMap(props) {

    const [lati, setLatitude] = useState(props.latitude);
    const [long, setLongitude] = useState(props.longitude);



    const [viewport, setViewport] = useState({
        latitude: lati,
        longitude: long,
        width: "50vw",
        height: "50vh",
        zoom: 10
    });

    const updateMap = () => {
        setLatitude(props.latitude);
        setLongitude(props.longitude);
        // if(lati && long){
        //     setViewport({
        //         latitude: lati,
        //         longitude: long,
        //         width: "50vw",
        //         height: "50vh",
        //         zoom: 10
        //     })
        // }
    }

    const [selected, setSelected] = useState(null);

    if(props.restaurants === null){
        return null;
    }
    console.log("latitude", props.latitude);
    console.log("longitude", props.longitude);
    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={"pk.eyJ1IjoibGF6aW9saSIsImEiOiJja3AxdXRjenMwY2pnMm50ZjY3Z3FzdmQwIn0.vvxu8liKvbdBvwqSK1pupg"}
                // I know this is bad practice, but can't get it to work with the .env for some reason?
                // mapStyle="mapbox://styles/lazioli/ckp21ezd037gm17qk5fin5vl5"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                {props.restaurants.map((restaurant) => (
                    <Marker key={restaurant.place_id} latitude = {restaurant.geometry.location.lat} longitude = {restaurant.geometry.location.lng}>
                        <button className="marker-btn" onClick={(e) => {
                            e.preventDefault();
                            setSelected(restaurant);
                        }}>
                            <img src={restaurant.icon} alt="Restaurant Icon"/>
                        </button>
                    </Marker>
                ))}

                {selected ? (
                    <Popup latitude={selected.geometry.location.lat} longitude={selected.geometry.location.lng} onClose={() => {setSelected(null)}}>
                        <div>
                            <li>{selected.name}</li>
                            <li>{selected.vicinity}</li>
                            <li>{selected.rating != null ? selected.rating + " / 5" : "Rating data not available."}</li>
                            <li>{selected.price_level != null ? "$".repeat(selected.price_level) : "Price data not available."}</li>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
            {/* <button onClick={updateMap}>Update Map</button> */}
        </div>
    );
}

export default DisplayMap;