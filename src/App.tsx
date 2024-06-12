import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Index from './routes';
import Price from './routes/price';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "prices/:priceId",
        element: <Price />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
