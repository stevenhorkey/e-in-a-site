import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import API from '../../utils/API';
import signature from '../../assets/img/signiture.png';

import ComponentIndex from '../../components/components';
import logo from '../../assets/img/mmlogo.png';
class About extends Component {
  state = {
    loading: false,
    posts: [],
  };

  componentDidMount = () => {
    API.getPosts(12)
      .then(res => {
        this.setState({
          posts: res.data
        });
        this.props.handleLoad(false);
        console.log(this.state.posts);
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
            <div className="mx-auto text-center">
              
              <p className="text-white-50 mx-auto mt-4 mb-5">
                {Parser(page.acf.header1)}
              </p>
              <h1 className="text-uppercase display-1" data-aos="zoom-out-down">{Parser(page.acf.header2)}</h1>
            </div>
            {/* <div className="col-md-6">

            </div> */}
          </ComponentIndex.Header>
          <section id={page.slug} className="post-section bg-light py-3">
            <div className="container text-center mb-5">
              <div className="row">
                <small className="font-italic col-sm-6 text-left">
                  {Parser(page.title.rendered)}
                </small>
                {/* <small className="font-italic col-sm-6 text-right">
                  Published on {date}{' '}
                  {date !== modified ? 'and updated on ' + modified : null}
                </small> */}
                {/* <small className="font-italic col-sm-3 text-right">{Parser(post.acf.author)}</small> */}
                
              </div>
              
              <hr />
              <div className="written-copy text-justify">
                {Parser(page.content.rendered)}
              </div>
              <img
                className="mx-auto mb-3"
                alt="signature"
                src={signature}
                width="220px"
              />
              {/* <hr/>
              <div className="row">
                  <small className="font-italic col-sm-6 text-left">
                    {Parser(page.title.rendered)}
                  </small>
                  <small className="font-italic col-sm-6 text-right">
                    Image by {page.acf.imageAuthor}
                  </small>
              </div> */}
            </div>
          </section>
        </Fragment>
      );
    }
  }
}

About.propTypes = {
  home: PropTypes.object,
};

export default About;
