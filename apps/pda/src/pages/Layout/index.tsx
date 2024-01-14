import { useTranslation } from "react-i18next";
import routes from "@/router/routes";
import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "react-vant";
import { TOKEN, getStorage } from "utils";

export default function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = useMemo(() => {
    const isHome = location.pathname === "/";
    const title = isHome
      ? t("WMS仓储管理系统")
      : routes.find((route) => route.path == location.pathname)?.label;
    return {
      isHome,
      title,
    };
  }, [location.pathname]);
  const token = getStorage(TOKEN);
  useEffect(() => {
    if (token) {
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="app-layout h-full">
      <NavBar title={title} onClickLeft={() => navigate("/")} />
      <main className="h-[calc(100vh-46px)] p-2 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
