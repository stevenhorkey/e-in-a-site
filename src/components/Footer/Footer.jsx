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
          <footer className="bg-black small text-white-50">
            <div className="container">
              <div className="row">
                <div className="mx-auto">

                </div>
              </div>
              <div className="row">
                <small className="mx-auto">Copyright &copy; {this.props.site.name} 2017 -{' '}
                {new Date().getFullYear()}</small>
              </div>  
            </div>
          </footer>
        </Fragment>
      );
    }
  }
}

export default Footer;
