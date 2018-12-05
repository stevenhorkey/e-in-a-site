import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

class Navbar extends Component {

  
  state = {
    loading: false,
  };

  componentDidMount = () => {
    // Add navbar jquery actions script after mount
    const script = document.createElement("script");

    script.src = "/js/grayscale.min.js";
    script.async = true;

    document.body.appendChild(script);
  };

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <nav
            className="navbar navbar-expand-lg navbar-light fixed-top"
            id="mainNav"
          >
            <div className="nav-container container">
              <a className="navbar-brand js-scroll-trigger scale-item" href="/">
                {Parser(this.props.site.name)}
              </a>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                MENU
                <i className="fas fa-bars ml-1" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  {/* <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="/about">
                      About
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                      <a className="nav-link js-scroll-trigger" href="/music">Music</a>
                  </li> */}
                  {/* <li className="nav-item">
                      <a className="nav-link js-scroll-trigger" href="/music">Music</a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="/start">
                      Start Here
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="/posts">
                      Blog & Podcast
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/everythinginall/">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="/#contact">
                      Contact
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </Fragment>
      );
    }
  }
}

Navbar.propTypes = {
  site: PropTypes.object,
};

export default Navbar;
