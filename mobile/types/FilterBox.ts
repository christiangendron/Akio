export interface FilterBoxProps {
    filter: {
        current: string,
    },
    refetch: () => void,
}