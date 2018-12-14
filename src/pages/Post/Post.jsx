import React, { Component, Fragment } from 'react';
import API from '../../utils/API';
import Parser from 'html-react-parser';
import LoadingScreen from 'react-loading-screen';
import $ from 'jquery';
import loadingImg from '../../assets/img/loading.gif';
import ComponentIndex from '../../components/components';
import signature from '../../assets/img/signiture.png';
import SEOHelmet from '../../components/SEOHelmet/SEOHelmet';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Disqus from 'disqus-react';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Post extends Component {
  state = {
    loading: true,
    post: {},
    hasForm: false,
    date: '',
    uploadedJSON: null
  };

  getDate = () => {
    let date = new Date();
        date.setHours(0, 0, 0, 0);
        date = date.toDateString();
    // console.log(date);
    return date
  }

  componentDidMount = () => {
    API.getPost(this.props.match.params.id)
      .then(res => {
        let post = res.data[0];

        this.setState({
          post,
          loading: false,
          date: this.getDate()
        });

        if ($(".form-post").length){
          this.setState({
            hasForm: true
          })
          this.createInputs();
        }

      })
      .catch(err => {
        console.log(err);
        // <Route component={PageIndex.NotFound} />
        window.location.replace("/not-found");
      });

    

    // this.addEventListeners("li", "click");
    


    const addThis = document.createElement("script");
    const disqus = document.createElement("script");

    addThis.src = 'https://unpkg.com/ionicons@4.5.0/dist/ionicons.js';
    // addThis.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c10200b0c4c37d0';
    disqus.src = 'https://everything-in-all.disqus.com/embed.js';
    disqus.setAttribute('data-timestamp', +new Date());
    addThis.async = true;
    disqus.async = true;

    document.body.appendChild(addThis);
    // document.body.appendChild(disqus);
  };

  processJSON = () => {
    let result = this.state.uploadedJSON;
    console.log(result);

    if(result.postId === this.state.post.id){
      console.log('caneg html')
      $('.written-copy').html(result.content);
      $("input,select,textarea").each(function() {
        
        $(this).val($(this).attr('value')); 
        
      });
    } else {
      alert("sorry")
    }
  };

  uploadJSON = (event) => {
    console.log('uploadJSON')
    var reader = new FileReader();
    let thas = this;
    reader.onload = function(event) {
      var jsonObj = JSON.parse(event.target.result);
      thas.setState({
        uploadedJSON: jsonObj
      })
      thas.processJSON();
    }
    let file = event.target.files[0];
    reader.readAsText(file);
    // this.processJSON();
  };

  downloadJSON = () => {
    $("input,select,textarea").each(function() {
      if($(this).is("[type='checkbox']") || $(this).is("[type='checkbox']")) {
        $(this).attr("checked", $(this).attr("checked"));
      }
      else {
         $(this).attr("value", $(this).val()); 
      }
    });
    let obj = {postId: this.state.post.id, title: this.state.post.yoast_meta.yoast_wpseo_title.trim(), date: new Date(), content: $('.written-copy').html()};
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    let temp = $('<a/>');
    temp.attr('href','data:'+data);
    temp.attr('download','data.json');
    temp.appendTo('.written-copy').click(function(){
      $(this).remove();
    })[0].click()
  };

  createInputs = () => {
    $('.form-post li').each(function() {
      var text = $(this).text();
      $(this).html(text.replace(/__input__/g, '<input type="text"/>')); 
    });
  };

  duplicateInputs = () => {
    let inputs = $('.form-post').find('input');
    // console.log(inputs);
    inputs.each(function(){
      $(this).val(inputs[0].value)
    })
  }

  renderWorksheetForm = () => {
    $(".form-post").children().after("<i class='fas fa-trash remove-question'></i><textarea class='post-form-ta'/><i class='fas fa-plus add-question'></i>");
    $(".form-post").prepend("<i class='fas fa-plus add-question'></i>");


    // make questions editable
    $('.form-post li').each(function(){
      $(this).attr("contenteditable","true");
    });
    // add additional questions and textareas
    $('.written-copy').on('click','.add-question',function(){
      $(this).after("<li contenteditable='true'>Enter Text Here</li><i class='fas fa-trash remove-question'></i><textarea class='post-form-ta'/><i class='fas fa-plus add-question'></i>");
    });

    $('.written-copy').on('click','.remove-question',function(){
      // $(this).after("<li contenteditable='true'>Enter Text Here</li><i class='fas fa-trash remove-question'></i><textarea class='post-form-ta'/><i class='fas fa-plus add-question'></i>");
      $(this).prev('li').remove();
      $(this).next('textarea').remove();
      $(this).next('.add-question').remove();
      $(this).remove();
    });


    return (
      <Fragment>
        {/* <div className="container"> */}
          {/* <div className="row">
            <button onClick={this.createPDF} className='text-center text-uppercase btn btn-primary p-2 my-3 scale-item col-12'>Download Your Work as a PDF</button> */}
            {/* <button className='text-center text-uppercase btn btn-primary p-2 my-3 scale-item col-sm-6'>Email me my results</button> */}
          {/* </div> */}
          {/* <div className="row">
            <button id="download-json-btn" onClick={this.downloadJSON} className='text-center text-uppercase btn btn-primary p-2 my-3 scale-item col-12'>Download Your Work as a JSON File</button> */}
            {/* <button className='text-center text-uppercase btn btn-primary p-2 my-3 scale-item col-sm-6'>Email me my results</button> */}
          {/* </div> */}
        {/* </div> */}
        <div className="row">
          <small className='mx-auto text-center p-2 my-3'>I do not save or see any of these answers. If you don't download them before closing this page, you'll loose them forever.</small>
        </div>
      </Fragment>
    );
  }

  createPDF = () => {

    const title = this.state.post.yoast_meta.yoast_wpseo_title.trim();
    const exerciseDescription = this.state.post.acf.exerciseDescription;
    const questions = []
    const answers = []
    // let date = new Date();
    //     date.setHours(0, 0, 0, 0);
    //     date = date.toDateString();
    let date = this.state.date;
    $('.form-post').children('li').each(function() {
      let question = $(this).html().trim();
      // replace inputs with their values in the pdf
      if(question.includes('<input')){
        $(this).children('input').each(function() {
          // console.log($(this).val());
          let val = $(this).val();
          if(!val) val = "____________________";
          question = question.replace('<input type="text">',val);
        })
      }
      // set temp div value to retrieve in order to remove html formating
      question = $('#tempDiv').html(question).text();
      // push question to questions list for pdfmake
      questions.push(question);
    });
    $('.form-post').children('textarea').each(function() {
      answers.push($(this).val().trim());
    });

    let doc = {
      footer: { 
        text: "Everything In All - " + title,
        style: "footer"
      },
      content: [
        {
          text: 'EVERYTHING IN ALL',
          style: 'brand'
        },
        {
          text: date,
          style: 'date'
        },
        {
          text: title,
          style: 'title'
        },
        {
          text: exerciseDescription,
          style: 'description'
        },
        
      ],
      styles: {
        brand: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          marginBottom: 16
        },
        title: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          marginBottom: 32
        },
        description: {
          fontSize: 12,
          bold: false,
          alignment: 'justify',
          marginBottom: 32
        },
        question: {
          fontSize: 12,
          italics: true,
          marginBottom: 16,
          bold: true
        },
        answer: {
          fontSize: 12,
          marginBottom: 32,
          bold: false,
          marginLeft: 20
        },
        footer: {
          fontSize: 9,
          // marginBottom: 32,
          bold: false,
          marginLeft: 36,
          italics: true
        },
        date: {
          // fontSize: 9,
          marginBottom: 16,
          // bold: false,
          alignment: 'center',
          // italics: true
        }
      }
    }

    for(let i = 0; i < questions.length; i++){
      doc.content.push(
        {
        text: (i+1).toString() + '. ' + questions[i],
        style: 'question'
        },
        {
        text: answers[i],
        style: 'answer'
        }
      )
    }

    const filename = title.replace(/ /g, '-').toLowerCase();

    pdfMake.createPdf(doc).download(filename);
   
  }

  // sendPDF = () => {
    // const doc = new jsPDF();

    // doc.text('Hello world!', 10, 10)

    // const pdfFile = doc.output('blob')
    // console.log(pdfFile);

    // API.sendFile("slug", doc)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // doc.save('a4.pdf')
  // }

  render() {
    if (this.state.loading)
      return (
        <LoadingScreen loading={true} bgColor="#000000" logoSrc={loadingImg}>
          <div />
        </LoadingScreen>
      );
    else {
      let post = this.state.post;
      console.log(post);
      let date = post.date.substring(0, 10);
      let modified = post.modified.substring(0, 10);
      const disqusShortname = 'everything-in-all';
      const disqusConfig = {
          url: window.location.href,
          identifier: post.id,
          title: post.title.rendered
      };
      
      

      return (
        <Fragment>
          <SEOHelmet
            item={post}
          />

          <ComponentIndex.Header headImage={post.acf.featuredImage.url}>
            <div className="row w-100 mx-auto">
              <h1 className="mx-auto text-uppercase" data-aos="zoom-out-down">
                {Parser(post.title.rendered)}
              </h1>
            </div>
            <br/>
            {!post.acf.pinecastId ? null : (
              <div className="pinecast-player">
                {Parser(
                  '<iframe src="https://pinecast.com/player/' +
                    post.acf.pinecastId +
                    '?theme=minimal" seamless height="60" style="border:0" class="pinecast-embed" frameborder="0" width="100%"></iframe>'
                )}
              </div>
            )}
          </ComponentIndex.Header>
          {post.content.rendered === "" ? null : 
          <Fragment>
            <div className="post-btns bg-light">
              <div><ion-icon onClick={this.createPDF} name="document"></ion-icon></div>
              <div><ion-icon onClick={this.downloadJSON} name="download"></ion-icon></div>
              <div><ion-icon name="log-in"></ion-icon></div>
              <div><ion-icon name="print"></ion-icon></div>
              <div><ion-icon name="logo-facebook"></ion-icon></div>
              <div><ion-icon name="logo-twitter"></ion-icon></div>
              <div><ion-icon name="share-alt"></ion-icon></div>
            </div>
            <article id={post.slug} className="post-section bg-light py-3">
              <div className="container text-center">
                <div className="row">
                  <small onClick={this.duplicateInputs} className="center-md font-italic col-sm-6 text-left">
                    {Parser(post.title.rendered)}
                  </small>
                  <small className="center-md font-italic col-sm-6 text-right">
                    Published on {date}{' '}
                    {date !== modified ? 'and updated on ' + modified : null}
                  </small>
                  {/* <small className="font-italic col-sm-3 text-right">{Parser(post.acf.author)}</small> */}
                  
                </div>
                <hr />
                {/* <div className="addthis_inline_share_toolbox"></div> */}
                <div className="text-justify post-box">
                    <div id="tempDiv" className="d-none"></div>
                  {/* {!this.state.hasForm ? null : 
                    <div className="container mb-4">
                      <div className="row">
                        <button onClick={this.createPDF} className='text-center text-uppercase btn btn-primary p-2 my-3 scale-item col-12'>Download the Worksheet as a PDF</button>
                        <button id="upload-json-btn" onClick={this.processJSON} className='text-center text-uppercase btn btn-primary p-2 my-3 scale-item col-12'>Upload Previous Work from JSON File</button>
                        <input type="file" id="jsonUpload" onChange={(event) => this.uploadJSON(event)}/>
                        <p className="text-uppercase font-weight-bold mx-auto my-2 text-center">Or Complete Your Work Below</p>
                      </div>
                     
                    </div>
                  } */}
                  <div className="written-copy">
                  {Parser(post.content.rendered)}
                  </div>
                  {this.state.hasForm ? this.renderWorksheetForm() : null}
                </div>
                <img
                  className="mx-auto mb-3"
                  alt="signature"
                  src={signature}
                  width="220px"
                />
                <hr/>
                <div className="row">
                    <small className="center-md font-italic col-sm-6 text-left">
                      {Parser(post.title.rendered)}
                    </small>
                    {post.acf.imageAuthor ? 
                    <small className="center-md font-italic col-sm-6 text-right">
                      Image by {post.acf.imageAuthor}
                    </small>
                    : null}
                </div>
                <div className="row">
                  <div className="my-3 p-4 bg-gray">
                    <ComponentIndex.Subscribe/>
                  </div>
                </div>
                <div className="row">
                  <div id="disqus_thread" className="col-12">
                  <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                  </div>
                </div>
              </div>
            </article>
          </Fragment>}
        </Fragment>
      );
    }
  }
}

export default Post;
