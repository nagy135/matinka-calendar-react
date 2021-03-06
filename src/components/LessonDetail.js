import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import {Table, Container, Button, Form} from 'react-bootstrap';
import {attendantsUrl} from '../constants';

import './css/LessonDetail.css';

const LessonDetail = (props) => {
  let guestRecord = props.guestRecord;

  const reserveLesson = async () => {
    await axios.post(attendantsUrl,
                     {
                       firstName: attendant.firstName,
                       lastName: attendant.lastName,
                       email: attendant.email,
                       recordId: guestRecord.id
                     }
                    );
    alert("Hodina rezervovana uspesne");
    props.closeGuestModal();
  }

  const getAttendantCount = async (recordId) => {
    const response = await axios.get(attendantsUrl + "/" + recordId + " /count");
    setAttendantCount(response.data.data.attendantCount);
  }

  const getAttendantNames = async (recordId) => {
    const response = await axios.get(attendantsUrl + "/" + recordId + " /names");
    setAttendantNames(response.data.data.attendants);
  }

  const [attendantCount, setAttendantCount] = useState(0);
  const [attendantNames, setAttendantNames] = useState([]);

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
  useEffect(() => {
    getAttendantCount(guestRecord.id);
    getAttendantNames(guestRecord.id);
  }, []);

  if (guestRecord){
    return (
      <div>
        <Container className="record">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Nazov</td>
                <td>{guestRecord.title}</td>
              </tr>
              <tr>
                <td>Popis</td>
                <td>{guestRecord.description}</td>
              </tr>
              <tr>
                <td>Prihlaseny</td>
                <td>
                  {attendantNames.map((e,i) => [<span key={i}>{e}</span>,<br key={e}/>])}
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
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
