export interface SettingsContextValue {
  skipPinned: boolean;
  setSkipPinned: (value: boolean) => void;
}

export interface SettingsContextProviderProps {
  children: React.ReactNode;
}