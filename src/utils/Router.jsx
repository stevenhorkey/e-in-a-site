import React, { Component } from 'react';
// import { Route } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageIndex from '../pages/pages';
import ComponentIndex from '../components/components';

class Router extends Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          {/* 404 Page */}
          <Route path="/not-found" component={PageIndex.NotFound} />
          <Route
            path="/compose"
            component={() => (window.location = 'http://api.everythinginall.com/wp-admin/')}
          />
          {this.props.pages.map((page, key) => {
            // Mapping routes from wp to react router
            // console.log(page);
            let path = page.acf.slug;
            console.log(path);
            let ComponentRoute = PageIndex[page.title.rendered];
            if (!path.includes(':')) {
              // For Pages
              return (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={props => (
                    <ComponentIndex.PageWrapper
                      page={page}
                      ComponentRoute={ComponentRoute}
                      {...props}
                    />
                  )}
                />
              );
            } else {
              // For individual Posts
              console.log('why')
              return (
              <Route
                  exact
                  path={path}
                  key={key}
                  render={props => (
                  // <ComponentRoute page={page} {...props}/>
                  <PageIndex.Post {...props} />
                  )}
              />
              );
            }
          })}

          

          
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
