import React, { Component, Fragment } from 'react';
class Contact extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <section id="contact" className="contact-section bg-black">
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 mb-3 mb-md-0">
                  <div className=" py-4 h-100">
                    <div className="card-body text-center">
                      <i className="fas fa-envelope text-primary mb-2" />
                      <h4 className="text-uppercase m-0">Email</h4>
                      <hr className="my-4" />
                      <div className="small text-black-50 container">
                        <form className="row">
                          <input
                            type="text"
                            placeholder="First and Last Name"
                            className="col-sm-6 my-2 form-control flex-fill mr-0"
                          />
                          <input
                            type="text"
                            placeholder="youremail@example.com"
                            className="col-sm-6 my-2 form-control flex-fill mr-0"
                          />
                          <textarea
                            rows="10"
                            placeholder="Your message here..."
                            className="col-12 my-2 form-control flex-fill mr-0"
                          />
                          <input
                            type="submit"
                            className="btn btn-primary w-100"
                            style={{
                              position: 'relative',
                              bottom: 60,
                              borderTopRightRadius: 0,
                              borderTopLeftRadius: 0,
                              border: '1px solid #ced4da',
                            }}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      );
    }
  }
}

export default Contact;
