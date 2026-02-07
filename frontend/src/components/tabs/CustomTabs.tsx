import React, { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { CustomTabsProps } from './CustomTabs.types.ts';
import { Typography } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            style={{ color: 'black' }}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function CustomTabs(props: CustomTabsProps) {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ width: '100%', backgroundColor: 'white' }}>
            {props.title && <Typography>{props.title}</Typography>}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label='basic tabs example'>
                    {props.items.map((item, index) => (
                        <Tab
                            key={'tab' + index}
                            label={item.title}
                            id={`simple-tab-${index}`}
                            aria-controls={`simple-tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>
            {props.items.map((item, index) => (
                <CustomTabPanel key={'tabcontent' + index} value={currentTab} index={index}>
                    {item.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
