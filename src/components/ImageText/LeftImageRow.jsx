import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';

class LeftImageRow extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    let post = this.props.post;
    let image = this.props.post.acf.featuredImage;
    if (!this.state.loading) {
      return (
        <Fragment>
          <a href={"/content/"+post.slug}>
            <div
              className="row justify-content-center no-gutters mb-5 mb-lg-0 scale-item"
              // data-aos="flip-up"
            >
              <div className="col-lg-6">
                <img
                  className="img-fluid"
                  src={image.url} 
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
              <div className="col-lg-6">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-left">
                      <h4 className="text-white">
                        {Parser(post.title.rendered)}
                      </h4>
                      <div className="mb-0 text-white-50">
                        {Parser(post.yoast_meta.yoast_wpseo_metadesc)}
                      </div>
                      <hr className="d-none d-lg-block mb-0 ml-0" />
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

export default LeftImageRow;
