import { CustomTabs } from '../../components/tabs/CustomTabs.tsx';
import { CustomTabItem } from '../../components/tabs/CustomTabs.types.ts';

export function SettingsTabs() {
    const items: Array<CustomTabItem> = [
        {
            title: 'Item one',
            content: <p>ITEM ONE CONTENT</p>,
        },
        {
            title: 'Item two',
            content: <p>ITEM TWO CONTENT</p>,
        },
        {
            title: 'Item three',
            content: <p>ITEM THREE CONTENT</p>,
        },
    ];
    return <CustomTabs title={'Settings'} items={items} />;
}
