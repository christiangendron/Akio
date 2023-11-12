import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from 'nativewind';

export const SettingsContext = createContext<any | null>(null);

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export default function SettingContextProvider(props: any) {
  const { toggleColorScheme, setColorScheme } = useColorScheme();

  const [minimalBrowsing, setMinimalBrowsing] = useState(false);
  const [hideSearchBar, setHideSearchBar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Retrive settings on load
  useEffect(() => {
    SecureStore.getItemAsync('settings')
    .then((res: any) => {
      const parsed = JSON.parse(res);

      setMinimalBrowsing(parsed.minimalBrowsing);
      setHideSearchBar(parsed.hideSearchBar);
      setDarkMode(parsed.darkMode);
      setColorScheme(parsed.darkMode ? 'dark' : 'light')
    })
    .catch((err: any) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    saveSettings();
  }, [minimalBrowsing, hideSearchBar, darkMode]);

  const toggleDarkMode = () => {
    toggleColorScheme();
    setDarkMode(!darkMode);
  }

  const toggleSearchBar = () => {
    setHideSearchBar(!hideSearchBar);
  }

  const toggleMinimalBrowsing = () => {
    setMinimalBrowsing(!minimalBrowsing);
  }

  const saveSettings = async () => {
    await SecureStore.setItemAsync('settings', JSON.stringify({
      darkMode,
      hideSearchBar,
      minimalBrowsing,
    }));
  }

  const allowedContent: any = {
    minimalBrowsing,
    hideSearchBar,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    toggleSearchBar,
    toggleMinimalBrowsing,
  };

  return (
    <SettingsContext.Provider value={allowedContent}>
      {props.children}
    </SettingsContext.Provider>
  );
}