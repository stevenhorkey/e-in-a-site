import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import API from '../../utils/API';

import ComponentIndex from '../../components/components';
import logo from '../../assets/img/mmlogo.png';
class Home extends Component {
  state = {
    loading: false,
    posts: [],
  };

  componentDidMount = () => {
    API.getPosts(5)
      .then(res => {
        this.setState({
          posts: res.data,
        });
        this.props.handleLoad(false);
        // console.log(this.state.posts);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.loading) {
      let page = this.props.page;
      return (
        <Fragment>
          <ComponentIndex.Header headImage={page.acf.featuredImage.url}>
            <img
              src={logo}
              className="mx-auto"
              data-aos="zoom-out-down"
              alt="mm-logo"
            />
            <p className="text-white-50 mx-auto mt-4 mb-5">
              On life; a documentation, appraisal, and approach
            </p>
          </ComponentIndex.Header>
          <ComponentIndex.Meta page={page}>
            {Parser(page.content.rendered)}
          </ComponentIndex.Meta>
          <ComponentIndex.Section sectionName={'Projects'}>
            <div className="text-center">
              {/* <h1 className="mb-5">Podcast</h1>
              <ComponentIndex.FeaturedImage
                imgPosition="left"
                image={page.acf.image1}
                href="/podcast"
                header={page.acf.header1}
                copy={page.acf.copy1}
                link={page.acf.link1}
              /> */}
              <h1 className="mb-5">Blog</h1>
              <div>
                {this.state.posts.map((post, key) => {
                  if (key % 2 === 0) {
                    return (
                      <Fragment key={key}>
                        <ComponentIndex.RightImageRow post={post} />
                      </Fragment>
                    );
                  } else {
                    return (
                      <Fragment key={key}>
                        <ComponentIndex.LeftImageRow post={post} />
                      </Fragment>
                    );
                  }
                })}
                {/* <ComponentIndex.LeftImageRow/>
                                    <ComponentIndex.RightImageRow/>
                                    <ComponentIndex.LeftImageRow/>
                                    <ComponentIndex.RightImageRow/> */}
                <a href="/blog">
                  <button className="btn btn-primary mt-5">
                    View All Posts
                  </button>
                </a>
              </div>
              {/* <h1 className="mb-5 mt-5">Music</h1>
              <ComponentIndex.FeaturedImage
                imgPosition="right"
                image={page.acf.image2}
                href="/music"
                header={page.acf.header2}
                copy={page.acf.copy2}
                link={page.acf.link2}
              /> */}
            </div>
          </ComponentIndex.Section>
          {/* <ComponentIndex.Subscribe backgroundImage={page.acf.image3} /> */}
          {/* <ComponentIndex.Contact /> */}
        </Fragment>
      );
    }
  }
}

Home.propTypes = {
  home: PropTypes.object,
};

export default Home;
