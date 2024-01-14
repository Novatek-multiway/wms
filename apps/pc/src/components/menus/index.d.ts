export interface Item {
	key: string;
	path?: string;
	icon?: any;
	label: string;
	children?: Item[];
}

export interface MenuItem extends Item {
	children?: Array<Item>;
}
