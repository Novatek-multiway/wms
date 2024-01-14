import React, { createContext } from "react";
import useAuthorizationContext, { AuthorizationProps } from "./authorization.store";

export interface AuthorizationStoreContext {
	authorizationStore: AuthorizationProps;
}

export const AuthorizationStoreContext = createContext<AuthorizationStoreContext>(null);

type IProps = {
	children: React.ReactNode; // 👈️ type children
};
const AuthorizationSore = (props: IProps) => {
	const authorizationContext = useAuthorizationContext();
	return (
		<AuthorizationStoreContext.Provider
			value={{
				authorizationStore: authorizationContext
			}}
		>
			{props.children}
		</AuthorizationStoreContext.Provider>
	);
};

export default AuthorizationSore;
