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
          {this.props.pages.map((page, key) => {
            // Mapping routes from wp to react router
            // console.log(page);
            let path = page.acf.slug;
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

          <Route
            path="/compose"
            component={() => (window.location = 'http://api.memeandmeaning.com/wp-admin/')}
          />

          {/* 404 Page */}
          <Route component={PageIndex.NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
