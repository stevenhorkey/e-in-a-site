import React, { Component, Fragment } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import API from '../../utils/API';
import eina from '../../assets/img/beach.jpg';
import ComponentIndex from '../../components/components';
import logo from '../../assets/img/mmlogo.png';
import steven from '../../assets/img/steve.jpg';
class Home extends Component {
  state = {
    loading: false,
    posts: [],
  };

  componentDidMount = () => {
    API.getPosts(9)
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
          <ComponentIndex.Header headImage={eina}>
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
              <p className="text-white-50 mx-auto mt-4 mb-5">
                {Parser(page.acf.header1)}
              </p>
              <h1 className="text-uppercase display-3" data-aos="zoom-out-down">{Parser(page.acf.header2)}</h1>
            </div>
            {/* <div className="col-md-6">

            </div> */}
          </ComponentIndex.Header>
          
          <section className="bg-black text-white" style={{
            border: "2px solid white",
            borderWidth: "2px 0"
          }}>
            <div className="container text-center ">
              <div className="row d-flex align-items-center">
                <div className='col-md-6 py-5'>
                  <div className="container">
                    <h2 className="text-uppercase">Welcome</h2>
                    <div className="text-left ">
                      <div className="row py-4 d-flex align-items-center">
                        <div className="col-md-4">
                          <img className="my-3" id="headshot" src={steven}/>
                        </div>
                        <div className="col-md-8">
                        <div>My name is Steven Horkey and Everything In All is an endeavor of mine where I seek to learn, understand, and embody a life well lived. It's also a music project.
</div>
                          {/* <div>
                            <span>MEME : </span>
                            <span>An understanding in reference to the evolution of ideas across culture and time.</span>
                          </div>
                          <br/>
                          <div>
                            <span>MEANING : </span>
                            <span>the essence of what is attempting to be conveyed; a motivating reason to carry the weight of life's suffering.</span>
                          </div> */}
                      </div>
                        
                      </div>
                      <div className="row">
                        <div className="col-12 text-justify">
                          {/* <div>My name is Steven Horkey and Everything In All is an endeavor of mine where I seek to learn, understand, and embody a life well lived. It's also a music project.</div>
                          <br/> */}
                          <div>I likely don't know anything that you don't already know yourself, but I do have an earnest desire to be a decent person and be part of the general solution instead of the general problem. </div>
                          <br/>
                          <div>I don't want your money. I don't want your attention. I don't want anything from you except a commitment that you will think for yourself, take ownership for the quality of your life, and remain open. If this site and music helps you do that, then consider it a resource. If not, then please go find something that does.
                          </div>
                          <br/>                          
                          <div>
                          This is about approaching our time here in a more sincere way, one that is grounded in humility and an honest connection amidst our shared human condition.
                          </div>
                          <br/>
                          <div>I have yet to find anything more valuable than the process of cultivating a greater connection to one's own self and this life we are all a part of. What about you?</div>
                          {/* <br/> */}
                          <br/>

                          <div className="text-center">In the most loving and transparent sense, <span className="font-italic">live better.</span></div>
                          </div>
                          {/* <a href="/about" className="mx-auto text-uppercase btn btn-primary py-2 my-3 scale-item d-flex align-items-center" >Learn More</a> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 py-5">
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
                <h2 className="mr-auto text-uppercase font-weight-bold pt-1 mb-0">Recent Posts</h2>
                <a href="/posts" className="ml-auto text-uppercase btn btn-primary py-2 scale-item d-flex align-items-center" >View All Posts</a>
              </div>
              <div className="row mt-3">
                {posts.map((post,key) => {
                  return(
                    <Fragment key={key}>
                      <ComponentIndex.Card item={post}/>
                    </Fragment>
                  )
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
