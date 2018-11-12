import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
class Header extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <header
            className="masthead"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.6)), url('" +
                this.props.headImage +
                "')",
              minHeight: '100vh',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="container h-100">
              <div className="d-flex h-100 align-items-center text-center">
                {this.props.children}
              </div>
            </div>
          </header>
        </Fragment>
      );
    }
  }
}

Header.propTypes = {
  headImage: PropTypes.string,
};

export default Header;
