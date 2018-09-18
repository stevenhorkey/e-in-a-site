import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

class Card extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <div
            key={this.props.index}
            className="col-md-4 col-sm-6 col-12 scale-item"
            data-aos="flip-up"
            style={{
              backgroundImage:
                "linear-gradient(rgb(0,0,0,0.4),rgb(0,0,0,0.4)), url('" +
                this.props.backgroundImage +
                "')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '100%',
              paddingBottom: '7%',
              paddingTop: '7%',
            }}
          >
            <div className="container h-100 d-flex align-items-center">
              <div className="row mx-auto">
                <a href={Parser(this.props.link)}>
                  <h3 className="text-uppercase text-white">
                    {Parser(this.props.title)}
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
