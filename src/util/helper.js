import React from 'react'
import store from '../store';
import Moment from 'react-moment';

export const getStatus = status => {
    switch (Number(status)) {
        case 0: return <span className='text-default'>Pending</span>
        case 1: return <span className='text-success'>Approve</span>
        case 2: return <span className='text-danger'>Rejected</span>
        default: return status
    }
}

export const getVideoLink = link => {
    if (link && link.length > 11) {
        return link.slice(32, 43)
    } else {
        return link
    }
}
/* type value, 1=date and time, 2=date, 3=time */
export const getDateTime = (dateTime, type = 1) => {
    switch (type) {
        case 1: return <Moment format="D MMM YYYY H:mm A" withTitle>{dateTime}</Moment>
        case 2: return <Moment format="D MMM YYYY" withTitle>{dateTime}</Moment>
        case 3: return <Moment format="H:M A" withTitle>{dateTime}</Moment>
        default: return dateTime
    }
}

export const textLimit = (text, limit = 100) => {
    if (!text) {
        return null
    }
    if (text.length > limit) {
        return text.substring(0, limit) + "..."
    }
    return text
}
export const getItemPrice = (quantity, price, discount_price) => {
    let tPrice = 0
    if (discount_price !== null) {
        tPrice = tPrice + (quantity * discount_price)
    } else {
        tPrice = tPrice + (quantity * price)
    }
    return tPrice
}
export const priceCal = (price = 0, vat = 0, discount = 0) => {
    let subTotal = price - (price * discount) / 100;
    return Math.floor(subTotal + (subTotal * vat) / 100)
}

export const modalStyle = (width = "700px") => {
    return {
        content: {
            width: width,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: "#000"
        }
    }
}

export const setEndTime = startTime => {
    if (startTime === "09:00:00") {
        return "09:30:00"
    } else if (startTime === "09:30:00") {
        return "10:00:00"
    } else if (startTime === "10:00:00") {
        return "10:30:00"
    } else if (startTime === "10:30:00") {
        return "11:00:00"
    } else if (startTime === "11:00:00") {
        return "11:30:00"
    } else if (startTime === "11:30:00") {
        return "12:00:00"
    } else if (startTime === "12:00:00") {
        return "12:30:00"
    } else if (startTime === "12:30:00") {
        return "13:00:00"
    } else if (startTime === "13:00:00") {
        return "13:30:00"
    } else if (startTime === "13:30:00") {
        return "14:00:00"
    } else if (startTime === "14:00:00") {
        return "14:30:00"
    } else if (startTime === "14:30:00") {
        return "15:00:00"
    } else if (startTime === "15:00:00") {
        return "15:30:00"
    } else if (startTime === "15:30:00") {
        return "16:00:00"
    } else if (startTime === "16:00:00") {
        return "16:30:00"
    } else if (startTime === "16:30:00") {
        return "17:00:00"
    } else if (startTime === "17:00:00") {
        return "17:30:00"
    } else if (startTime === "17:30:00") {
        return "18:00:00"
    } else if (startTime === "18:00:00") {
        return "18:30:00"
    } else if (startTime === "18:30:00") {
        return "19:00:00"
    }
}