import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Alert,
  Spinner
} from "reactstrap";
import background from "../background.png";
import { Player } from 'video-react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      loading: ''
    };
  }
  onSubmit = (event) => {
    if (!this.state.url) {
      return;
    }
    this.setState({ loading: "yes" });
    event.preventDefault();
    if ((/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/).test(this.state.url)) {
      var type = "image";
    }
    else if ((/^(http)?s?:?(\/\/[^"']*\.(?:mp4|webm|ogv|3gp))$/).test(this.state.url)) {
      var type = "video"
    }
    else {
      var type = null;
    }
    if (type) {
      fetch("/encodeURL", {
        method: 'POST',
        body: JSON.stringify({ url: this.state.url }),
        headers: {
          'Content-Type': "application/json"
        }
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
          else {
            return null;
          }
        })
        .then((data) => {
          this.setState({ loading: 'no' });
          if (data) {
            // src={`data:video;base64,${data.url} `}
            if (type == "video")
              var Element = () => <Player src={`data:video/mp4;base64,${data.url} `} autoPlay style={{ fluid: false, width: 20 }} />
            else
              var Element = () => <img src={`data:image;base64,${data.url}`} style={{ maxWidth: 1000 }}></img>;
            // ReactDOM.render(<Element decode={data.url} />, document.getElementById('decodedURL'));
            const newElement = React.createElement('div', { style: { marginTop: 20, marginLeft: 42, marginBottom: 10, fontWeight: "bold" } }, 'Decoded URL!');
            const decodedURL = React.createElement('Textarea', { readOnly: true, style: { marginLeft: 42, marginRight: 20, height: 300, width: 800 } }, data.url);
            const newElement1 = React.createElement('div', { style: { marginTop: 30, marginLeft: 42, marginBottom: 30, fontWeight: "bold" } }, 'Output ' + type);
            ReactDOM.render([newElement, decodedURL, newElement1, < Element />], document.getElementById("decodedURL"));
          }
          else {
            throw "Error Occured! No data recieved from the server!";
          }
        })
        .catch((err) => console.log(err));
    }
    else {
      this.setState({ loading: 'no' });
      const newElement = React.createElement('div', { style: { marginTop: 30, marginLeft: 42, marginBottom: 30, fontWeight: "bold" } }, 'Invalid URL! Please type an Image or Video URL!');
      ReactDOM.render(newElement, document.getElementById("decodedURL"));
    }
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div id="body" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", minWidth: 200, minHeight: 660 }}>
        <Navbar dark>
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">
              <img src="logo.png" height="35" width="35" alt="Iris Idea" />
            </NavbarBrand>
            <NavbarBrand
              className="mr-auto"
              style={{ color: "white" }}
            >
              Irisidea Techsolutions
            </NavbarBrand>
          </div>
        </Navbar>
        <Form onSubmit={this.onSubmit} style={{ marginTop: 20 }}>
          <FormGroup>
            <Label htmlFor="URL"><b>URL</b></Label><br />
            <Input placeholder="Enter a Image/Video URL" type="textarea" id="URL" name="url" value={this.state.url} onChange={this.handleInputChange}
              style={{ width: 800, height: 100, marginLeft: 300 }}
              required />
          </FormGroup>
          <Button type="submit" value="submit" outline color="primary" onClick={() => { ReactDOM.render(null, document.getElementById("decodedURL")); }}>Convert To Base64</Button><br />
        </Form>
        {this.state.loading == "yes" ? <Spinner style={{ marginTop: 100 }} color="dark" /> : null}
        <div id="decodedURL" style={{ marginTop: 50 }}></div>
      </div >
    );
  }
}

export default withRouter(Home);
