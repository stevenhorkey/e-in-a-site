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
import documentSVG from '../../assets/icons/_ionicons_svg_md-document.svg';
import downloadSVG from '../../assets/icons/_ionicons_svg_md-download.svg';
import uploadSVG from '../../assets/icons/_ionicons_svg_md-log-in.svg';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Post extends Component {
  state = {
    loading: true,
    post: {},
    hasForm: false,
    date: '',
    uploadedJSON: null,
  };

  getDate = () => {
    let date = new Date();
        date.setHours(0, 0, 0, 0);
        date = date.toDateString();
    // console.log(date);
    return date
  }

  getFileName = () => {
    let title = this.state.post.yoast_meta.yoast_wpseo_title.trim();
    return (title.substr(0, title.indexOf(' - ')) + ' ' + this.getDate()).replace(/ /g, '-').toLowerCase()
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

      /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
      let prevScrollpos = window.pageYOffset;
      window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("mainNav").style.top = "0";
          document.getElementsByClassName("post-btns")[0].style.top = "60px";
        } else {
          document.getElementById("mainNav").style.top = "-60px";
          document.getElementsByClassName("post-btns")[0].style.top = "0";
        }
        prevScrollpos = currentScrollPos;
      }

    

    // this.addEventListeners("li", "click");
    


    const addThis = document.createElement("script");
    const icons = document.createElement("script");

    icons.src = 'https://unpkg.com/ionicons@4.5.0/dist/ionicons.js';
    addThis.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c10200b0c4c37d0';
    // disqus.src = 'https://everything-in-all.disqus.com/embed.js';
    // disqus.setAttribute('data-timestamp', +new Date());
    addThis.async = true;
    icons.async = true;

    document.body.appendChild(addThis);
    document.body.appendChild(icons);
  };

  processJSON = () => {
    let result = this.state.uploadedJSON;
    // console.log(result);

    if(result.postId === this.state.post.id){
      $('.written-copy').html(result.content);
      $("input,select,.post-form-ta").each(function() {
        
        $(this).val($(this).attr('value')); 
        
      });
    } else {
      alert("Not the right post, please go to the right one.")
    }
  };

  uploadJSON = (event) => {
    // console.log('uploadJSON')
    var reader = new FileReader();
    let thas = this;
    reader.onload = function(event) {
      try {
        var jsonObj = JSON.parse(event.target.result);
        thas.setState({
          uploadedJSON: jsonObj
        })
        thas.processJSON();
      }
      catch(err){
        alert('Wrong File Type');
      }
    }
    let file = event.target.files[0];
    reader.readAsText(file);
    // this.processJSON();
    window.$("#uploadJSONmodal").modal('hide')
  };

  downloadJSON = () => {
    $("input,select,.post-form-ta").each(function() {
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
    temp.attr('download', `${this.getFileName()}.json`);
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
    $(".form-post").children().after("<ion-icon class='remove-question' name=\"close\"></ion-icon><div class='post-form-ta' contenteditable=''></div><ion-icon class='add-question' name=\"add\"></ion-icon>");
    $(".form-post").prepend("<ion-icon class='add-question' name=\"add\"></ion-icon>");


    // make questions editable
    $('.form-post li').each(function(){
      $(this).attr("contenteditable","true");
      // create subtext
      if($(this).html().includes(" : ")){
        let liParts = $(this).html().split(" : ");
        $(this).html(liParts[0]);
        $(this).after(`<small contenteditable='true' class="li-subtext">${liParts[1]}</small>`);
      }
    });
    // add additional questions and textareas
    $('.written-copy').on('click','.add-question',function(){
      $(this).after("<li contenteditable='true'>Enter Text Here</li><ion-icon class='remove-question' name=\"close\"></ion-icon><div class='post-form-ta' contenteditable=''></div><ion-icon class='add-question' name=\"add\"></ion-icon>");
    });

    $('.written-copy').on('click','.remove-question',function(){
      // $(this).after("<li contenteditable='true'>Enter Text Here</li><i class='fas fa-trash remove-question'></i><textarea class='post-form-ta'/><i class='fas fa-plus add-question'></i>");
      $(this).prev('li').remove();
      $(this).next('.post-form-ta').remove();
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
    
    $('.form-post').children('.post-form-ta').each(function() {
      let text = $(this).html().trim().replace(/<\/div>/g,'')
      text = text.replace(/<div>/g,'\n').replace(/<br>/g,'\n');
      answers.push(text);
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

  formatTitle = () => {
    let title = this.state.post.title.rendered.split(" &#8211; ");
    title.map((item, index, arr) => {
      arr[index] = item.toUpperCase().replace(/&#038;/g, '&');
    });
    console.log(title);
    return (
      <div className="mx-auto text-uppercase" data-aos="zoom-out-down">
        <h1>
          {Parser(title[0])}
        </h1>
        <h2>{Parser(title[1])}</h2>
      </div>
    )
  }

  render() {
    if (this.state.loading)
      return null
      // (
      //   // <LoadingScreen loading={true} bgColor="#000000" logoSrc={loadingImg}>
      //     <div />
      //   </LoadingScreen>
      // );
    else {
      this.formatTitle();
      let post = this.state.post;
      // console.log(post);
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
            {this.formatTitle()}
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

            {/* side bar btns */}
            <div className="post-btns bg-light">
              <img onClick={this.createPDF} src={documentSVG} />
              <img onClick={this.downloadJSON} src={downloadSVG} />
              <img data-toggle="modal" data-target="#uploadJSONmodal" src={uploadSVG} />
              {/* <div><ion-icon  name="document">H</ion-icon></div> */}
              {/* <div><ion-icon onClick={this.downloadJSON} name="download"></ion-icon></div>
              <div><ion-icon data-toggle="modal" data-target="#uploadJSONmodal" name="log-in"></ion-icon></div> */}
              {/* <div><ion-icon name="print"></ion-icon></div> */}
              {/* <div><ion-icon name="logo-facebook"></ion-icon></div> */}
              {/* <div><ion-icon name="logo-twitter"></ion-icon></div> */}
              <div className="addthis_inline_share_toolbox"></div>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="uploadJSONmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Upload Your JSON File to Continue Your Work</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body d-flex align-items-center justify-content-center">
                    <input type="file" className="" id="jsonUpload" onChange={(event) => this.uploadJSON(event)}/>
                  </div>
                </div>
              </div>
            </div>

            {/* actual article */}
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
                {(this.state.hasForm) ? 
                  <small className='post-info-text mx-auto text-center p-2 my-3'>Feel free to edit, add, and delete questions as needed. Use the toolbar to download a pdf of you work or save a file to upload and continue later. Click <a href="/how-to-use-this-site" target="_blank">here</a> for more information on how to use this site.</small>
                  :
                  null
                }
                
                <div className="text-justify post-box pt-4">
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
                  
                </div>
                
                <img
                  className="mx-auto mb-3"
                  alt="signature"
                  src={signature}
                  width="220px"
                />
                {this.state.hasForm ? this.renderWorksheetForm() : null}
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
                  <div className="my-3 p-4 bg-gray box-shadow">
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
