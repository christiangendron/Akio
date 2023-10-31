import { PostProps } from '../components/items/Post';
import { CommentItemProps } from '../components/items/Comment';
import { CommunityProps } from '../components/items/Community';
import AxiosClient from './AxiosClient';

async function getPosts(community_id:number, keyword: string): Promise<PostProps[]> { 
  let res = null;
  
  if (community_id) {
    res = await AxiosClient.get('post/community/' + community_id + '/' + keyword);
  } else {
    res = await AxiosClient.get('post' + '/' + keyword);
  }

  return res.data.data;
}

async function getUserPosts(user_id:number, keyword: string): Promise<PostProps[]> { 
  const res = await AxiosClient.get('post/user/' + user_id + '?keyword=' + keyword);
  return res.data.data;
}

async function getComments(post_id:number,): Promise<CommentItemProps[]> {
  const res = await AxiosClient.get('comment/post/' + post_id);
  return res.data.body;
}

async function getCommunities(): Promise<CommunityProps[]> { 
  const res = await AxiosClient.get('community');
  return res.data.data;
}

async function generatePost(community_id: number): Promise<PostProps[]> { 
  const res = await AxiosClient.post(`post/community/${community_id}/generate`);
  return res.data.data;
}

async function generateCommunity(): Promise<CommunityProps[]> {
  const res = await AxiosClient.post('community/generate');
  return res.data.data;
}

async function generateComment(post_id: number): Promise<CommunityProps[]> { 
  throw new Error('Not implemented');

  const res = await AxiosClient.post('post/' + post_id + '/comments');
  return res.data.body;
}

async function generateUser(): Promise<any> { 
  throw new Error('Not implemented');

  const res = await AxiosClient.post('user');
  return res.data.body;
}

async function deletePost(post_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.delete('post/' + post_id);
  return res.data.message;
}

async function deleteCommunity(community_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.delete('community/' + community_id);
  return res.data.message;
}

async function deleteComment(comment_id: number): Promise<CommunityProps[]> { 
  const res = await AxiosClient.delete('comment/' + comment_id);
  return res.data.message;
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
  deleteCommunity,
  deleteComment
};

export default AkioServices;
