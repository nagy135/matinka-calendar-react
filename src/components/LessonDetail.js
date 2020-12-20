import React from 'react';
import { useState } from "react";
import axios from "axios";
import {ListGroup, Button, Form} from 'react-bootstrap';
import {recordsUrl} from '../constants';

import './css/LessonDetail.css';

const LessonDetail = (props) => {
    let guestRecord = props.guestRecord;

    const reserveLesson = async () => {
        console.log(attendant);
        await axios.patch(recordsUrl + '/' + guestRecord.id + '/attend',
            {
                firstName: attendant.firstName,
                lastName: attendant.lastName,
                email: attendant.email,
            }
        );
        alert("Hodina rezervovana uspesne");
        props.closeGuestModal();
    }

    const [attendant, setAttendant] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [canSubmit, setCanSubmit] = useState(false);
    const inputChange = (event) => {
        const newAttendant = {
            ...attendant,
            [event.target.name]: event.target.value
        };
        setAttendant(newAttendant);
        if (newAttendant.firstName && newAttendant.lastName && newAttendant.email ) setCanSubmit(true);
        else setCanSubmit(false);
    }

    if (guestRecord){
        return (
            <div>
                <ListGroup>
                    <ListGroup.Item>{guestRecord.id}</ListGroup.Item>
                    <ListGroup.Item>{guestRecord.description}</ListGroup.Item>
                    <ListGroup.Item>{guestRecord.attendants}</ListGroup.Item>
                </ListGroup>
                <hr />
                <Form
                    className="attend-form"
                    onSubmit={reserveLesson}
                >
                    <Form.Group controlId="firstName">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control
                            onChange={inputChange}
                            name="firstName"
                            value={attendant.firstName}
                            type="text"
                            placeholder="Tvoje meno"
                        />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Priezvisko</Form.Label>
                        <Form.Control
                            onChange={inputChange}
                            name="lastName"
                            value={attendant.lastName}
                            type="text"
                            placeholder="Tvoje priezvisko"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            onChange={inputChange}
                            name="email"
                            value={attendant.email}
                            type="text"
                            placeholder="Tvoj email"
                        />
                    </Form.Group>
                    <Button
                        className="reserve-lesson"
                        variant="success"
                        disabled={!canSubmit}
                        type="submit"
                    >
                        Prihlasujem sa
                    </Button>
                </Form>
            </div>
        )
    } else {
        return (
            <div>
                loading...
            </div>
        )
    }
}

export default LessonDetail;
