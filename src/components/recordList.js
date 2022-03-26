import '../index.css';
import React, { useEffect, useState } from "react";
import {
    Button,
    Text,
    Link
} from 'rebass'
import Table from './table.js'
 
const Record = (props) => (
    <li style={{'width': '500px', 'float': 'left', 'list-style-type': 'none'}}>
        <Text
            className="record"
            fontWeight='bold'
        >
            {props.record.current_time}
        </Text>
        <Button
            as='a'
            backgroundColor='blue'
            className="record btn btn-link"
            href="{`/edit/${props.record._id}`}"
            fontWeight='bold'
        >
            Edit
        </Button>
        <Button
            className="record"
            backgroundColor='red'
            onClick={() => {
                props.deleteRecord(props.record._id);
            }}
            variant='outline'
            mr={2}
            fontWeight='bold'
        >
            Delete
        </Button>
    </li>
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