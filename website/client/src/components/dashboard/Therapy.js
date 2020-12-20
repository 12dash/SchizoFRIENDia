import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chat from './chat';

class Therapy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }
  onLogoutClick = e => {
    return <Redirect to="/therapy" />;
  };
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings =
        { "appId": "1ba12c38881635552a178a7b7869a03e6", "popupWidget": true, "automaticChatOpenOnNavigation": true };
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});

    var dataImage = localStorage.getItem('imgData');
    var bannerImg = document.getElementById('tableBanner');
    bannerImg.src = dataImage;
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s6 center-align">
          <div className="large big-heading">
              This is the incarnation of your voice!
            </div>
            <img src="" id="tableBanner" height="500px" style={{marginBottom:"10px"}}/>
            <Link to="/dashboard" className="btn btn-large waves-effect waves-light hoverable blue accent-3">Dashboard</Link>
          </div>
          <div className="col s6 center-align" style={{marginTop:"150px"}}>
            <h1 className="large">Therapy</h1>
            <div className="flow-text grey-text text-darken-1">
              Now, face your fears by clicking the chat icon at the bottom-right corner of your screen and talk to the voice in your head. They may not be as scary as you perceive it to be.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Therapy.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Therapy);