export interface CommentItemProps {
    data: {
        id: string;
        text_content: string;
        votes: number;
        user_id: number;
        post_id: number;
    }
}