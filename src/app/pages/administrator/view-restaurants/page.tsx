'use client'; // This is necessary to use React hooks in Next.js 13 (for client-side rendering)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import './styles.css';

// Axios instance for API requests
const instance = axios.create({
    baseURL: 'https://q3l4c6o0hh.execute-api.us-east-2.amazonaws.com/initial',
    timeout: 5000, //optional: establish a timeout for requests.
});

export default function adminViewRestaurants() {
    const [restaurants, setRestaurants] = useState<any[]>([]);  // State to hold restaurant data
    const [error, setError] = useState<string>('');  // State to hold any error messages

    // Function to fetch active restaurants
    const listAll = () => { //deleted async so I can try something
        instance.get('/adminListRestaurants').then((response) => {
            if (response.status === 200 && response.data.body) {
                const body = JSON.parse(response.data.body);
                const resultingData = body.result;
                if (resultingData && resultingData.length > 0) {
                    setRestaurants(resultingData);
                } else {
                    setError("No Active Restaurants on this poverty-aah site.");
                }
            } else {
                setError("Unexpected response structure.");
            }
        })
        .catch((err) => {
            if (axios.isAxiosError(err)) {
                setError('Axios Error: ${err.message}');
                console.error("Axios Error:", err.message);
                if (err.response) {
                    console.error("Error Response:", err.response);
                } else if (err.request) {
                    console.error("Error Request:", err.request);
                }
            } else {
                setError('Unexpected Error occurred.');
                console.error("Unexpected Error:", err);
            }
        })
        
    };

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        listAll();
    }, []);  // Empty dependency array means this runs only once after the first render
    return (
        <div>
            <div>
                    <Link href="./homepage" className="back-button">Back</Link>
            </div>
            <div className="browserestaurants">
            
                <div className="listAll">
                <div className="adminHeader">Restaurants</div>
                    {error && <p>{error}</p>} {/* Show error message if there was an issue */}
                    {restaurants.length > 0 ? (
                        <ul>
                            {restaurants.map((restaurant) => (
                                <li key={restaurant.res_UUID}>
                                    <h3><strong> Restaurant Name: </strong>{restaurant.restaurantName}</h3>
                                    <p><strong>Address:</strong> {restaurant.address}</p>
                                    <p><strong>Open Time:</strong> {restaurant.openTime}</p>
                                    <p><strong>Close Time:</strong> {restaurant.closeTime}</p>
                                    <p><strong>Active?:</strong> {restaurant.closeTime}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No active restaurants available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}