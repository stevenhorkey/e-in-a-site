import React, { Component, Fragment } from 'react';

class Template extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return <Fragment />;
    }
  }
}

export default Template;
