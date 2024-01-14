import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import { lazy, Suspense } from 'react';
import routes from './routes';
import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import Loading from '@/components/Loading';

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
  const Components = lazyWithRetries(path);
  return (
    <Suspense fallback={<Loading />}>
      <Components />
    </Suspense>
  );
}

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      ...routes.map((route) => ({
        ...route,
        path: route.path,
        element: pathToLazyComponent(route.filepath),
      })),
    ],
  },
]);

export default router;
