import { PostProps } from "../components/items/Post";
import { ListProps } from "../screens/List";

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
    Home: ListProps;
    Overview: ListProps;
    Communities: ListProps;
    Details: PostProps;
    AccountHome: {
      showRegister: boolean;
      showSettings: boolean;
    };
    Account: {
      showRegister: boolean;
      showSettings: boolean;
    };
    Community: ListProps;
    Settings: any;
  }