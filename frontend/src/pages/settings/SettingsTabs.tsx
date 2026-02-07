import { CustomTabs } from '../../components/tabs/CustomTabs.tsx';
import { CustomTabItem } from '../../components/tabs/CustomTabs.types.ts';

import { DefinesSettingsTab } from './tabs/DefinesSettingsTab.tsx';
import { MainSettingsTab } from './tabs/MainSettingsTab.tsx';
import { OtherSettingsTab } from './tabs/OtherSettingsTab.tsx';

export function SettingsTabs() {
    const items: Array<CustomTabItem> = [
        {
            title: 'Main settings',
            content: <MainSettingsTab />,
        },
        {
            title: 'Defines',
            content: <DefinesSettingsTab />,
        },
        {
            title: 'Other settings',
            content: <OtherSettingsTab />,
        },
    ];
    return <CustomTabs title={'Settings'} items={items} />;
}
