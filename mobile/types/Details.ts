import { PostProps } from "./Post";

export type DetailsScreenProps = {
  route: {
    params: {
      data: PostProps;
    }
  }
};