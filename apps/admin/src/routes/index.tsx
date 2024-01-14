import { Alert, Button, Result, Spin } from 'antd';
import { Layout, OutletLayoutRouter } from 'components';
import { useAppDispatch } from 'hooks';
import { lazy, Suspense, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { setCurrentUser } from 'store';
import { getStorage, TOKEN } from 'utils';
import { GetLoginUserPermission } from 'apis';
import Dashboard from '@/pages/dashboard';
import ErrorPage from '@/pages/error-page';
import Login from '@/pages/login';
import { DashboardOutlined } from '@ant-design/icons';

import type { MenuItem } from 'components';
const Permissions = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const token = getStorage(TOKEN);

  useEffect(() => {
    GetLoginUserPermission().then((res) => {
      dispatch(setCurrentUser(res.resultData));
    });
  }, []);

  return token ? children : <Navigate to="/login" />;
};

export const baseRouterList = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    path: 'dashboard',
    icon: <DashboardOutlined />,
    filepath: 'pages/dashboard/index.tsx',
  },
];

export const defaultRoutes: any = [
  {
    path: '/',
    element: <Permissions>{<Layout />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/*',
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={'/'}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </ErrorPage>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
export const modules = import.meta.glob('../pages/**/*.tsx');

export const lazyWithRetries: typeof lazy = (importer) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error: any) {
      // retry 5 times with 2 second delay and backoff factor of 2 (2, 4, 8, 16, 32 seconds)
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** i));
        // this assumes that the exception will contain this specific text with the url of the module
        // if not, the url will not be able to parse and we'll get an error on that
        // eg. "Failed to fetch dynamically imported module: https://example.com/assets/Home.tsx"
        const url = new URL(
          error.message
            .replace("Failed to fetch dynamically imported module: ", "")
            .trim()
        );
        // add a timestamp to the url to force a reload the module (and not use the cached version - cache busting)
        url.searchParams.set("t", `${+new Date()}`);

        try {
          return await import(/* @vite-ignore */url.href);
        } catch (e) {
          console.log("retrying import");
        }
      }
      throw error;
    }
  };
  return lazy(retryImport);
};

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any;
  if (!path)
    return (
      <ErrorPage>
        <Alert
          message={Ele + ':Cannot find the path, please configure the correct folder path'}
          type="error"
        />
      </ErrorPage>
    );
  const Components = lazyWithRetries(path);
  return (    
    <Suspense fallback={<Spin size="small" />}>
      <Components />
    </Suspense>
  );
}
export const filepathToElement = (list: MenuItem[]) =>
  list.map((item) => {
    if (item.children) {
      return {
        path: item.path,
        key: item.key,
        children: item.children?.map((c) => ({
          key: c.key,
          path: c.path,
          element: pathToLazyComponent(c.filepath),
        })),
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        key: item.key,
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
