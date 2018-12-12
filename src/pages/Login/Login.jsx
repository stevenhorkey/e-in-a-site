import React, { Component, Fragment } from 'react';
import API from '../../utils/API';

class Login extends Component {
  state = {
    loading: false,
    email: null,
    password: null
  };

  componentDidMount = () => {};

  attemptLogin = () => {
    console.log('login')
    API.login('admin@memeandmeaning.com','Yekrohnevets@1997')
      .then(res => {
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
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* <form> */}
          <input type="text"/>
          <input type="text"/>
          <button onClick={this.attemptLogin}>Login</button>
        {/* </form> */}


      </Fragment>
      );
    }
  }
}

export default Login;
