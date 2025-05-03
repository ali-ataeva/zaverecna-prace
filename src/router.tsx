import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HealthProvider } from './contexts/HealthContext';
import RootLayout from './RootLayout';
import Home from './pages/Home';
import Food from './pages/Food';
import Liquid from './pages/Liquid';
import Sport from './pages/Sport';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HealthProvider>
        <RootLayout />
      </HealthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'food',
        element: <Food />,
      },
      {
        path: 'liquid',
        element: <Liquid />,
      },
      {
        path: 'sport',
        element: <Sport />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;