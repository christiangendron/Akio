import { PostProps } from '../components/items/Post';
import { CommentItemProps } from '../components/items/Comment';
import { CommunityProps } from '../components/items/Community';
import AxiosClient from './AxiosClient';
import { GenerateItemVariables } from '../components/GenerateButton';

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
  const res = await AxiosClient.get('post/user/' + user_id + '/' + keyword);
  return res.data.data;
}

async function getComments(post_id:number,): Promise<CommentItemProps[]> {
  const res = await AxiosClient.get('comment/post/' + post_id);
  return res.data.data;
}

async function getCommunities(): Promise<CommunityProps[]> { 
  const res = await AxiosClient.get('community');
  return res.data.data;
}

async function generateItem(variables: GenerateItemVariables): Promise<any> { 
  let res = null;
  
  if (variables.type === 'post') {
    res = await AxiosClient.post(`post/community/${variables.id}/generate/` + variables.inspiration);
  } else if (variables.type === 'community') {
    res = await AxiosClient.post('community/generate/' + variables.inspiration);
  } else {
    res = await AxiosClient.post(`comment/post/${variables.id}/generate/` + variables.inspiration);
  }

  return res.data.data;
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
  deletePost, 
  deleteCommunity,
  deleteComment,
  generateItem
};

export default AkioServices;
