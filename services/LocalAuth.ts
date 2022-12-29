import * as LocalAuthentication from 'expo-local-authentication';

async function getAuth() {
  const res = await LocalAuthentication.authenticateAsync();
  return res;
}

const LocalAuth = {getAuth};

export default LocalAuth;
