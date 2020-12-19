import React from 'react';
import axios from "axios";
import {ListGroup, Button} from 'react-bootstrap';
import {recordsUrl} from '../constants';

import './css/LessonDetail.css';

const LessonDetail = (props) => {
    let guestRecord = props.guestRecord;

    const reserveLesson = async () => {
        await axios.patch(recordsUrl + '/' + guestRecord.id + '/attend',
            {
                lastName: "nagy"
            }
        );
    }

    if (guestRecord){
        return (
            <div>
                <ListGroup>
                    <ListGroup.Item>{guestRecord.id}</ListGroup.Item>
                    <ListGroup.Item>{guestRecord.description}</ListGroup.Item>
                    <ListGroup.Item>{guestRecord.attendants}</ListGroup.Item>
                </ListGroup>
                <Button
                    className="reserve-lesson"
                    variant="success"
                    onClick={reserveLesson}
                >
                    Prihlasujem sa
                </Button>
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
