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
  if (variables.type === 'post') {
    return await AxiosClient.post(`post/community/${variables.id}/generate/`, {
      inspiration: variables.inspiration,
      with_image: variables.with_image,
    });
  } else if (variables.type === 'community') {
    return await AxiosClient.post('community/generate/', {
      inspiration: variables.inspiration,
      with_image: variables.with_image,
    });
  } else {
    return await AxiosClient.post(`comment/post/${variables.id}/generate/`, {
      inspiration: variables.inspiration,
    });
  }
}

async function deleteItem(variables: any): Promise<any> {
  if (variables.type === 'post') {
    return await AxiosClient.delete('post/' + variables.id);
  } else if (variables.type === 'community') {
    return await AxiosClient.delete('community/' + variables.id);
  } else {
    return await AxiosClient.delete('comment/' + variables.id);
  }
}

const AkioServices = {
  getPosts, 
  getCommunities, 
  getComments, 
  getUserPosts, 
  generateItem,
  deleteItem
};

export default AkioServices;
