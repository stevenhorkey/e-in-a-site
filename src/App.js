import React, { Component, Fragment } from 'react';
import API from './utils/API';
import AOS from 'aos';
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/scss/Index.css';
import 'aos/dist/aos.css';
import Router from "./utils/Router";
import $ from 'jquery';

import ComponentIndex from './components/components';

class App extends Component {
  state = {
    loading: true,
    pages: [],
  };

  site = {
    name: 'Everything In All',
  };

  componentDidMount = () => {
    AOS.init({
      duration: 1600,
    });

    API.getPages()
      .then(res => {
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].acf.slug.includes(":")){
            res.data.push(res.data.splice(i,1)[0]);
          }
        }
        // console.log(res.data);

        this.setState({
          pages: res.data,
          loading: false,
        });
        $("")
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate = () => {
    $(document).ready(function(){
      $('#preloader').fadeOut('slow');
      $(window).on("load", function(){
        $('#asset-preloader').fadeOut('slow');
      });
    });
  }

  render() {
    if (!this.state.loading) {
      let pages = this.state.pages;
      return (
        <Fragment>
          <ComponentIndex.Navbar site={this.site} />

          <Router pages={pages}/>

          <ComponentIndex.Footer site={this.site} />
        </Fragment>
      );
    } else return null;
  }
}

export default App;
