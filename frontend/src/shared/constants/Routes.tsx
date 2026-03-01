import {
    BedroomBaby as BedroomBabyIcon,
    CalendarMonth as CalendarMonthIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    VerticalShades as VerticalShadesIcon,
} from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import { Home, Horses, Schedules, Settings, Staff, Stalls } from '../../pages';
import { Logout } from '../../pages/logout/Logout.tsx';
import { APP_VIEW } from '../enums';
import { RouteModel } from '../models';

export const routes: Record<APP_VIEW, RouteModel> = {
    [APP_VIEW.LOGIN]: {
        name: 'Home',
        view: APP_VIEW.LOGIN,
        page: <Home />,
        icon: <LoginIcon />,
        visibleInSidebar: false,
    },
    [APP_VIEW.HOME]: {
        name: 'Home',
        view: APP_VIEW.HOME,
        page: <Home />,
        icon: <HomeIcon />,
        visibleInSidebar: true,
    },
    [APP_VIEW.HORSES]: {
        name: 'Horses',
        view: APP_VIEW.HORSES,
        page: <Horses />,
        icon: <BedroomBabyIcon />,
        visibleInSidebar: true,
    },
    [APP_VIEW.STAFF]: {
        name: 'Staff',
        view: APP_VIEW.STAFF,
        page: <Staff />,
        icon: <PeopleIcon />,
        visibleInSidebar: true,
    },
    [APP_VIEW.SCHEDULES]: {
        name: 'Schedules',
        view: APP_VIEW.SCHEDULES,
        page: <Schedules />,
        icon: <CalendarMonthIcon />,
        visibleInSidebar: true,
    },
    [APP_VIEW.STALLS]: {
        name: 'Stalls',
        view: APP_VIEW.STALLS,
        page: <Stalls />,
        icon: <VerticalShadesIcon />,
        visibleInSidebar: true,
    },
    [APP_VIEW.SETTINGS]: {
        name: 'Settings',
        view: APP_VIEW.SETTINGS,
        page: <Settings />,
        icon: <SettingsIcon />,
        visibleInSidebar: true,
    },
    [APP_VIEW.LOGOUT]: {
        name: 'Logout',
        view: APP_VIEW.LOGOUT,
        page: <Logout />,
        icon: <LogoutIcon />,
        visibleInSidebar: true,
    },
};
