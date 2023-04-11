import axios from 'axios';
import {CLIENT_ID_64} from '@env';
import * as SecureStore from 'expo-secure-store';
import { RedditAccessTokenResponse } from '../types/AuthContext';

async function getToken(): Promise<string> {
  // Try to get it from the secure store
  let token = await SecureStore.getItemAsync('accessToken');

  // If it's not there, request one
  if (!token) {
    token = (await requestBasicToken()).access_token
  }

  // If it's still not there, throw an error
  if (!token) {
    throw new Error('No token found');
  }

  return token;
}

async function requestBasicToken(): Promise<RedditAccessTokenResponse> {
  // Build the request  
  const dataform = new FormData();
  dataform.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
  dataform.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');

  // Set the headers
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post['User-Agent'] = 'iOS:Akio:v0.0.1 (by /u/AkioApp)';
  axios.defaults.headers.post['Accept'] = 'application/json';
  axios.defaults.headers.post['Authorization'] = 'Basic ' + CLIENT_ID_64;

  // Make the request
  const res = await axios.post('https://www.reddit.com/api/v1/access_token', dataform);

  // Save the token to the secure store
  await SecureStore.setItemAsync('accessToken', res.data.access_token);

  return res.data;
}

const TokenServices = {getToken, requestBasicToken};

export default TokenServices;
