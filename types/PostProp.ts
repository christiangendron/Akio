export type PostProp = {
    data: {
        id: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    subreddit: string;
    author_fullname: string;
    title: string;
    thumbnail: string;
    is_video: boolean;
    is_gallery: boolean;
    upvote_ratio: number;
    preview: {
        images: {
            resolutions: {
                url: string;
                height: number;
                width: number;
            }[]
            source: {
                url: string;
            }
        }[]
    }
    }
}