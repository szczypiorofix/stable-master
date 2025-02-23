import { routes } from '../constants';
import { AppView } from '../enums';
import { Route } from '../models';

export function getAllRoutesAsList(): Route[] {
    return Object.entries(routes).map(([, route]) => route);
}

export function getRoute(view: AppView): Route {
    return routes[view];
}
