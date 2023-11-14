import { PostProps } from '../components/items/Post';
import { CommentItemProps } from '../components/items/Comment';
import { CommunityProps } from '../components/items/Community';
import AxiosClient from './AxiosClient';
import { GenerateVariables } from '../components/modal/GenerateModal';

async function getPosts(type: string, id: number, orderBy: string, keyword: string): Promise<any> {  
  const order_by = 'created_at';
  const direction = orderBy === 'new' ? 'desc' : 'asc';

  if (id === 0) {
    return await getAllPosts(order_by, direction, keyword);
  }

  if (type.includes('community')) {
    return await getCommunityPosts(id, order_by, direction, keyword);
  } else {
    return await getUserPosts(id, order_by, direction, keyword);
  }
}

async function getAllPosts(order_by: string, direction: string, keyword: string): Promise<PostProps[]> { 
  const res = await AxiosClient.get('post', {params: { order_by, direction, keyword }});
  return res.data.data;
}

async function getUserPosts(user_id:number, order_by: string, direction: string, keyword: string): Promise<PostProps[]> { 
  const res = await AxiosClient.get('post/user/' + user_id, {params: { order_by, direction, keyword }});
  return res.data.data;
}

async function getCommunityPosts(community_id:number, order_by: string, direction: string, keyword: string): Promise<PostProps[]> { 
  const res = await AxiosClient.get('post/community/' + community_id, {params: { order_by, direction, keyword }});
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

async function generateItem(variables: GenerateVariables): Promise<any> { 
  if (variables.type.includes('post')) {
    return await AxiosClient.post(`post/community/${variables.id}/generate/`, {
      inspiration: variables.inspiration,
      with_image: variables.with_image,
    });
  } else if (variables.type.includes('community')) {
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
  getCommunities, 
  getComments, 
  getUserPosts, 
  generateItem,
  deleteItem,
  getPosts
};

export default AkioServices;
