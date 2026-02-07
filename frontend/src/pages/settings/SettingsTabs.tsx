import { CustomTabItem, CustomTabs } from '../../components/tabs/CustomTabs.tsx';

export function SettingsTabs() {
    const items: Array<CustomTabItem> = [
        {
            title: 'Item one',
            content: <p>ITEM ONE</p>,
        },
        {
            title: 'Item two',
            content: <p>ITEM TWO</p>,
        },
        {
            title: 'Item three',
            content: <p>ITEM THREE</p>,
        },
    ];
    return <CustomTabs title={'Settings'} items={items} />;
}
