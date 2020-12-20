import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';

class Dashboard extends Component {
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
    // (function (d, m) {
    //   var kommunicateSettings =
    //     { "appId": "1ba12c38881635552a178a7b7869a03e6", "popupWidget": true, "automaticChatOpenOnNavigation": true };
    //   var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    //   s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    //   var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    //   window.kommunicate = m; m._globals = kommunicateSettings;
    // })(document, window.kommunicate || {});
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:5001/predict", data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        console.log(res)
        console.log(res.statusText)
        const img = res.data;
        this.setState({ base64File: 'data:image/png;base64,' + img });
        localStorage.setItem("imgData", 'data:image/png;base64,' + img);
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <div className="flow-text grey-text text-darken-1">
              Hello, let us first give  the voices in your head a face.
            </div>
            <div className="form-group files">
              <label>Upload Your File</label>
              <input type="file" className="form-control" name="file" onChange={this.onChangeHandler}></input>
              <br />
              <button style={{ margin: "0 auto" }} type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
            </div>
            <br />
            {
              this.state.base64File ?
                <div className="row">
                  <div className="col center-align">
                    <img id="bannerImg" src={this.state.base64File} />
                  </div>
                  <div className="col-1 flow-text grey-text text-darken-1 left-align vert-align">
                    See that's the person who is the voice in the head.
                    <br/> Its as blurry as the voices. 
                  </div>
                </div>
                : <></>
            }
            <Link to="/therapy" className="btn btn-large waves-effect waves-light hoverable blue accent-3">Therapy</Link>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);