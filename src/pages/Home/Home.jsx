import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
// import YouTube from 'react-youtube';
import API from '../../utils/API';
// import eina from '../../assets/img/beach.jpg';
import ComponentIndex from '../../components/components';
// import logo from '../../assets/img/mmlogo.png';
import steven from '../../assets/img/benson-steven.jpg';

class Home extends Component {
  state = {
    loading: false,
    posts: [],
  };

  componentDidMount = () => {
    API.getPosts(20)
      .then(res => {
        this.setState({
          posts: res.data
        });
        this.props.handleLoad(false);
        console.log(this.state.posts);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.loading) {
      let page = this.props.page;
      let posts = this.state.posts;
      // console.log(posts);
      return (
        <Fragment>
          {/* <ComponentIndex.Header headImage={page.acf.featuredImage.url}> */}
          {/* <div className="home-background"> */}
            <ComponentIndex.Header headImage={"https://source.unsplash.com/2000x1400/?nature"}>
              <div className="mx-auto text-center">
                {/* <img
                  src={logo}
                  className=""
                  data-aos="zoom-out-down"
                  alt="mm-logo"
                /> */}
                <h1 className="text-uppercase display-1">Everything In All</h1>
                {/* <p className="text-white-50 mx-auto mt-4 mb-5 display-1">
                  {/* MUSIC - GROWTH - BEAUTY - TRUTH - LOVE - HUMILITY */}
                {/* </p> */}
                <h4 className="text-white-50 mx-auto my-4 text-uppercase font-weight-light">
                  {Parser(page.acf.header1)}
                </h4>
                <p className="text-white-50 mx-auto mt-4 mb-5" data-aos="zoom-out-down">{Parser(page.acf.header2)}</p>
              </div>
            
            </ComponentIndex.Header>
            
            {/* <section className="vh-100 d-flex align-items-center justify-content-center">
              <h1>Featured Music</h1>
              <YouTube
                videoId="uFeLFxW1vuM"
                // opts={}
                onReady={this._onReady}
              />
            </section> */}

            {/* <ComponentIndex.Header opacity="0.6">
              <div className="mx-auto text-center">
                <h1 className="text-uppercase display-1">Featured Music</h1>
                <YouTube
                videoId="uFeLFxW1vuM"
                // opts={}
                onReady={this._onReady}
              />
              </div>
            </ComponentIndex.Header> */}
            

          {/* </div> */}
          
          <section className="bg-black text-white" style={{
            border: "2px solid white",
            borderWidth: "2px 0"
          }}>
            <div className="container text-center ">
              <div className="row d-flex align-items-center">
                <div className='col-md-6 order-md-1 order-2 py-5'>
                  <div className="container">
                    <h2 className="text-uppercase">Welcome</h2>
                      {/* <div className="row py-4 d-flex align-items-center"> */}
                        {/* <div className="col-md-4">
                          <img className="my-3" id="headshot" src={steven}/>
                        </div> */}
                        {/* <div className="col-md-12">
                        <div>My name is Steven Horkey and Everything In All is an endeavor of mine where I seek to learn, understand, and embody a life well lived. It's also a music project.
                        </div> */}
                          {/* <div>
                            <span>MEME : </span>
                            <span>An understanding in reference to the evolution of ideas across culture and time.</span>
                          </div>
                          <br/>
                          <div>
                            <span>MEANING : </span>
                            <span>the essence of what is attempting to be conveyed; a motivating reason to carry the weight of life's suffering.</span>
                          </div> */}
                      {/* </div>
                        
                      </div> */}
                      <div className="row py-3">
                        <div className="col-12 text-justify">
                          {/* <div>My name is Steven Horkey and Everything In All is an endeavor of mine where I seek to learn, understand, and embody a life well lived. It's also a music project.</div>
                          <br/> */}
                          <div>My name is Steven Horkey and Everything In All is an endeavor of mine where I seek to learn, understand, and embody a life well lived. It's also a music project, and I personally see neither as mutually exclusive.
                          </div>
                          <br/>
                          <div>I likely don't know anything that you don't already know yourself, but I do have an earnest desire to be a decent person and be part of the general solution instead of the general problem. </div>
                          <br/>
                          <div>More than anything, this site is for me. It's gradually becoming the resource I want to see and use within the space of personal development. I don't have anything to sell, but I guess my broader request is that you make a commitment to think for yourself, take ownership for the quality of your life, and remain open. If this site and music helps you do that, then consider it a resource. If not, then please go find something that does (and let me know about it because I'm always interested).
                          </div>
                          <br/>                          
                          <div>
                          This is about approaching our time here in a more sincere way, one that is grounded in humility and an honest connection amidst our shared human condition.
                          </div>
                          <br/>
                          <div>I have yet to find anything more valuable than the process of cultivating a greater connection to one's own self and this life we are all a part of.</div>
                          {/* <br/> */}
                          <br/>

                          <div className="text-center">In the most loving and transparent sense, <span className="font-italic">live better.</span></div>
                          </div>
                          {/* <a href="/about" className="mx-auto text-uppercase btn btn-primary py-2 my-3 scale-item d-flex align-items-center" >Learn More</a> */}
                        
                      </div>
                  </div>
                </div>
                <div className="col-md-6 order-1 order-md-12 py-5">
                  <ComponentIndex.Subscribe/>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="py-4 bg-gray">
            <div className="container text-center">
              <div className='row'>
                <h3 className="mx-auto text-uppercase">What Do You Want To Work On?</h3>
              </div>
              <div className="row">
                <ComponentIndex.Card backgroundImage={page.acf.featuredImage} title="test" link="test"/>
                <ComponentIndex.Card backgroundImage={page.acf.featuredImage} title="test" link="test"/>
                <ComponentIndex.Card backgroundImage={page.acf.featuredImage} title="test" link="test"/>
                <ComponentIndex.Card backgroundImage={page.acf.featuredImage} title="test" link="test"/>
                <ComponentIndex.Card backgroundImage={page.acf.featuredImage} title="test" link="test"/>
                <ComponentIndex.Card backgroundImage={page.acf.featuredImage} title="test" link="test"/>
                
              </div>
            </div>
          </section> */}
          <section className="bg-white py-5">
            <div className="container text-center">
              <div className='row w-100 m-auto'>
                <h2 id='recent-posts' className="mr-auto text-uppercase font-weight-bold mb-0">Recent Posts</h2>
                <a href="/posts" id='view-all-posts' className="ml-auto text-uppercase btn btn-primary py-2 scale-item d-flex align-items-center" >View All Posts</a>
              </div>
              <div className="row mt-3">
                {posts.map((post,key) => {
                  if(!post.acf.hidden){
                    return(
                      <Fragment key={key}>
                        <ComponentIndex.Card item={post}/>
                      </Fragment>
                    )
                  } else return null;
                })}
              </div>
            </div>
          </section>
          {/* <section className="bg-black py-4">
            <div className="container text-center">
              <div className="row text-white">
                <div className="col-md-4 col-sm-12">
                  <h4 className="text-uppercase mx-auto">Downloads</h4>
                  <p></p>
                </div>
                <div className="col-md-4 col-sm-12">

                </div>
              </div>
            </div>
          </section>
          <section className="py-4 bg-gray">
            <div className="container text-center">
              <div className="row">
                
                <div className="col-md-4 col-sm-12">

                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                  <h4 className="text-uppercase mx-auto">Downloads</h4>
                  <p></p>
                </div>
            </div>
          </section> */}
          

                
        </Fragment>
      );
    }
  }
}

Home.propTypes = {
  home: PropTypes.object,
};

export default Home;
