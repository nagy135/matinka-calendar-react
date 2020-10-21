import React, { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import axios from "axios";

import MyForm from "./Form"

import Modal from 'react-modal';

import 'react-calendar/dist/Calendar.css';

import './Reservation.css'

const recordsUrl = "http://localhost:4000/records";

const Reservation = () => {

    const [value, onChange] = useState(new Date());

    const [marks, setMarks] = useState([]);


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
    }

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };
    // }}}


    const datePicked = (e) => {
        openModal();
    }

    const refreshDates = () => {
        axios.get(recordsUrl)
            .then(res => {
                const data = res.data;
                const records = data.data.records;
                setMarks(records.map((e) => {
                    return e.date;
                }));
            })

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
                tileClassName={({ date, view }) => {
                    const formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    if (marks.find(x => x === formattedDate)) {
                        return 'highlight'
                    }
                }}
                minDate={new Date()}
            >
            </Calendar>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={customStyles}
                contentLabel="Pridaj hodinu"
                ariaHideApp={false}
            >
                <h2 className='modal-title' ref={_subtitle => (subtitle = _subtitle)}>Pridaj hodinu</h2>
                <button className='modal-close' onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                <MyForm />
            </Modal>
        </div>
    );
}

export default Reservation;
