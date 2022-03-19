import React from "react";
 
// We import NavLink to utilize the react router.
import { Link } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar () {
    return (
        <div class="topnav topnav-left">
            <Link to="/" class="homelink">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/records">Records</Link>
        </div>
    )
}