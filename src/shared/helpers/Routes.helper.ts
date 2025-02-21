import { routes } from '../constants';
import { Route } from '../models';
import { AppView } from '../enums';

export function getAllRoutesAsList(): Route[] {
    return Object.entries(routes).map(([, route]) => route);
}

export function getRoute(view: AppView): Route {
    return routes[view];
}
