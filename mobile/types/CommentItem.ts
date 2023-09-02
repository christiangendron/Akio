export interface CommentItemProps {
    data: {
        id: string;
        author: string;
        body: string;
        ups: number;
        created_utc: number;
        edited: boolean;
    }
}