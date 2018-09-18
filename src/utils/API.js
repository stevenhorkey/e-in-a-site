import axios from 'axios';

// All api routes are defined here centrally for ease of use.
const url = 'https://api.memeandmeaning.com/wp-json/wp/v2/';
export default {
  getPosts: num => axios.get(url + 'posts?&per_page=' + num),
  getQuotes: () => axios.get(url + 'posts?&per_page=100'),
  getPages: () => axios.get(url + 'pages'),
  getPost: slug => axios.get(url + 'posts?slug=' + slug),
  getPage: () => axios.get(url + 'page')
};
