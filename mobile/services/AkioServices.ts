import axios, { AxiosInstance } from 'axios';
import { PostProps } from '../types/Post';

const baseURL = 'http://192.168.1.184:3000/api/';

const AxiosClient: AxiosInstance = axios.create({
  baseURL,
});

async function getPosts(community:string): Promise<PostProps[]> { 
  console.log(community)
  const res = await AxiosClient.get('post');
  return res.data.body;
}

const AkioServices = {getPosts};

export default AkioServices;
