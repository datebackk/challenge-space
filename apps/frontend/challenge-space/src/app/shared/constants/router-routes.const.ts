import {
    routerContestsSubNavigationButtons,
    routerProjectsSubNavigationButtons,
} from './router-sub-navigation-buttons.const';

export const routerRoutes = [
    {
        caption: 'Соревнования',
        routerLink: '',
        routerSubNavigation: [],
        navigationButtons: routerContestsSubNavigationButtons,
    },
    {
        caption: 'Проекты',
        routerLink: '/projects',
        routerSubNavigation: [],
        navigationButtons: routerProjectsSubNavigationButtons,
    },
];
