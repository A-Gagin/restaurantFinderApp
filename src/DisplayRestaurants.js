import { Typography } from '@material-ui/core';

function DisplayRestaurants(props) {
    if (props.restaurants != null) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {
                    props.restaurants.map((restaurant) => (
                        <div style={{ display: "flex", height: "150px", width: "320px", flexDirection: "column", alignItems: "center", border: "dotted", borderColor: "darkslategray", flexWrap: "wrap", backgroundColor: "darkgray", padding: "10px", margin: "4px", borderRadius: "10px" }}>
                            <Typography variant="h6">{restaurant.name}</Typography>
                            <br />
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "left", paddingBottom: "10px" }}>
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
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6">No locations found.</Typography>
            </div>
            
            );
    }

}

export default DisplayRestaurants;