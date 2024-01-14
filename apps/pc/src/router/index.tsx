import { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Loading from "@/components/loading";
import Auth from "@/components/auth";
import lazyLoad from "@/router/utils/lazyLoad";

import { AliveScope } from "react-activation";

function RouterConfig() {
	function getRoute(routes: any[]) {
		return (
			<>
				{routes?.map(item => (
					<Route
						path={item.path}
						element={item.name === "login" || item.name === "404" ? <item.component /> : <Auth>{lazyLoad(item.component)}</Auth>}
						key={item.name}
					>
						{item.children && getRoute(item.children)}
					</Route>
				))}
			</>
		);
	}

	return (
		<Router>
			<AliveScope>
				<Suspense fallback={<Loading />}>
					<Routes>{getRoute(routes)}</Routes>
				</Suspense>
			</AliveScope>
		</Router>
	);
}

export default RouterConfig;
