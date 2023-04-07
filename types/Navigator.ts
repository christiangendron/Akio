export type TabParams = {
    Home: any;
    HomeStack: StackParams;
    Search: any;
    SearchStack: StackParams;
    Account: any;
    Settings: any;
    Overview: any;
  }
  
  export type StackParams = {
    Home: any;
    Details: {
      data: {
        id: string;
        subreddit: string;
      };
    };
    Overview: {
      data: string;
    };
    FullSizeImage: {
      data: {
        url: string;
        id: string;
        author_fullname: string;
      };
    };
    Subreddit: {
      data: string;
    };
    Search: any;
  }