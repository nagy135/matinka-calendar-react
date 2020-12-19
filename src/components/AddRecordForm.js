import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import {recordsUrl} from '../constants';

import './css/AddRecordForm.css';

const AddRecordForm = (props) => {

    const createNewRecord = async (event) => {
        event.preventDefault();
        await axios.post(recordsUrl, {
            date: props.getPickedDate(),
            time: data.time,
            title: data.title,
            description: data.description
        });
        props.closeModal();
    };

    const [data, setData] = useState({
        title: '',
        description: '',
        time: ''
    });
    const [canSubmit, setCanSubmit] = useState(false);

    const inputChange = (event) => {
        const newData = {
            ...data,
            [event.target.name]: event.target.value
        };
        setData(newData);
        if (newData.title && newData.description && newData.time) setCanSubmit(true);
        else setCanSubmit(false);
    }

    return (
        <Form
            className="add-form"
            onSubmit={createNewRecord}
        >
            <Form.Group controlId="title">
                <Form.Label>Nazov</Form.Label>
                <Form.Control
                    onChange={inputChange}
                    name="title"
                    value={data.title}
                    type="text"
                    placeholder="Power Yoga"
                />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Popis</Form.Label>
                <Form.Control
                    onChange={inputChange}
                    name="description"
                    value={data.description}
                    type="text"
                    placeholder="Quick evening session"
                />
            </Form.Group>

            <Form.Group controlId="time">
                <Form.Label>Cas</Form.Label>
                <Form.Control
                    onChange={inputChange}
                    name="time"
                    value={data.time}
                    type="time"
                    placeholder="20:20"
                />
            </Form.Group>

            <Button
                disabled={!canSubmit}
                variant="primary"
                type="submit"
            >
                Vytvorit
            </Button>
        </Form>
    );
}

export default AddRecordForm;
