import { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const SettingsContext = createContext<any | null>(null);

export default function SettingContextProvider(props: any) {
  const [skipPinned, setSkipPinned] = useState(true);
  const [showUsername, setShowUsername] = useState(true);
  const [showCommunity, setShowCommunity] = useState(true);
  const [showVotes, setShowVotes] = useState(true);
  const [minimalBrowsing, setMinimalBrowsing] = useState(false);
  const [searchBar, setSearchBar] = useState(true);

  useEffect(() => {
    saveSettings();
  }, [skipPinned, showUsername, showCommunity, showVotes, minimalBrowsing, searchBar])

  const saveSettings = async () => {
    console.log('saving settings')
    
    await SecureStore.setItemAsync('settings', JSON.stringify({
      skipPinned,
      showUsername,
      showCommunity,
      showVotes,
      minimalBrowsing,
      searchBar
    }));
  }

  const loadSettings = async () => {
    const settings = await SecureStore.getItemAsync('settings');

    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setSkipPinned(parsedSettings.skipPinned);
      setShowUsername(parsedSettings.showUsername);
      setShowCommunity(parsedSettings.showCommunity);
      setShowVotes(parsedSettings.showVotes);
      setMinimalBrowsing(parsedSettings.minimalBrowsing);
      setSearchBar(parsedSettings.searchBar);
    }
  }

  const allowedContent: any = {
    skipPinned,
    setSkipPinned,
    minimalBrowsing,
    setMinimalBrowsing,
    showUsername,
    setShowUsername,
    showCommunity,
    setShowCommunity,
    showVotes,
    setShowVotes,
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