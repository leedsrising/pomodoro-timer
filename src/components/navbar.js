import React from "react";
 
// We import NavLink to utilize the react router.
import { Link } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar () {
    return (
        <div className="topnav topnav-left">
            <Link to="/" className="homelink">Home</Link>
            <Link to="/records">Records</Link>
        </div>
    )
}