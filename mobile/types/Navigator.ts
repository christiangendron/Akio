import { PostProps } from "./Post";
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
      data: PostProps;
    };
    Overview: {
      name: string;
      id: number;
    };
    Account: {
      name: string;
      id: number;
    };
    Community: {
      name: string;
      id: number;
    };
    Settings: {
      data: string;
    };
    SettingHome: {
      data: string;
    };
    Search: any;
  }