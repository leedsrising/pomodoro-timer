import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button
} from 'rebass'
import Table from './table.js'
 
const Record = (props) => (
    <div style={{'width': '500px', 'float': 'left'}}>
        <div style={{'margin': '15px', 'display': 'inline-block'}}>
            {props.record.current_time}
        </div>
        <div style={{'margin': '15px', 'display': 'inline-block'}}>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
        </div>
        <div style={{'margin': '15px', 'display': 'inline-block'}}>
            <Button
                backgroundColor='red'
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
                margin='5px'
            >
                Delete
            </Button>
        </div>
    </div>
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
        
        <div className="record-list">
            <Table columns={3} data={recordList()} />
        </div>
    );
}