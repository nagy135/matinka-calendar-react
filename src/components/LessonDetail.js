import React from 'react';

const LessonDetail = (props) => {
    let guestRecord = props.guestRecord;
    if (guestRecord){
        return (
        <div>
            <div>{guestRecord.id}</div>
            <div>{guestRecord.description}</div>
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
