import { Button, ButtonGroup } from '@material-ui/core';
function SortRestaurants(props) {

    const compareName = (a, b) => {
        //console.log("name restaurants", props.restaurants);

        let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    const comparePrice = (a, b) => {
        //console.log("price restaurants", props.restaurants);
        let priceA = 4,
            priceB = 4;

        if (a.price_level != null) {
            priceA = a.price_level;
        }
        if (b.price_level != null) {
            priceB = b.price_level;
        }

        if (priceA < priceB) {
            return -1;
        }
        if (priceA > priceB) {
            return 1;
        }
        return 0;
    }

    const compareRating = (a, b) => {
        //console.log("rating restaurants", props.restaurants);
        let ratingA = 0,
            ratingB = 0;
        
        if (a.rating != null){
            ratingA = a.rating;
        }

        if (b.rating != null){
            ratingB = b.rating;
        }

        if (ratingA < ratingB) {
            return 1;
        }
        if (ratingA > ratingB) {
            return -1;
        }
        return 0;
    }

    const sortName = () => {
        let newArray = props.restaurants.sort(compareName);
        props.setRestaurants([...newArray]);
    }

    const sortPrice = () => {
        let newArray = props.restaurants.sort(comparePrice);
        props.setRestaurants([...newArray]);
    }

    const sortRating = () => {
        let newArray = props.restaurants.sort(compareRating);
        props.setRestaurants([...newArray]);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={sortName}>
                    Sort by Name
                    </Button>

                <Button onClick={sortPrice}>
                    Sort by Price
                    </Button>

                <Button onClick={sortRating}>
                    Sort by Rating
                    </Button>
            </ButtonGroup>
            <br />
        </div>

    )
}

export default SortRestaurants;