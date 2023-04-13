import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Edit, { action as editAction } from './routes/edit';
import {
  loader as contactsLoader,
  action as addNewAction,
} from './components/Left';
import ContactRoute, {
  loader as singleContactLoader,
  starAction,
  destroyAction,
} from './routes/contactRoute';
import ErrorPage from './routes/errorPage';
import IndexRoute from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: contactsLoader,
    action: addNewAction, // this action go to other url, so Form
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <IndexRoute />,
          },
          {
            path: 'contact/:contactId',
            element: <ContactRoute />,
            // errorElement: <div>Can't find this contact member</div>,
            loader: singleContactLoader,
            action: starAction, // this action stay in this URL, so fetcher.Form
          },
          {
            path: 'contact/:contactId/edit',
            element: <Edit />,
            errorElement: (
              <div>Can't find this contact member for editting</div>
            ),
            action: editAction, // this action go to other url, so Form
            loader: singleContactLoader,
          },
          {
            path: 'contact/:contactId/destroy',
            errorElement: (
              <div>Can't find this contact member for deleting</div>
            ),
            action: destroyAction, // this action go to other url, so Form
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
