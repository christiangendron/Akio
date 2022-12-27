import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['User-Agent'] = 'iOS:Akio:v0.0.1 (by /u/AkioApp)';
axios.defaults.headers.post['Accept'] = 'application/json';

async function getPosts(sub, accessToken) {
  const res = await axios.get(`https://oauth.reddit.com/r/${sub}/top?limit=10`, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return res;
}

const RedditPosts = {getPosts};

export default RedditPosts;
