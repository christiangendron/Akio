import { PostProps } from "../components/items/Post";

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
    AccountHome: {
      id: number;
    };
    Register: any;
    Generate: {
      type: string;
      id: number;
      invalidate: string;
    }
    Community: {
      name: string;
      id: number;
    };
    Settings: any;
    SettingHome: {
      data: string;
    };
    Communities: any;
  }