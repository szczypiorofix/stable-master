import {
    BedroomBaby,
    CalendarMonth,
    Home as HomeIcon,
    VerticalShades,
} from '@mui/icons-material';

import { Home, Horses, Schedules, Stalls } from '../../pages';
import { AppView } from '../enums';
import { Route } from '../models';

export const routes: Record<AppView, Route> = {
    [AppView.HOME]: {
        name: 'Home',
        view: AppView.HOME,
        page: <Home />,
        icon: <HomeIcon />,
    },
    [AppView.HORSES]: {
        name: 'Horses',
        view: AppView.HORSES,
        page: <Horses />,
        icon: <BedroomBaby />,
    },
    [AppView.STALLS]: {
        name: 'Stalls',
        view: AppView.STALLS,
        page: <Stalls />,
        icon: <VerticalShades />,
    },
    [AppView.SCHEDULES]: {
        name: 'Schedules',
        view: AppView.SCHEDULES,
        page: <Schedules />,
        icon: <CalendarMonth />,
    },
};
