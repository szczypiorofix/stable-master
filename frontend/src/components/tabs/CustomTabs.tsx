import React, { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export interface CustomTabItem {
    title: string;
    content: React.ReactNode;
}

export interface CustomTabsProps extends React.PropsWithChildren {
    title: string;
    items: Array<CustomTabItem>;
}

export function CustomTabs(props: CustomTabsProps) {
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', backgroundColor: 'white' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    {props.items.map((item, index) => (
                        <Tab key={'tab' + index} label={item.title} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {props.items.map((item, index) => (
                <CustomTabPanel key={'tabcontent' + index} value={value} index={index}>
                    {item.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
