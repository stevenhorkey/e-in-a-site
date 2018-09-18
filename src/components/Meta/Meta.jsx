import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

class Meta extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      let page = this.props.page;
      return (
        <Fragment>
          <section id={this.props.id} className="about-section text-center">
            <div className="container">
              {page.acf.metaTitle === '' ? null : (
                <div className="row">
                  <div
                    className="col-lg-10 mx-auto text-white"
                    data-aos="fade-up"
                  >
                    <h2 className="text-white mb-4 text-uppercase">
                      {Parser(page.acf.metaTitle || '')}
                    </h2>
                    {this.props.children}
                  </div>
                </div>
              )}
              <img
                src={page.acf.metaImage || ''}
                className="img-fluid"
                alt="Meme and Meaning"
                style={{
                  width: page.acf.metaImageWidth || '60vw',
                }}
              />
            </div>
          </section>
        </Fragment>
      );
    }
  }
}

Meta.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
};

export default Meta;
