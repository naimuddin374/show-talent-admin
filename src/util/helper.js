import React from 'react'
// import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import dateFormat from 'dateformat';
import TimeAgo from 'react-timeago'


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

export const getDateTime = (date, type = 2) => {
    if (!date) return ''
    date = new Date(date)
    let newDate = new Date()

    let milliseconds = Math.abs(newDate - date);
    let hours = milliseconds / 36e5;

    if (hours > 24) {
        if (type === 1) {
            return dateFormat(new Date(date), "d mmm yyyy h:MM TT");
        } else if (type === 2) {
            return dateFormat(new Date(date), "d mmm yyyy");
        } else if (type === 3) {
            return dateFormat(new Date(date), "h:MM tt");
        }
    } else {
        return <TimeAgo date={date} />
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
