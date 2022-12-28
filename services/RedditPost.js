import axios from 'axios';

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
