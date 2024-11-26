import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom' ;
import App from './App.tsx';
import Login from './pages/Login.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import CreateUser from './pages/CreateUser.tsx';
import HomePage from './pages/HomePage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/create-user',
                element: <CreateUser />

            }

        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}