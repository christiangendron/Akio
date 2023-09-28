import axios, { AxiosInstance } from 'axios';
import { PostProps } from '../types/Post';
import { CommunityProps } from '../types/Community';
import { CommentItemProps } from '../types/CommentItem';
import {BACKEND_URL} from '@env';

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

async function generatePost(community_id: number, community_name: string, user_id: number): Promise<PostProps[]> { 
  const res = await AxiosClient.post('post', {community_name, community_id, user_id});
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

async function deletePost(post_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.delete('post/' + post_id);
  return res.data.data;
}

const AkioServices = {getPosts, getCommunities, getComments, getUserPosts, generatePost, generateCommunity, generateComment, deletePost};

export default AkioServices;
