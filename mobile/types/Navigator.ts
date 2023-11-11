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
      showRegister: boolean;
      showSettings: boolean;
    };
    Account: {
      showRegister: boolean;
      showSettings: boolean;
    };
    Register: any;
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