import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Section extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      let { sectionName } = this.props;
      return (
        <Fragment>
          <section
            id={sectionName.toLowerCase()}
            className={sectionName.toLowerCase() + '-section bg-light'}
            style={{
              // backgroundImage: "linear-gradient(rgb(1,1,0.4),rgb(1,1,0.4)), url("+backgroundImage+")",
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="container" style={this.props.containerStyle}>{this.props.children}</div>
          </section>
        </Fragment>
      );
    }
  }
}

Section.propTypes = {
  sectionName: PropTypes.string,
  backgroundImage: PropTypes.string,
};
Section.defaultProps = {
  backgroundImage: 'https://memeandmeaning.com/img/boat-bw-compressed.jpg',
};

export default Section;
