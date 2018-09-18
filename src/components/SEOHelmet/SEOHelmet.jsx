import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class SEOHelmet extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {};

  render() {
    if (!this.state.loading) {
      let item = this.props.item;
      return (
          <Helmet>
            {/* React helmet for meta SEO */}
            <title>{item.yoast_meta.yoast_wpseo_title}</title>
            <meta name="description" content={item.yoast_meta.yoast_wpseo_metadesc}></meta>
            <meta name="robots" content="index, follow" />

            <meta name="twitter:card" value={item.yoast_meta.yoast_wpseo_metadesc}></meta>

            <meta property="og:site_name" content="Meme and Meaning" />
            <meta property="og:title" content={item.yoast_meta.yoast_wpseo_title} />
            <meta property="og:type" content={"article"} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:image" content={item.acf.featuredImage} />
            <meta property="og:description" content={item.yoast_meta.yoast_wpseo_metadesc} />
        </Helmet>
      )
    }
  }
}

export default SEOHelmet;
