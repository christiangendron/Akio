export type SearchBarProps = {
    keyword: string;
    handleChange: (text: string) => void;
    handleSubmit: () => void;
}