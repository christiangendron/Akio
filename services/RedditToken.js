import axios from 'axios';
import {CLIENT_ID_64} from '@env';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['User-Agent'] = 'iOS:Akio:v0.0.1 (by /u/AkioApp)';
axios.defaults.headers.post['Authorization'] = 'Basic ' + CLIENT_ID_64;
axios.defaults.headers.post['Accept'] = 'application/json';

async function requestBasicToken() {
  const dataform = new FormData();
  dataform.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
  dataform.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');

  const res = await axios.post('https://www.reddit.com/api/v1/access_token', dataform);
  return res;
}

const RedditToken = {requestBasicToken};

export default RedditToken;
