import 'es6-promise';
import axios from 'axios';

const host = 'http://52.63.108.2/api/v1';
function testAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      const date = new Date();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();

      seconds = seconds < 10 ? `0${ seconds }` : seconds;
      minutes = minutes < 10 ? `0${ minutes }` : minutes;

      resolve(`Current time: ${ date.getHours() }:${ minutes }:${ seconds }`);
    }, (Math.random() * 1000) + 1000); // 1-2 seconds delay
  });
}

const get = (url) => {
  return new Promise(resolve => {
    axios.get(host + url).then(response => {
       resolve(response.data);
    }, err => {
      console.error(err);
    })
  });
}

const post = (url, data) => {
  return new Promise(resolve => {
    axios.post(host + url, JSON.stringify(data)).then(response => {
      resolve(response.data);
    }, err => {
      console.error(err);
    })
  });
}

export default {
  testAsync,
  get,
  post
};
