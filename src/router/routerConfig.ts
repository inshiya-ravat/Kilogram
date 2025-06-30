import Chats from "../compoenents/Pages/Chats/Chats";
import Explore from "../compoenents/Pages/Explore/Explore";
import Home from "../compoenents/Pages/Home/Home";
import Login from "../compoenents/Pages/Login/Login";
import MainLayout from "../compoenents/Pages/MainLayout/MainLayout";
import Profile from "../compoenents/Pages/Profile/Profile";
import Reel from "../compoenents/Pages/Reels/Reel";
import Register from "../compoenents/Pages/Register/Register";
import Settings from "../compoenents/Pages/Settings/Settings";

export interface RouteConfig{
    path: string,
    element: React.FC,
    children?: RouteConfig[],
    isAuth?: boolean,
    index?: boolean,
}
export const routes: RouteConfig[] = [
    {
        path: '/',
        element: MainLayout,
        children: [
            {
                path: '',
                element: Home,
                index:true,
                isAuth: true,
            },
            {
                path: 'chat',
                element: Chats,
                isAuth: true,
            },
            {
                path: 'explore',
                element: Explore,
                isAuth: true,
            },
            {
                path: 'reel',
                element: Reel,
                isAuth: true,
            },
            {
                path: 'profile',
                element: Profile,
                isAuth: true,
            },
            {
                path: 'settings',
                element: Settings,
                isAuth: true,
            }
        ]
    },
    {
        path: 'login',
        element: Login
    },
    {
        path: 'register',
        element: Register
    }
]