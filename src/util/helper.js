import React from 'react'
import Moment from 'react-moment';
import renderHTML from 'react-render-html';


export const getStatus = status => {
    switch (Number(status)) {
        case 0: return <span className='text-default'>Pending</span>
        case 1: return <span className='text-success'>Approve</span>
        case 2: return <span className='text-danger'>Rejected</span>
        case 3: return <span className='text-secondary'>Unpublished</span>
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

export const getAuthorName = (user, page = null) => {
    if (page) {
        return renderHTML(`<i class="fa fa-certificate" /> ${page.name}<br/>${page.email}`)
    } else {
        return renderHTML(`${user.name}<br/>${user.email}`)
    }
}
