import React, { Component, Fragment } from 'react';

import ComponentIndex from '../../components/components';

class Downloads extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {
    console.log('pidcas');
    this.props.handleLoad(false);
  };

  render() {
    if (!this.state.loading) {
      let page = this.props.page;
      return (
        <Fragment>
          {/* <ComponentIndex.Header
                    headImage={page._embedded['wp:featuredmedia']['0'].source_url}
                    >
                        <h1 className="mx-auto text-uppercase">Downloads</h1>
                    </ComponentIndex.Header> */}
          <ComponentIndex.Meta />
          <ComponentIndex.Section sectionName={page.title.rendered}>
            <div className="text-center">
              <div>
                <ComponentIndex.LeftImageRow />
                <ComponentIndex.RightImageRow />
                <ComponentIndex.LeftImageRow />
                <ComponentIndex.RightImageRow />
              </div>
            </div>
          </ComponentIndex.Section>
        </Fragment>
      );
    }
  }
}

export default Downloads;
