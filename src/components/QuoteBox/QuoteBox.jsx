import React, { Component, Fragment } from 'react';
import API from '../../utils/API';

class QuoteBox extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {
    API.getQuotes()
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.loading) {
      return (
        <Fragment>
          <div className="bg-light pb-4">
            <div className="text-center font-italic text-muted container">
              <hr className="mt-0" />
              <p>
              I find it wholesome to be alone the greater part of the time. To be in company, even with the best, is soon wearisome and dissipating. I love to be alone. I never found the companion that was so companionable as solitude.
              </p>
              <p>~ Henry David Thoreau</p>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default QuoteBox;
