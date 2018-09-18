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
            {/* Keep under 70 characters long, Include Target Keywords towards the beginning, include brand name at end if you have room */}
            <meta name="description" content={item.yoast_meta.yoast_wpseo_metadesc}></meta>
            {/* No more than 300 characters, no quotation marks, include keywords and make it concise and enticing for users, can use markup to include images, starts, etc. */}
            <meta property="og:site_name" content="Meme and Meaning" />
            <meta property="og:title" content={item.yoast_meta.yoast_wpseo_title} />
            {/* <meta property="og:type" content={} /> */}
            <meta property="og:url" content={window.location.href} />
            <meta property="og:image" content={item.acf.featuredImage} />
            {/* <meta property="og:description" content={} /> */}
            {/* keep under 70 characters, know that this info will be shared on social media so consider how things should be phrased. Fill out all feilds and check if you like  */}
        </Helmet>
      )
    }
  }
}

export default SEOHelmet;
