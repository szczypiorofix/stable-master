import {
    BedroomBaby as BedroomBabyIcon,
    CalendarMonth as CalendarMonthIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    VerticalShades as VerticalShadesIcon,
} from '@mui/icons-material';

import { Home, Horses, Schedules, Settings, Stalls } from '../../pages';
import { Staff } from '../../pages/staff/Staff.tsx';
import { APP_VIEW } from '../enums';
import { Route } from '../models';

export const routes: Record<APP_VIEW, Route> = {
    [APP_VIEW.HOME]: {
        name: 'Home',
        view: APP_VIEW.HOME,
        page: <Home />,
        icon: <HomeIcon />,
    },
    [APP_VIEW.HORSES]: {
        name: 'Horses',
        view: APP_VIEW.HORSES,
        page: <Horses />,
        icon: <BedroomBabyIcon />,
    },
    [APP_VIEW.STAFF]: {
        name: 'Staff',
        view: APP_VIEW.STAFF,
        page: <Staff />,
        icon: <PeopleIcon />,
    },
    [APP_VIEW.STALLS]: {
        name: 'Stalls',
        view: APP_VIEW.STALLS,
        page: <Stalls />,
        icon: <VerticalShadesIcon />,
    },
    [APP_VIEW.SCHEDULES]: {
        name: 'Schedules',
        view: APP_VIEW.SCHEDULES,
        page: <Schedules />,
        icon: <CalendarMonthIcon />,
    },
    [APP_VIEW.SETTINGS]: {
        name: 'Settings',
        view: APP_VIEW.SETTINGS,
        page: <Settings />,
        icon: <SettingsIcon />,
    },
};
