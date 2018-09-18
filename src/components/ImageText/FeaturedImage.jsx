import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

class FeaturedImage extends Component {
  state = {
    loading: false,
  };

  title = 'Shoreline';

  copy =
    'Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!';

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      if (this.props.imgPosition === 'right') {
        return (
          <Fragment>
            <div
              className="row align-items-center no-gutters mb-4 mb-lg-5 mt-4 mt-lg-5"
              data-aos="fade-left"
            >
              <div className="col-xl-4 col-lg-5">
                <div className="featured-text-right text-center text-lg-left">
                  <h4>{Parser(this.props.header) || this.title}</h4>
                  <p className="text-black-50 mb-0">
                    {Parser(this.props.copy) || this.copy}
                  </p>
                </div>
              </div>
              <a href={this.props.link} className="col-xl-8 col-lg-7">
                <img
                  className="img-fluid mb-3 mb-lg-0 scale-item"
                  src={this.props.image}
                  alt=""
                />
              </a>
            </div>
          </Fragment>
        );
      } else {
        return (
          <div
            className="row align-items-center no-gutters mb-4 mb-lg-5 mt-4 mt-lg-5"
            data-aos="fade-right"
          >
            <a href={this.props.link} className="col-xl-8 col-lg-7">
              <img
                className="img-fluid mb-3 mb-lg-0 scale-item"
                src={this.props.image}
                alt=""
              />
            </a>
            <div className="col-xl-4 col-lg-5">
              <div className="featured-text-left text-center text-lg-left">
                <h4>{Parser(this.props.header) || this.title}</h4>
                <p className="text-black-50 mb-0">
                  {Parser(this.props.copy) || this.copy}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

FeaturedImage.propTypes = {
  copy: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
};

export default FeaturedImage;
