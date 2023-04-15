export interface SettingsContextValue {
  loadSettings: () => void;
  skipPinned: boolean;
  setSkipPinned: (value: boolean) => void;
  minimalBrowsing: boolean;
  setMinimalBrowsing: (value: boolean) => void;
  showUserName: boolean;
  setShowUserName: (value: boolean) => void;
  showSubReddit: boolean;
  setShowSubReddit: (value: boolean) => void;
  searchBar: boolean;
  setSearchBar: (value: boolean) => void;
}

export interface SettingsContextProviderProps {
  children: React.ReactNode;
}