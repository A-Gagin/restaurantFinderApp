//import React, { useState } from "react";

function DisplayRestaurants(props) {
    if (props.restaurants != null) {
        return (
            <div>
                {
                    props.restaurants.map((restaurant) => (
                        <div>
                            <h5>{restaurant.name}</h5>
                            <div>
                                <li>{restaurant.vicinity}</li>
                                <li>{restaurant.rating != null ? restaurant.rating + " / 5" : "Rating data not available."}</li>
                                <li>{restaurant.price_level != null ? "$".repeat(restaurant.price_level) : "Price data not available."}</li>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    } else {
        return "No locations found.";
    }

}

export default DisplayRestaurants;