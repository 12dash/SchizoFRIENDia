import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


import Therapy from "../../images/Therepy.jpeg";

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <>
                <div className="jumbotron" style={{ marginLeft: "3rem", marginTop: "2rem" }}>
                    <div className="row valign-wrapper">
                        <div className="col s2 offset-s1">
                            <img src={Therapy} style={{ height: "300px", width: "450px", borderRadius: "1rem", opacity: "0.9" }} />
                        </div>
                        <div className="col offset-s3 center-align">
                            <div style={{ letterSpacing: "4px", fontWeight: "100", fontSize: "xx-large", textAlign: "left" }}> </div>
                            <hr style={{ borderStyle: "inset", borderWidth: "0.5px" }} />
                            <div style={{ textAlign: "left", lineHeight: '2rem', fontSize: "large" }}>
                                You are hearing the voices in your head? They tell you something? <br />
                                <blockquote style={{ fontWeight: "100" }}>
                                    Something not nice... <br />
                                    Sometimes to harm yourself ...<br />
                                    Sometimes to not exists...<br />
                                </blockquote>
                            </div>
                            <hr style={{ borderStyle: "inset", borderWidth: "0.5px" }} />
                        </div>
                    </div>
                </div>
                <div className="body" style={{ marginLeft: "12rem", marginTop: "5rem" }}>
                    <div className="col s2 offset-s1" style={{ fontSize: "xxx-large", fontWeight: "200" }}>
                        Avatar Therepy
                        <hr />
                    </div>
                    <br />
                    <div className="">
                        <VerticalTimeline>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'rgb(51, 102, 153)', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}                            >
                                <h3 className="vertical-timeline-element-title">Give a face to the voice</h3>
                                <p>
                                    First of all we need to see how your voice looks like. So you are not afrain of him.
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'rgb(51, 102, 153', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}                            >
                                <h3 className="vertical-timeline-element-title">Fight with him</h3>
                                <p>
                                    You need to tell  the voice to stop bothering you, You need to be stronger.
                                </p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                        <div className="row center-align">
                            <Link to="/dashboard" className="btn btn-large waves-effect waves-light hoverable blue accent-3">Let's begin</Link>                            
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
Avatar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Avatar);