import {
    routerEmployeesSubNavigationButtons,
    routerProjectsSubNavigationButtons,
} from './router-sub-navigation-buttons.const';

export const routerRoutes = [
    {
        caption: 'Соревнования',
        routerLink: '/contests',
        routerSubNavigation: [],
        navigationButtons: routerEmployeesSubNavigationButtons,
    },
    {
        caption: 'Проекты',
        routerLink: '/projects',
        routerSubNavigation: [],
        navigationButtons: routerProjectsSubNavigationButtons,
    },
];
