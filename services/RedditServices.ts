import axios from 'axios';

async function getPosts(sub:string, keyword:string, filter:string, accessToken:string) {

  let requestURL = ''

  if (keyword != '') {
    requestURL = `https://oauth.reddit.com/r/${sub}/search?limit=10&q=${keyword}&sort=${filter}`
  } else {
    requestURL = `https://oauth.reddit.com/r/${sub}/${filter}?limit=10`
  }

  const res = await axios.get(requestURL, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return res;
}

async function getPost(id:string, accessToken:string) {
  const res = await axios.get(`https://oauth.reddit.com/r/all/api/info?id=t3_${id}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return res;
}

async function getComments(id:string, subreddit:string, filter:string, accessToken:string) {  
  const res = await axios.get(`https://oauth.reddit.com/r/${subreddit}/comments/${id}?sort=${filter}&limit=25&depth=0`, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return res;
}

async function getOverview(user:string, accessToken:string) {
  const res = await axios.get(`https://oauth.reddit.com/user/${user}/overview`, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return res;
}

const RedditServices = {getPosts, getPost, getComments, getOverview};

export default RedditServices;
