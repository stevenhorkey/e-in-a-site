import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';

class RightImageRow extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      let post = this.props.post;
      let image = this.props.post.acf.featuredImage;
      return (
        <Fragment>
          <a href={"/blog/"+post.slug}>
            <div
              className="row justify-content-center no-gutters scale-item"
              // data-aos="flip-up"
            >
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  srcSet={
                    image.sizes.thumbnail + " 150w," + 
                    image.sizes.medium + " 300w," + 
                    image.sizes.large + " 525w" 
                  }
                  alt={image.alt}
                  style={{
                    objectFit: 'cover',
                    height: '33rem',
                  }}
                />
              </div>
              <div className="col-lg-6 order-lg-first">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-right">
                      <h4 className="text-white">
                        {Parser(post.title.rendered)}
                      </h4>
                      <div className="mb-0 text-white-50">
                        {Parser(post.yoast_meta.yoast_wpseo_metadesc)}
                      </div>
                      <hr className="d-none d-lg-block mb-0 mr-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Fragment>
      );
    }
  }
}

export default RightImageRow;
