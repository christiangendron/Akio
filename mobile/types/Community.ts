export interface CommunityProps {
    id: number;
    name: string;
    description: string;
}

export interface CommunityNavigationProps {
    route: {
      params: {
        name: string;
        id: number;
      }
    }
  }