import axios from 'axios';
// var md5 = require('md5');

// All api routes are defined here centrally for ease of use.
const url = 'https://api.everythinginall.com/wp-json/wp/v2/';
// const mcListId = 'd25ec94b8f';


export default {
  getPosts: num => axios.get(url + 'posts?&per_page=' + num),
  getQuotes: () => axios.get(url + 'posts?&per_page=100'),
  getPages: () => axios.get(url + 'pages'),
  getPost: slug => axios.get(url + 'posts?slug=' + slug),
  getPage: () => axios.get(url + 'page'),
  sendFile: (slug, file) => axios.post(url + slug, file),
  login: (email, password) => axios.post('https://api.everythinginall.com/wp-json/' + 'jwt-auth/v1/token')
  // mcAddSubscriber: (data) => axios.post('https://memeandmeaning.us16.list-manage.com/subscribe/post?u=4c73c4e387b1f2b219c1f2af6&amp;id=d25ec94b8f', data)
};