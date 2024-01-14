import React from "react";
import { useLocalObservable } from "mobx-react-lite";

export const initalValues = {
	visible: false
};

type IPropInit = {
	visible: boolean;
};

export interface ThreeProps extends IPropInit {
	setVisible: (bol: boolean) => void;
}

const ThreeData = () => {
	const store = useLocalObservable<ThreeProps>(() => ({
		...initalValues,
		setVisible(bol: boolean) {
			store.visible = bol;
		}
	}));
	return store;
};
export default ThreeData;
