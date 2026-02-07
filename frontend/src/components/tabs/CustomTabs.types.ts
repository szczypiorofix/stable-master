import React from 'react';

export interface CustomTabItem {
    title: string;
    content: React.ReactNode;
}

export interface CustomTabsProps extends React.PropsWithChildren {
    title: string;
    items: Array<CustomTabItem>;
}
