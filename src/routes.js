const routes = [
    {
        path: "/",
        element: () => import('./pages/HomePage'),
    },
    {
        path: "/online/:category/games",
        element: () => import('./pages/CategoryPage'),
    },
    {
        path: "/games/:name",
        element: () => import('./pages/GamePage'),
    },
];

export default routes;