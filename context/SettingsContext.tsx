import { createContext, useState } from 'react';
import { SettingsContextProviderProps, SettingsContextValue } from '../types/SettingsContext';

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export default function SettingContextProvider(props: SettingsContextProviderProps) {
  const [skipPinned, setSkipPinned] = useState(true);
  const [showUserName, setShowUserName] = useState(false);
  const [showSubReddit, setShowSubReddit] = useState(false);
  const [minimalBrowsing, setMinimalBrowsing] = useState(false);
  const [searchBar, setSearchBar] = useState(true);

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
    setSearchBar
  };

  return (
    <SettingsContext.Provider value={allowedContent}>
      {props.children}
    </SettingsContext.Provider>
  );
}