'use client'                     // NEED THIS to be able to embed HTML in TSX file
import React from 'react';
import axios from "axios";


// all WEB traffic using this API instance. You should replace this endpoint with whatever
// you developed for the tutorial and adjust resources as necessary.
const instance = axios.create({
    baseURL: 'https://q3l4c6o0hh.execute-api.us-east-2.amazonaws.com/initial/'
});

export default function editRestaurantPage() {
    const [redraw, forceRedraw] = React.useState(0)       // used to conveniently request redraw after model change

    // utility method (that can be passed around) for refreshing display in React
    const andRefreshDisplay = () => {
        forceRedraw(redraw + 1)
    }


    function activeRestaurant() {

        instance.post('', {

        })
            .then(function (response) {


            })
            .catch(function (error) {
                console.log(error)
            })
    }


    return (
        <div>

        </div>
    );
}