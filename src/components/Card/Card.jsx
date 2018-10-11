import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import moment from 'moment'


class Card extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      let item = this.props.item;
      console.log(item.acf.postType, item.title.rendered)
      let wpDate = item.date
      let date = moment(wpDate).format("MMMM Do YYYY");
      return (
        <Fragment>
          <div className="col-md-4 my-3">
              <div className="card scale-item">
                <a className="item-scale" href={"/content/"+item.slug}>

                  <img className="card-img-top" src={item.acf.featuredImage.sizes.large} alt="Card image cap" style={{
                    width: "100%",
                    maxHeight: 180,
                    objectFit: "cover"
                  }}/>
                  <div className="card-body text-left">
                    <h5 className="card-title mb-1 text-left font-bold">{Parser(item.title.rendered)}</h5>
                    <div className="row w-100 mx-auto text-muted">
                      <small className="mr-auto">{date}</small>
                      <small className="ml-auto text-capitalize">{Parser(item.acf.postType.join(" ") || "Post")}</small>
                    </div>
                    {/* {Parser(item.date)} */}
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                  </div>
                </a>
              </div>
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
