import { PostProps } from '../components/items/Post';
import { CommentItemProps } from '../components/items/Comment';
import { CommunityProps } from '../components/items/Community';
import AxiosClient from './AxiosClient';
import { GenerateVariables } from '../components/modal/GenerateModal';

async function getPosts(type: string, id: number, orderBy: string, keyword: string): Promise<any> {  
	if (id === 0) {
		return await getAllPosts(orderBy, keyword);
	}

	if (type.includes('community')) {
		return await getCommunityPosts(id, orderBy, keyword);
	} else if (type.includes('saved')) {
		return await getSavedPosts(orderBy, keyword);
	} else {
		return await getUserPosts(id, orderBy, keyword);
	}
}

async function getAllPosts(order_by: string, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('post', {params: { order_by, keyword }});
	return res.data.data;
}

async function getUserPosts(user_id:number, order_by: string, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('post/user/' + user_id, {params: { order_by, keyword }});
	return res.data.data;
}

async function getCommunityPosts(community_id:number, order_by: string, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('post/community/' + community_id, {params: { order_by, keyword }});
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

async function getSavedPosts(order_by: String, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('saved/post', {params: { order_by, keyword }});
	return res.data.data;
}

async function savePost(id: number): Promise<any> { 
	const res = await AxiosClient.post('saved/post/' + id);
	return res.data.data;
}

async function unSavePost(id: number): Promise<any> { 
	const res = await AxiosClient.delete('saved/post/' + id);
	return res.data.data;
}

const AkioServices = {
	getCommunities, 
	getComments, 
	getUserPosts, 
	generateItem,
	deleteItem,
	getPosts,
	getSavedPosts,
	savePost,
	unSavePost
};

export default AkioServices;
