import React, { Component, Fragment } from 'react';
import LoadingScreen from 'react-loading-screen';
import Parser from 'html-react-parser';
import loadingImg from '../../assets/img/loading.gif';
import ComponentIndex from '../../components/components';
import SEOHelmet from '../SEOHelmet/SEOHelmet';
import getRandomPic from '../../utils/headerImages';

class PageWrapper extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    console.log('page wrapper mounted');
  };

  handleLoad = bool => {
    this.setState({
      loading: bool,
    });
  };

  render() {
    let ComponentRoute = this.props.ComponentRoute;
    let { page, ...props } = this.props;
    console.log(page);
    return (
      <Fragment>
        {/* React helmet for meta SEO */}
        <SEOHelmet
          item={page}
        />
        {/* <LoadingScreen
          loading={this.state.loading}
          bgColor="#000000"
          logoSrc={loadingImg}
        > */}
          <Fragment>
            {/* If home page, don't show default header structure */}
            {!page.acf.standardHeader ? null : (
              <ComponentIndex.Header headImage={getRandomPic()}>
                <h1 className="mx-auto text-uppercase" data-aos="zoom-out-down">
                  {Parser(page.title.rendered)}
                </h1>
              </ComponentIndex.Header>
            )}
            <ComponentRoute handleLoad={this.handleLoad} page={page} {...props} />
            {page.acf.quoteBox ? <ComponentIndex.QuoteBox /> : null}
          </Fragment>
        {/* </LoadingScreen> */}
      </Fragment>
    );
  }
}

export default PageWrapper;
