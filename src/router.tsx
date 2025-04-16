import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './pages/Home';
import Food from './pages/Food';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'food',
        element: <Food />,
      }
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;