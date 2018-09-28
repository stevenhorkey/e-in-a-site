import React, { Component, Fragment } from 'react';
import API from "../../utils/API.js";
import emailLead from "../../assets/img/email-lead.jpg";
class Subscribe extends Component {
  state = {
    loading: false,
    firstName: '',
    lastName: '',
    email: ''
  };

  componentDidMount = () => {};

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]:value});
  };

  submitForm = event => {
    event.preventDefault();
    console.log(event);

    // { firstName, lastName, email } = this.state;

    let data = {
      email_address: this.state.email,
      status_if_new: 'subscribed',
      // merge_fields: [
      //   "FNAME" = this.state.firstName,
      //   "LName" = this.state.lastName
      // ] 
    };

    API.mcAddSubscriber(data)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });

  };

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <div className="container">
            
            <div className="row d-flex align-items-center">
              <span className="col-7 text-justify">
              <h2 className="display-4 text-uppercase text-primary">Free Updates and Bonuses</h2>
              
              </span>
              <img className="col-5" src={emailLead} />
              <div className="my-4">Signup for the free Meme and Meaning newsletter and recieve a free downloadable pdf of my Top 22 Questions for Self Reflection.</div> 
            </div>
            <form className="row d-block text-left" onSubmit={this.submitForm}>
              <div className="col-sm-6 d-inline-block">
                <label className="" htmlFor="first-name">First Name</label>
                <input name="firstName" id="first-name" onChange={this.handleChange} value={this.state.firstName} className="w-100 px-2 py-1"/>
              </div>
              <div className="col-sm-6 d-inline-block">
                <label className="" htmlFor="last-name">Last Name</label>
                <input name="lastName" id="last-name" onChange={this.handleChange} value={this.state.lastName} className="w-100 px-2 py-1"/>
              </div>
              <div className="col-12">
                <label className="" htmlFor="email">Email</label>
                <input name="email" id="email" onChange={this.handleChange} value={this.state.email} className="w-100 px-2 py-1"/>
              </div>
              <input className="mx-auto text-uppercase btn btn-primary p-2 my-3 scale-item d-flex align-items-center" type="submit" value="Get my downloads"/>
              <small className="text-muted text-center d-block">No spam ever</small>
            </form>
          </div>
        </Fragment>
      );
    }
  }
}

export default Subscribe;
