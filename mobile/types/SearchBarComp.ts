export type SearchBarProps = {
    data: {
        keyword: string;
        handleChange: (text: string) => void;
        handleSubmit: () => void;
    }
}