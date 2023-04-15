export interface SettingsItemProps {
    label: string;
    current: boolean;
    handler: (value: boolean) => void;
}