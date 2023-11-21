import { PostProps } from '../components/items/Post';
import { CommentItemProps } from '../components/items/Comment';
import { CommunityProps } from '../components/items/Community';
import AxiosClient from './AxiosClient';
import { GenerateVariables } from '../components/modal/GenerateModal';

type MessageResponse = {
	message: string,
}

/**
 * Function to retrive a list of posts.
 * @param type user, community, saved
 * @param id id of the user or community
 * @param orderBy old or new
 * @param keyword keyword to search for
 * @returns PostProps[]
 */
async function getPosts(type: string, id: number, orderBy: string, keyword: string): Promise<PostProps[]> {  
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

/**
 * Get all posts route.
 * @param order_by old or new
 * @param keyword keyword to search for
 * @returns PostProps[]
 */
async function getAllPosts(order_by: string, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('post', {params: { order_by, keyword }});
	return res.data.data;
}

/**
 * Get user posts route.
 * @param user_id id of the user
 * @param order_by old or new
 * @param keyword keyword to search for
 * @returns PostProps[]
 */
async function getUserPosts(user_id:number, order_by: string, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('post/user/' + user_id, {params: { order_by, keyword }});
	return res.data.data;
}

/**
 * Get community posts route.
 * @param community_id id of the community
 * @param order_by old or new
 * @param keyword keyword to search for
 * @returns PostProps[]
 */
async function getCommunityPosts(community_id:number, order_by: string, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('post/community/' + community_id, {params: { order_by, keyword }});
	return res.data.data;
}

/**
 * Get comments route.
 * @param post_id id of the post we want to get the comments from
 * @returns CommentItemProps[]
 */
async function getComments(post_id:number,): Promise<CommentItemProps[]> {
	const res = await AxiosClient.get('comment/post/' + post_id);
	return res.data.data;
}

/**
 * Get communities route.
 * @returns CommunityProps[]
 */
async function getCommunities(): Promise<CommunityProps[]> { 
	const res = await AxiosClient.get('community');
	return res.data.data;
}

/**
 * Generate a new item.
 * @param variables variables to generate a new item
 * @returns MessageResponse
 */
async function generateItem(variables: GenerateVariables): Promise<MessageResponse> { 
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

/**
 * Delete an item.
 * @param variables id of the resource to delete
 * @returns MessageResponse
 */
async function deleteItem(variables: any): Promise<MessageResponse> {
	if (variables.type === 'post') {
		return await AxiosClient.delete('post/' + variables.id);
	} else if (variables.type === 'community') {
		return await AxiosClient.delete('community/' + variables.id);
	} else {
		return await AxiosClient.delete('comment/' + variables.id);
	}
}

/**
 * Get saved posts route.
 * @param order_by old or new
 * @param keyword keyword to search for
 * @returns PostProps[]
 */
async function getSavedPosts(order_by: String, keyword: string): Promise<PostProps[]> { 
	const res = await AxiosClient.get('saved/post', {params: { order_by, keyword }});
	return res.data.data;
}

/**
 * Save a post.
 * @param id id of the post to save
 * @returns MessageResponse
 */
async function savePost(id: number): Promise<MessageResponse> { 
	const res = await AxiosClient.post('saved/post/' + id);
	return res.data.data;
}

/**
 * Unsave a post.
 * @param id id of the post to unsave
 * @returns MessageResponse
 */
async function unSavePost(id: number): Promise<MessageResponse> { 
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
