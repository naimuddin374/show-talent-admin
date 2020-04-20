import React, { Component, Fragment } from 'react'
import MyMeeting from './MyMeeting'
// import ArchiveMeeting from './ArchiveMeeting'

class PageNotFound extends Component {
    render() {
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1>404, Page Not Found</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
export default PageNotFound