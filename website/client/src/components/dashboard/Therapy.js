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
      <div className="container ">
        <br />
        <br />
        <br />

        <div className="row valign-wrapper">
          <div className="col s6 center-align" >
            <img src="" id="tableBanner" height="300px" style={{ marginBottom: "10px", borderRadius: "20%" }} />
          </div>
          <div className="col s6 center-align" style = {{fontSize:"large"}}>
            Click the icon in the bottom right
          </div>
        </div>
        <div className="" style = {{textAlign:"center"}}>
          <Link to="/avatar" className="btn btn-large waves-effect waves-light hoverable blue accent-3">End the session</Link>
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