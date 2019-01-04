import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import moment from 'moment'


class Card extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  formatTitle = (title) => {
    console.log(title)
    title = title.split(" &#8211; ");
    title.map((item, index, arr) => {
      arr[index] = item.replace(/&#038;/g, '&');
    });
    console.log(title);
    return (
      <div className="mx-auto text-uppercase text-center card-font">
        <h3>
          {title[0]}
        </h3>
        <h5>{title[1]}</h5>
      </div>
    )
  }

  render() {
    if (!this.state.loading) {
      let item = this.props.item;
      console.log(item.acf.postType, item.title.rendered)
      let wpDate = item.date
      let date = moment(wpDate).format("MMMM Do YYYY");
      return (
        <Fragment>
          {/* <div className="col-md-4 my-3">
              <div className="card scale-item" data-aos="zoom-out-down">
                <a className="item-scale" href={"/"+item.slug}>

                  <img className="card-img-top" src={item.acf.featuredImage.sizes.large} alt={Parser(item.title.rendered)} style={{
                    width: "100%",
                    maxHeight: 180,
                    objectFit: "cover"
                  }}/>
                  <div className="card-body text-left"> */}
                    {/* <h5 className="card-title mb-1 text-left font-bold">{Parser(item.title.rendered)}</h5> */}
                    {/* {this.formatTitle(item.title.rendered)}
                    <div className="row w-100 mx-auto text-muted">
                      <small className="mr-auto">{date}</small>
                      <small className="ml-auto text-capitalize">{Parser(item.acf.postType.join(", ") || "Post")}</small>
                    </div> */}
                    {/* {Parser(item.date)} */}
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                  {/* </div>
                </a>
              </div>
          </div> */}
          <div className="card-col col-md-6 scale-item">
          <a className="item-scale" href={"/"+item.slug}>
            <div className="post-card d-flex align-items-center justify-content-center"  style={{
              background: `linear-gradient(#0000008e, #0000008e), url('${item.acf.featuredImage.sizes.large}')`
            }}>
              {this.formatTitle(item.title.rendered)}
            </div>
            </a>
          </div>
        </Fragment>
      );
    }
  }
}

Card.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
