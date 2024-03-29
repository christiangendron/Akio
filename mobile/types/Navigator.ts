import { PostProps } from "../components/items/Post";
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
	Details: PostProps;
	Saved: ListProps;
	Tasks: any;
	AccountHome: {
		showRegister: boolean;
		showSettings: boolean;
	};
	Account: {
		showRegister: boolean;
		showSettings: boolean;
	};
	Community: ListProps;
	Communities: any;
	Settings: any;
}