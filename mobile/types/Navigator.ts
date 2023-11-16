import { PostProps } from "../components/items/Post";
import { CommunityProps } from "../screens/CommunityList";
import { ListProps } from "../screens/PostsList";

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
    Communities: CommunityProps;
    Details: PostProps;
    Saved: ListProps;
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