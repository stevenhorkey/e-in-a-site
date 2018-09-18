import React, { Component, Fragment } from 'react';

import ComponentIndex from '../../components/components';
class Template extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <ComponentIndex.Header
            headImage={
              'https://images.unsplash.com/photo-1517258831948-25528eee3450?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2f563e372c46d9629617dd76a0888084&auto=format&fit=crop&w=1567&q=80'
            }
          >
            <div className="mx-auto text-center card p-4">
              <h1
                className="mx-auto my-0 text-uppercase text-black"
                id="not-found"
              >
                404
              </h1>

              <h2 className="text-black mx-auto mt-2 mb-5">
                Uh oh... the page you are trying to visit doesn't exist.
              </h2>
              <a href="/" className="btn btn-primary js-scroll-trigger">
                Go Back to Home Page
              </a>
            </div>
          </ComponentIndex.Header>
        </Fragment>
      );
    }
  }
}

export default Template;
