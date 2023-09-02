import axios, { AxiosInstance } from 'axios';
import {CLIENT_ID_64} from '@env';
import * as SecureStore from 'expo-secure-store';
import { RedditAccessTokenResponse } from '../types/AuthContext';

const baseURL = 'https://oauth.reddit.com';

const AxiosTokenServices: AxiosInstance = axios.create({
  baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'iOS:Akio:v0.0.2 (by /u/AkioApp)',
      'Accept': 'application/json',
      'Authorization': `Basic ${CLIENT_ID_64}`
    }
  }
});

async function getToken(): Promise<string> {
  // Try to get it from the secure store
  const token = await SecureStore.getItemAsync('accessToken');

  // If it's not there, request one
  if (!token) {
    console.log('There was no token in the secure store, getting a new one.')
    return (await requestBasicToken()).access_token;
  }

  return token;
}

async function requestBasicToken(): Promise<RedditAccessTokenResponse> {
  console.log('Requesting a new token.')

  // Build the request  
  const dataform = new FormData();
  dataform.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
  dataform.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');
  
  // Make the actual request
  const res = await AxiosTokenServices.post('https://www.reddit.com/api/v1/access_token', dataform);

  if (!res) {
    throw new Error('No response from token request');
  }

  // Save the token to the secure store
  await SecureStore.setItemAsync('accessToken', res.data.access_token);

  return res.data;
}

async function clearToken() {
  await SecureStore.deleteItemAsync('accessToken');
}

async function setExpiredToken() {
  await SecureStore.setItemAsync('accessToken', '-SgmTOZjZkeACtNbareKwxjR9HaDEtA');
}

const TokenServices = {getToken, requestBasicToken, clearToken, setExpiredToken};

export default TokenServices;
