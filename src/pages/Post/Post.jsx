import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import Parser from 'html-react-parser';
import LoadingScreen from 'react-loading-screen';
import $ from 'jquery';
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

        $(".form-post").children().after("<textarea class='post-form-ta'/>");
        $(".form-post").after("<p class='mx-auto text-center p-2 my-3'>I do not save or see any of these results or answers. If you don't send or download them now, you loose them forever.</p>");
        $(".form-post").after("<button class='mx-auto text-uppercase btn btn-primary p-2 my-3 scale-item d-flex align-items-center'>Email me my results</button>")
        $(".form-post").after("<button class='mx-auto text-uppercase btn btn-primary p-2 my-3 scale-item d-flex align-items-center'>Download My Results</button>")


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
      console.log(post);
      let date = post.date.substring(0, 10);
      let modified = post.modified.substring(0, 10);
      return (
        <Fragment>
          <SEOHelmet
            item={post}
          />

          <ComponentIndex.Header headImage={post.acf.featuredImage.url}>
            <div className="row w-100 mx-auto">
              <h1 className="mx-auto text-uppercase" data-aos="zoom-out-down">
                {Parser(post.title.rendered)}
              </h1>
            </div>
            <br/>
            {!post.acf.pinecastId ? null : (
              <div className="pinecast-player">
                {Parser(
                  '<iframe src="https://pinecast.com/player/' +
                    post.acf.pinecastId +
                    '?theme=minimal" seamless height="60" style="border:0" class="pinecast-embed" frameborder="0" width="100%"></iframe>'
                )}
              </div>
            )}
          </ComponentIndex.Header>
          {post.content.rendered === "" ? null : 
          <article id={post.slug} className="post-section bg-light py-3">
            <div className="container text-center mb-5">
              <div className="row">
                <small className="font-italic col-sm-6 text-left">
                  {Parser(post.title.rendered)}
                </small>
                <small className="font-italic col-sm-6 text-right">
                  Published on {date}{' '}
                  {date !== modified ? 'and updated on ' + modified : null}
                </small>
                {/* <small className="font-italic col-sm-3 text-right">{Parser(post.acf.author)}</small> */}
                
              </div>
              <hr />
              <div className="text-justify written-copy">
                
                {Parser(post.content.rendered)}
              </div>
              <img
                className="mx-auto mb-3"
                alt="signature"
                src={signature}
                width="220px"
              />
              <hr/>
              <div className="row">
                  <small className="font-italic col-sm-6 text-left">
                    {Parser(post.title.rendered)}
                  </small>
                  <small className="font-italic col-sm-6 text-right">
                    Image by {post.acf.imageAuthor}
                  </small>
              </div>
            </div>
          </article>}
        </Fragment>
      );
    }
  }
}

export default Post;
