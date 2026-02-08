import { routes } from '../constants';
import { APP_VIEW } from '../enums';
import { RouteModel } from '../models';

export function getAllRoutesAsList(): RouteModel[] {
    return Object.entries(routes).map(([, route]) => route);
}

export function getRoute(view: APP_VIEW): RouteModel {
    return routes[view];
}
