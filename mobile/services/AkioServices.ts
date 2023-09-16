import axios, { AxiosInstance } from 'axios';
import { PostProps } from '../types/Post';
import { CommunityProps } from '../types/Community';
import { CommentItemProps } from '../types/CommentItem';

const baseURL = 'http://192.168.1.173:3000/api/';

const AxiosClient: AxiosInstance = axios.create({
  baseURL,
});

async function getPosts(community_id:number, keyword: string): Promise<PostProps[]> { 
  let res = null;
  
  if (community_id) {
    res = await AxiosClient.get('post/community/' + community_id + '?keyword=' + keyword);
  } else {
    res = await AxiosClient.get('post' + '?keyword=' + keyword);
  }

  return res.data.body;
}

async function getUserPosts(user_id:number,): Promise<PostProps[]> { 
  const res = await AxiosClient.get('post/user/' + user_id);
  return res.data.body;
}

async function getComments(post_id:number,): Promise<CommentItemProps[]> {
  const res = await AxiosClient.get('post/' + post_id + '/comments');
  return res.data.body;
}

async function getCommunities(): Promise<CommunityProps[]> { 
  const res = await AxiosClient.get('community');
  return res.data.body;
}

const AkioServices = {getPosts, getCommunities, getComments, getUserPosts};

export default AkioServices;
