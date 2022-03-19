import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button
} from 'rebass'
 
const Record = (props) => (
    <tr>
        <td>{props.record.time}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <Button
                backgroundColor='red'
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
                margin='5px'
            >
                Delete
            </Button>
        </td>
    </tr>
);
 
export default function RecordList () {
    const [records, setRecords] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:3001/record/`);
        
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
        
            const records = await response.json();
            console.log(records.length)
            setRecords(records);
        }
        
        getRecords();
        
        
        return;
    }, [records.length]);
    
    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:3001/${id}`, {
            method: "DELETE"
        });
        
        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }
    
    // This method will map out the records on the table
    function recordList() {
    return records.map((record) => {
        console.log(record)
        return (
        <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            key={record._id}
        />
        );
    });
 }
 
    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}