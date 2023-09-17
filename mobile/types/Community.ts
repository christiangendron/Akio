export interface CommunityProps {
    id: number;
    name: string;
}

export interface CommunityNavigationProps {
    route: {
      params: {
        name: string;
        id: number;
      }
    }
  }