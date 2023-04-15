import { createContext, useState, useEffect } from 'react';
import { SettingsContextProviderProps, SettingsContextValue } from '../types/SettingsContext';
import * as SecureStore from 'expo-secure-store';

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export default function SettingContextProvider(props: SettingsContextProviderProps) {
  const [skipPinned, setSkipPinned] = useState(true);
  const [showUserName, setShowUserName] = useState(false);
  const [showSubReddit, setShowSubReddit] = useState(false);
  const [minimalBrowsing, setMinimalBrowsing] = useState(false);
  const [searchBar, setSearchBar] = useState(true);

  useEffect(() => {
    saveSettings();
  }, [skipPinned, showUserName, showSubReddit, minimalBrowsing, searchBar])

  const saveSettings = async () => {
    console.log('saving settings')
    
    await SecureStore.setItemAsync('settings', JSON.stringify({
      skipPinned,
      showUserName,
      showSubReddit,
      minimalBrowsing,
      searchBar
    }));
  }

  const loadSettings = async () => {
    console.log('loading settings')

    const settings = await SecureStore.getItemAsync('settings');

    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setSkipPinned(parsedSettings.skipPinned);
      setShowUserName(parsedSettings.showUserName);
      setShowSubReddit(parsedSettings.showSubReddit);
      setMinimalBrowsing(parsedSettings.minimalBrowsing);
      setSearchBar(parsedSettings.searchBar);
    }
  }

  const allowedContent: SettingsContextValue = {
    skipPinned,
    setSkipPinned,
    minimalBrowsing,
    setMinimalBrowsing,
    showUserName,
    setShowUserName,
    showSubReddit,
    setShowSubReddit,
    searchBar,
    setSearchBar,
    loadSettings,
  };

  return (
    <SettingsContext.Provider value={allowedContent}>
      {props.children}
    </SettingsContext.Provider>
  );
}