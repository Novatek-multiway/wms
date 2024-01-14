import { Navigate, useLocation, matchRoutes } from "react-router-dom";
import { getToken } from "@/utils/token";
import routes from "@/router/routes";
import { useStore } from "@/store/index";
import { uniq, includes, trim } from "lodash";
import { getLoginUserPermissionApi } from "@/http";
import { useEffect, useState } from "react";
import Loading from "../loading";

interface IAuthProps {
	children?: React.ReactNode;
}

// 路由鉴权
function Auth({ children }: IAuthProps) {
	const { configStore } = useStore();
	const [userPermissionData, setUserPermissionData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function fetchUserPermissionData() {
			try {
				const userPermissionData = await getLoginUserPermissionApi();
				setUserPermissionData(userPermissionData.resultData?.permission);
				configStore.setUserPermissionData(userPermissionData.resultData);
			} catch (error) {
				console.log("error>>", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchUserPermissionData();
	}, []);

	function getUserPermissionKey(permissionData) {
		const list = [];
		permissionData.map(v => {
			if (v.children && v.children.length) {
				const routeChild = getUserPermissionKey(v.children);
				list.push(...routeChild);
			}
			list.push(v.menuName);
		});
		return uniq(list);
	}

	let authKey = getUserPermissionKey(userPermissionData);

	const { pathname } = useLocation();
	if (pathname === "/login") return children;
	const matchRoute = matchRoutes(routes, pathname);

	let hasAuth: Boolean;
	if (matchRoute && matchRoute.length > 1) {
		let currentPath = pathname === "/" ? "home" : trim(matchRoute[1].pathname, "/");
		hasAuth = includes(authKey, currentPath);
	}
	if (isLoading) {
		// 显示加载状态
		return <Loading />;
	} else {
		// * 如果访问的地址没有在路由表中重定向到403页面
		if (hasAuth !== undefined && !hasAuth) return <Navigate to="/403" />;
		const token = getToken('AuthenticationToken');
		if (token) {
			return <>{children}</>;
		} else {
			return <Navigate to="/login" replace />;
		}
	}
}

export default Auth;
