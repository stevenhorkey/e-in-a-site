import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import Parser from 'html-react-parser';
import LoadingScreen from 'react-loading-screen';

import loadingImg from '../../assets/img/loading.gif';
import ComponentIndex from '../../components/components';
import signature from '../../assets/img/signiture.png';
import SEOHelmet from '../../components/SEOHelmet/SEOHelmet';
class Post extends Component {
  state = {
    loading: true,
    post: {},
  };

  componentDidMount = () => {
    API.getPost(this.props.match.params.id)
      .then(res => {
        let post = res.data[0];
        this.setState({
          post,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });

    const script = document.createElement("script");

    script.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b91dee06e5d3db1';
    script.async = true;

    document.body.appendChild(script);
  };

  render() {
    if (this.state.loading)
      return (
        <LoadingScreen loading={true} bgColor="#000000" logoSrc={loadingImg}>
          <div />
        </LoadingScreen>
      );
    else {
      let post = this.state.post;
      let date = post.date.substring(0, 10);
      let modified = post.modified.substring(0, 10);
      return (
        <Fragment>
          <SEOHelmet
            item={post}
          />

          <ComponentIndex.Header headImage={post.acf.featuredImage.url}>
            <h1 className="mx-auto text-uppercase" data-aos="zoom-out-down">
              {Parser(post.title.rendered)}
            </h1>
          </ComponentIndex.Header>
          <article id={post.slug} className="post-section bg-light py-3">
            <div className="container text-center mb-5">
              <div className="row">
                <small className="font-italic col-sm-3 text-left">
                  {Parser(post.title.rendered)}
                </small>
                <small className="font-italic col-sm-6 text-center">
                  Published on {date}{' '}
                  {date !== modified ? 'and updated on ' + modified : null}
                </small>
                {/* <small className="font-italic col-sm-3 text-right">{Parser(post.acf.author)}</small> */}
                <small className="font-italic col-sm-3 text-right">
                  Image by {post.acf.imageAuthor}
                </small>
              </div>
              <hr />
              <div className="text-justify written-copy">
                {!post.acf.pinecastId ? null : (
                  <div className="mb-5">
                    {Parser(
                      '<iframe src="https://pinecast.com/player/' +
                        post.acf.pinecastId +
                        '?theme=thick" seamless height="200" style="border:0" class="pinecast-embed" frameborder="0" width="100%"></iframe>'
                    )}
                  </div>
                )}
                {Parser(post.content.rendered)}
              </div>
              <img
                className="mx-auto mb-3"
                alt="signature"
                src={signature}
                width="220px"
              />
            </div>
          </article>
        </Fragment>
      );
    }
  }
}

export default Post;
