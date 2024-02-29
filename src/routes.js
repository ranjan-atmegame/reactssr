// // import HomePage from './pages/HomePage.js';
// // import CategoryPage from './pages/CategoryPage.js';
// // import GamePage from './pages/gamePage.js';

// import React from 'react';
// const HomePage = () => import(/* webpackChunkName: "homePage" */ './pages/HomePage.js');
// const CategoryPage = () => import(/* webpackChunkName: "CategoryPage" */ './pages/CategoryPage.js');
// const GamePage = () => import(/* webpackChunkName: "gamePage" */ './pages/gamePage.js');

// // const routes = [
// //     {
// //         path: "/",
// //         element: HomePage,
// //         fetchData: HomePage.fetchData
// //     },
// //     {
// //         path: "/online/:category/games",
// //         element: CategoryPage,
// //         fetchData: CategoryPage.fetchData
// //     },
// //     {
// //         path: "/games/:name",
// //         element: GamePage,
// //         fetchData: GamePage.fetchData
// //     },
// // ];


// const routes = [
//     {
//         path: "/",
//         element: async () => {
//             // Wait for the component to be imported and then execute it
//             const component = await HomePage();
//             return <component.default />;
//         },
//         fetchData: async () => {
//             // Assuming fetchData is an async function defined in the component
//             const data = await HomePage().then(module => module.fetchData());
//             return data;
//         }
//     },
//     {
//         path: "/online/:category/games",
//         element: async () => {
//             const component = await CategoryPage();
//             return <component.default />;
//         },
//         fetchData: async () => {
//             const data = await CategoryPage().then(module => module.fetchData());
//             return data;
//         }
//     },
//     {
//         path: "/games/:name",
//         element: async () => {
//             const component = await GamePage();
//             return <component.default />;
//         },
//         fetchData: async () => {
//             const data = await GamePage().then(module => module.fetchData());
//             return data;
//         }
//     },
// ];

// export default routes;


import React from 'react';

const routes = [
    {
        path: "/",
        element: async () => {
            const { default: HomePage, fetchData } = await import(/* webpackChunkName: "homePage" */ './pages/HomePage');
            // const data = await fetchData();
            return <HomePage />;
        }
    },
    {
        path: "/online/:category/games",
        element: async () => {
            const { default: CategoryPage, fetchData } = await import(/* webpackChunkName: "categoryPage" */ './pages/CategoryPage');
            // const data = await fetchData();
            return <CategoryPage />;
        }
    },
    {
        path: "/games/:name",
        element: async () => {
            const { default: GamePage, fetchData } = await import(/* webpackChunkName: "gamePage" */ './pages/GamePage');
            // const data = await fetchData();
            return <GamePage />;
        }
    },
];

export default routes;
