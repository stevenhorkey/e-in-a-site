import React, { Component, Fragment } from 'react';
import "./ShareButtons.css";

class ShareButtons extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
      <Fragment>
        <div class="icon-bar">
          <a href="#" class="facebook"><i class="fa fa-facebook"></i></a> 
          <a href="#" class="twitter"><i class="fa fa-twitter"></i></a> 
          <a href="#" class="google"><i class="fa fa-google"></i></a> 
          <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
          <a href="#" class="youtube"><i class="fa fa-youtube"></i></a> 
        </div>
      </Fragment>
      );
    }
  }
}

export default ShareButtons;
