import { Typography } from '@material-ui/core';

function DisplayRestaurants(props) {
    if (props.restaurants != null) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "300px", overflowY: "scroll", backgroundColor: "gray", borderRadius:"10px"}}>
                {
                    props.restaurants.map((restaurant) => (
                        <div style={{ display: "flex", height: "200px", width: "380px", flexDirection: "column", alignItems: "center", border: "dotted", borderColor: "darkslategray", flexWrap: "wrap", backgroundColor: "darkgray", padding: "10px", margin: "4px", borderRadius: "10px", marginLeft: "auto", marginRight: "auto"}}>
                            <Typography variant="h6">{restaurant.name}</Typography>
                            <br />
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "left", paddingBottom: "10px", marginLeft: "auto", marginRight: "auto"}}>
                                <li>{restaurant.vicinity}</li>
                                <li>{restaurant.rating != null ? restaurant.rating + " / 5" : "Rating data not available."}</li>
                                <li>{restaurant.price_level != null ? "$".repeat(restaurant.price_level) : "Price data not available."}</li>
                                <li><a href={"https://www.google.com/maps/dir/?api=1&origin=" + props.latitude + "," + props.longitude + "&destination=" + restaurant.geometry.location.lat + "," + restaurant.geometry.location.lng} target="_blank" rel="noreferrer">Get Directions</a></li>
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