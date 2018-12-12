import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import Header from '../../components/Header/Header';
import $ from 'jquery';
class Login extends Component {
  state = {
    loading: false,
    email: null,
    password: null,
    whichForm: 'login',
    async: true
  };

  componentDidMount = () => {};

  changeForm = (form, event) => {
    console.log(form, event.currentTarget)
    this.setState({
      whichForm: form
    })
  }

  attemptLogin = (event) => {
    event.preventDefault();
    this.setState({
      async: true
    })
    console.log('login')
    API.login('admin@memeandmeaning.com','Yekrohnevets@1997')
      .then(res => {
        this.setState({
          async: false
        })
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    if (!this.state.loading) {
      return( 
      <Fragment>
        <Header headImage="https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80">
          <div className="col-md-4 col-sm-6 col-12 bg-trans-dark py-4 text-left px-5 text-white" id="login-container">
            <div>
            <div className="row">
              <h3 className="" onClick={(event) => this.changeForm('login', event)}>Login</h3> 
              <h3 className="ml-auto text-muted" onClick={(event) => this.changeForm('signup', event)}>Signup</h3>
            </div>
              <form className="row">
                {(this.state.whichForm === 'login') ? 
                <Fragment>
                  <input name="email" className="w-100 col-md-12" placeholder="youremail@example.com" type="text"/>
                  <input name="password" className="w-100 col-md-12" placeholder="password" type="password"/>
                  <button className="btn btn-primary col-12 py-2" onClick={event => this.attemptLogin(event)}>Login</button>
                </Fragment>
                :
                <Fragment>
                  <input name="first-name" className="w-100 col-md-12" placeholder="First Name" type="text"/>
                  <input name="last-name" className="w-100 col-md-12" placeholder="Last Name" type="text"/>
                  <input name="email" className="w-100 col-md-12" placeholder="Email" type="text"/>
                  <input name="password" className="w-100 col-md-12" placeholder="Password" type="password"/>
                  <input name="password-confirm" className="w-100 col-md-12" placeholder="Confirm Password" type="password"/>
                  <input name="phone-number" className="w-100 col-md-12" placeholder="Phone Number" type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}"/>
                  <input name="phone-number" className="w-100 col-md-12" placeholder="Phone Number" type="checkbox"/>
                  <small className="d-inline">I agree to the <a href="/terms-and-conditions" target="_blank">terms and conditions</a></small>
                  <button className="btn btn-primary col-12 py-2" onClick={event => this.attemptLogin(event)}>Signup</button>
                </Fragment>
                }
                {(!this.state.async) ? null : 
                <div class="sk-folding-cube" style={{
                  position: "absolute",
                  bottom: 14,
                  right: 45
                }}>
                  <div class="sk-cube1 sk-cube"></div>
                  <div class="sk-cube2 sk-cube"></div>
                  <div class="sk-cube4 sk-cube"></div>
                  <div class="sk-cube3 sk-cube"></div>
                </div>
                }
              </form>
            </div>
          </div>
          <div className="col-md-8 col-sm-6 col-12">
            <h1 className="display-1 text-uppercase">Where are you going?</h1>
          </div>


        </Header>
        {/* <form> */}
          
        {/* </form> */}


      </Fragment>
      );
    }
  }
}

export default Login;
