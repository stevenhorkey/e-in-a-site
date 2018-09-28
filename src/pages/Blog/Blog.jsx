import React, { Component, Fragment } from 'react';
import API from '../../utils/API';

import ComponentIndex from '../../components/components';

class Blog extends Component {
  state = {
    // loading: true,
    posts: [],
  };

  componentDidMount = () => {
    API.getPosts(50)
      .then(res => {
        this.setState({
          posts: res.data,
          // loading: false
        });
        this.props.handleLoad(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // if(!this.state.loading){
    let posts = this.state.posts;
    let page = this.props.page;
    console.log(page);
    return (
      <Fragment>
        {/* <ComponentIndex.Header
                    headImage={page._embedded['wp:featuredmedia']['0'].source_url}
                    >
                        <h1 className="mx-auto text-uppercase">{page.title.rendered}</h1>
                    </ComponentIndex.Header> */}
        <ComponentIndex.Meta page={page} />
        <ComponentIndex.Section sectionName={page.title.rendered}>
          <div className="text-center pt-4">
            <div className="row">
              {posts.map((post, key) => {
                return (
                  <Fragment key={key}>
                    <ComponentIndex.Card
                      item={post}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </ComponentIndex.Section>
      </Fragment>
    );
    // } else return (null);
  }
}

export default Blog;
