import axios, { AxiosInstance } from 'axios';
import {BACKEND_URL} from '@env';
import { PostProps } from '../components/items/Post';
import { CommentItemProps } from '../components/items/Comment';
import { CommunityProps } from '../components/items/Community';

const baseURL = BACKEND_URL;

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

async function getUserPosts(user_id:number, keyword: string): Promise<PostProps[]> { 
  const res = await AxiosClient.get('post/user/' + user_id + '?keyword=' + keyword);
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

async function generatePost(community_id: number, community_name: string): Promise<PostProps[]> { 
  const res = await AxiosClient.post('post', {community_name, community_id});
  return res.data.body;
}

async function generateCommunity(): Promise<CommunityProps[]> { 
  const res = await AxiosClient.post('community');
  return res.data.body;
}

async function generateComment(post_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.post('post/' + post_id + '/comments');
  return res.data.body;
}

async function generateUser(): Promise<any> { 
  const res = await AxiosClient.post('user');
  return res.data.body;
}

async function deletePost(post_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.delete('post/' + post_id);
  return res.data.data;
}

async function deleteCommunity(post_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.delete('community/' + post_id);
  return res.data.data;
}

const AkioServices = {
  getPosts, 
  getCommunities, 
  getComments, 
  getUserPosts, 
  generatePost, 
  generateCommunity, 
  generateComment, 
  deletePost, 
  generateUser,
  deleteCommunity};

export default AkioServices;
