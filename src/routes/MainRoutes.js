import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddCategoriePage from 'views/add-category-page/index';
import ConsulterHistoriques from 'views/consulter-historique-page/Index';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/import-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'import-page',
      element: <SamplePage />
    },
    {
      path: 'add-category-page',
      element: <AddCategoriePage />
    },
    {
      path: 'consulter-historiques-page',
      element: <ConsulterHistoriques />
    }
  ]
};

export default MainRoutes;
