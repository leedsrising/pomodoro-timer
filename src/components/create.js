import React from "react";
import {
    Button
} from 'rebass'
import { useNavigate } from "react-router";
import date from 'date-and-time';
 
export default function Create () {
    const now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');
    const navigate = useNavigate();

    async function onClick(e) {
        e.preventDefault();
 
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newTime = { time:  now};
        
        await fetch("http://localhost:3001/record/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newTime),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        navigate("/");
    }

    return (
        <div>
            <Button
                    onClick={onClick}
                    color='white'
                    backgroundColor='blue'
                    margin='5px'
                >
                    Start
            </Button>
        </div>
    );
}