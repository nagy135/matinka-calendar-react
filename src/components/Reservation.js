import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import axios from "axios";

import {Button} from "react-bootstrap";

import AddRecordForm from "./AddRecordForm";
import LessonDetail from "./LessonDetail";

import Modal from 'react-modal';

import 'react-calendar/dist/Calendar.css';

import './css/Reservation.css';
import {formatDate, getKeyByValue} from '../helpers';
import {recordsUrl} from '../constants';


const Reservation = (props) => {

    const [value] = useState(new Date());

    const [marks, setMarks] = useState({});

    const [date, setDate] = useState('');

    const [guestRecord, setGuestRecord] = useState({
        id: 0,
        date: '',
        time: '',
        title: '',
        description: '',
        attendants: 0 
    });

    const getRecordDetail = async (date) => {
        const response = await axios.get(`${recordsUrl}/find-by-date`, {
            params: {
                date
            }
        });
        setGuestRecord(response.data.data.record);
    };

    // add record {{{ 
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [guestModalIsOpen,setGuestIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const openGuestModal = async (date) => {
        await getRecordDetail(date);
        setGuestIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        refreshDates();
    }

    const closeGuestModal = () => {
        setGuestIsOpen(false);
    }

    const afterOpenModal = () => {
        subtitle.style.color = '#1abc9c';
    }

    const guestAfterOpenModal = () => {
        subtitle.style.color = '#1abc9c';
    }

    // }}}

    const getDate = () => {
        return date;
    };

    const deleteRecord = async (id) => {
        await axios.delete(`${recordsUrl}/${id}`)
        refreshDates();
    }

    const datePicked = (date) => {
        date = formatDate(date);
        if (
            Object.values(marks).includes(date)
        ){
            if (props.logged){
                const response = window.confirm('Chces zmazat hodinu?');
                if (response)
                    deleteRecord(
                        getKeyByValue(marks, date)
                    );
            } else {
                openGuestModal(date);
            }
        } else {
            if (props.logged){
                setDate(date);
                openModal();
            }
        }

    }

    const refreshDates = () => {
        axios.get(recordsUrl)
            .then(res => {
                const data = res.data;
                const records = data.data.records;
                let newMarks = {};
                records.map((e) => {
                    newMarks[e.id] = e.date;
                });
                setMarks(newMarks);
            });
    }

    useEffect(() => {
        refreshDates();
    }, []);

    return (
        <div className="Reservation">
            <Calendar
                style={{ height: 500 }}
                onChange={datePicked}
                value={value}
                tileClassName={({ date }) => {
                    const formattedDate = formatDate(date);
                    if (Object.values(marks).find(x => x === formattedDate)) {
                        return 'highlight'
                    }
                }}
                minDate={new Date()}
            >
            </Calendar>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={{
                    content : {
                        top: '50%',
                        left: '50%',
                        padding: '10px',
                        width: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
                contentLabel="Pridaj hodinu"
                ariaHideApp={false}
            >
                <Button
                    className="modal-close"
                    variant="danger"
                    onClick={closeModal}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                <h2 className='modal-title' ref={_subtitle => (subtitle = _subtitle)}>Pridaj hodinu</h2>
                <AddRecordForm
                    getPickedDate={getDate}
                    closeModal={closeModal}
                />
            </Modal>
            <Modal
                isOpen={guestModalIsOpen}
                onAfterOpen={guestAfterOpenModal}
                contentLabel="Detail hodiny"
                ariaHideApp={false}
                style={{
                    content : {
                        top: '30%',
                        left: '50%',
                        padding: '10px',
                        right: 'auto',
                        bottom: 'auto',
                        width: '50%',
                        transform: 'translate(-50%, -15%)'
                    }
                }}
            >
                <Button
                    className="modal-close"
                    variant="danger"
                    onClick={closeGuestModal}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                <h2 className='modal-title' ref={_subtitle => (subtitle = _subtitle)}>Detail hodiny</h2>
                <LessonDetail
                    guestRecord={guestRecord}
                    closeGuestModal={closeGuestModal}
                />
            </Modal>
        </div>
    );
}

export default Reservation;
