import React, { Component, Fragment } from 'react';

class Footer extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <footer className="bg-black small text-center text-white-50">
            <div className="container">
              Copyright &copy; {this.props.site.name} 2017 -{' '}
              {new Date().getFullYear()}
            </div>
          </footer>
        </Fragment>
      );
    }
  }
}

export default Footer;
