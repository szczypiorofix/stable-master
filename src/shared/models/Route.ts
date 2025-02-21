import { JSX } from 'react';
import { AppView } from '../enums';

export interface Route {
    name: string;
    view: AppView;
    page: JSX.Element;
    icon: JSX.Element;
}
