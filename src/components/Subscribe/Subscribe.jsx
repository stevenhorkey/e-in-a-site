import React, { Component, Fragment } from 'react';

class Subscribe extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <section
            id="subscribe"
            className="subscribe-section"
            style={{
              backgroundImage:
                'linear-gradient(rgb(0,0,0,.5),rgb(0,0,0,.5)), url(' +
                this.props.backgroundImage +
                ')',
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-10 col-lg-8 mx-auto text-center">
                  {/* <i className="far fa-paper-plane fa-2x mb-2 text-white"></i> */}
                  <h2 className="text-white mb-5" data-aos="zoom-in">
                    Subscribe to receive updates!
                  </h2>

                  <form className="form-inline d-flex">
                    <input
                      type="email"
                      className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                      id="inputEmail"
                      placeholder="Enter email address..."
                    />
                    <button type="submit" className="btn btn-primary mx-auto">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      );
    }
  }
}

export default Subscribe;
