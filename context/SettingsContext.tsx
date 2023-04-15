import { createContext, useState } from 'react';
import { SettingsContextProviderProps, SettingsContextValue } from '../types/SettingsContext';

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export default function SettingContextProvider(props: SettingsContextProviderProps) {
  const [skipPinned, setSkipPinned] = useState(true);
  const [minimalBrowsing, setMinimalBrowsing] = useState(true);

  const allowedContent: SettingsContextValue = {
    skipPinned,
    setSkipPinned,
    minimalBrowsing,
    setMinimalBrowsing,
  };

  return (
    <SettingsContext.Provider value={allowedContent}>
      {props.children}
    </SettingsContext.Provider>
  );
}