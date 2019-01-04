import React, { Component, Fragment } from 'react';
import API from '../../utils/API';

import ComponentIndex from '../../components/components';

class Courses extends Component {
  state = {
    // loading: true,
    posts: [],
  };

  componentDidMount = () => {
    API.getPosts(50)
      .then(res => {
        // console.log(res);
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
    let posts = this.state.posts;
    let page = this.props.page;
    console.log(page);
    return (
      <Fragment>
        <ComponentIndex.Section sectionName={page.title.rendered}>
          <div className="text-center pt-4">
            <div className="row row-eq-height">
                {posts.map((post, key) => {
                  if(!post.acf.hidden){
                    return (
                      <Fragment key={key}>
                        <ComponentIndex.Card
                          item={post}
                        />
                      </Fragment>
                    );
                  } else return null;
                })}
            </div>
          </div>
        </ComponentIndex.Section>
      </Fragment>
    );
  }
}

export default Courses;
