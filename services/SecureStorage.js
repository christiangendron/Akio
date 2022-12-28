import * as SecureStore from 'expo-secure-store';

async function saveToStorage(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getFromStorage(key) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

const SecureStorage = {saveToStorage, getFromStorage};

export default SecureStorage;
