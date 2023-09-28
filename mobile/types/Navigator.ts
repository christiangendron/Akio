import { PostProps } from "./Post";

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
    Details: PostProps;
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
    Communities: any;
  }