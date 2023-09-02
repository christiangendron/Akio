import { RedditResponseT3 } from '../types/RedditResponseT3';
import AxiosClient from './AxiosClient';

async function getPosts(sub:string, filter:string, keyword: string,last: string): Promise<RedditResponseT3[]> {
  let res = null

  if (keyword === '') {
    res = await AxiosClient.get(`https://oauth.reddit.com/r/${sub}/${filter}?limit=10&q=${keyword}&after=${last}`);
  } else {
    res = await AxiosClient.get(`https://oauth.reddit.com/r/${sub}/search?q=${keyword}&sort=${filter}&limit=10&after=${last}`);
  }

  if (res === null) {
    throw new Error('Getting post failed');
  }

  return res.data.data.children;
}

async function getPost(id:string): Promise<RedditResponseT3>  {
  const res = await AxiosClient.get(`https://oauth.reddit.com/r/all/api/info?id=t3_${id}`);

  return res.data.data.children[0];
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
