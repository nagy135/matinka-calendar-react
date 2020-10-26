import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import axios from "axios";

import {Button} from "react-bootstrap";

import AddRecordForm from "./AddRecordForm";

import Modal from 'react-modal';

import 'react-calendar/dist/Calendar.css';

import './css/Reservation.css';
import {formatDate, getKeyByValue} from '../helpers';
import {recordsUrl} from '../constants';


const Reservation = () => {

    const [value] = useState(new Date());

    const [marks, setMarks] = useState({});

    const [date, setDate] = useState('');

    // add record {{{ 
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        subtitle.style.color = '#1abc9c';
    }

    const closeModal = () => {
        setIsOpen(false);
        refreshDates();
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
            const response = window.confirm('Chces zmazat hodinu?');
            if (response) deleteRecord(
                getKeyByValue(marks, date)
            );
        } else {
            setDate(date);
            openModal();
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
        </div>
    );
}

export default Reservation;
