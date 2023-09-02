import { RedditResponseT3 } from "./RedditResponseT3";

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
    Home: {
      data: string;
    };
    Details: {
      data: RedditResponseT3
    };
    Overview: {
      data: string;
    };
    Account: {
      data: string;
    };
    Subreddit: {
      data: string;
    };
    Settings: {
      data: string;
    };
    SettingHome: {
      data: string;
    };
    Search: any;
  }