'use client'                     // NEED THIS to be able to embed HTML in TSX file
import React from 'react'


import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <div className = "HomePage">

        <div className = "browseRestaurants">
          <button className = "browseRestaurants-button">Browse Restaurants</button>
        </div>


        <div className = "signIn">
        <p>
            <Link href="/pages/loginpage" className = "signIn-button">Sign In</Link>
        </p>
        </div>

        <div className = "HomePage-Title">
          <p>Tables4U</p>
        </div>

      </div>
    </div>
  );
}
