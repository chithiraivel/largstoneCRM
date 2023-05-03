import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/'
});
// const instance = axios.create({
//   baseURL: 'https://backend.largstoneschooloftechnology.com/'
// });

export default instance;