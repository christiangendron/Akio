import { RedditResponseT3 } from '../types/RedditResponseT3';
import AxiosClient from './AxiosClient';

async function getPosts(sub:string, keyword:string, filter:String, last: string): Promise<RedditResponseT3[]> {

  let requestURL = ''

  if (keyword != '') {
    requestURL = `https://oauth.reddit.com/r/${sub}/search?limit=10&q=${keyword}&sort=${filter}&after=${last}`
  } else {
    requestURL = `https://oauth.reddit.com/r/${sub}/${filter}?limit=10&after=${last}`
  }

  const res = await AxiosClient.get(requestURL);

  return res.data.data.children;
}

async function getPost(id:string) {
  const res = await AxiosClient.get(`https://oauth.reddit.com/r/all/api/info?id=t3_${id}`);

  return res;
}

async function getComments(id:string, subreddit:string, filter:string) {  
  const res = await AxiosClient.get(`https://oauth.reddit.com/r/${subreddit}/comments/${id}?sort=${filter}&limit=25&depth=0`);

  return res;
}

async function getOverview(user:string) {
  const res = await AxiosClient.get(`https://oauth.reddit.com/user/${user}/overview`);

  return res;
}

const RedditServices = {getPosts, getPost, getComments, getOverview};

export default RedditServices;
