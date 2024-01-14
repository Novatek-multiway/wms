import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import lodash from "lodash";
export const initalValues = {
	permissionInfoData: [],
	menuInfoValue: [],
	functionListInfo: []
};

type IPropInit = {
	permissionInfoData: any;
	menuInfoValue: any;
	functionListInfo: any;
};

export interface AuthorizationProps extends IPropInit {
	setPermissionInfoData: (val: any) => {};
	setMenuInfoValue: (val: any) => {};
	setFunctionListInfo: (val: any) => {};
}

const AuthorizationData = () => {
	const store = useLocalObservable<AuthorizationProps>(() => ({
		...initalValues,
		setPermissionInfoData(val: any) {
			store.permissionInfoData = val;
		},
		setMenuInfoValue(val: any) {
			store.menuInfoValue = val;
		},
		setFunctionListInfo(val) {
			let newAry = lodash.flattenDeep(val);
			store.functionListInfo = newAry;
		}
	}));

	return store;
};
export default AuthorizationData;
