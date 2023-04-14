export interface OptionProps {
    label: string,
    icon?: boolean,
    filter?: string;
    selectable?: boolean,
    handler: () => void
}