import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chat from '../chat';

class Dashboard extends Component {
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
  componentDidMount() {
    (function(d, m){
        var kommunicateSettings = 
            {"appId":"1ba12c38881635552a178a7b7869a03e6","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
  onChangeHandler=event=>{
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
        this.setState({base64File: "data:image/png;base64," + img});
        console.log(this.state.base64File);
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
            <div className="form-group files">
                <label>Upload Your File</label>
                <input type="file" className="form-control" name="file" onChange={this.onChangeHandler}></input>
                <button style={{margin: "0 auto"}} type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                {this.state.base64File ? <img src={this.state.base64File}/>: ''}
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
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