import { JSX } from 'react';

import { CustomTabs } from '../../../../components/tabs/CustomTabs.tsx';
import { CustomTabItem } from '../../../../components/tabs/CustomTabs.types.ts';

import { DictionaryEditor } from './DictionaryEditor.tsx';

export function DefinesSettingsTab(): JSX.Element {
    const coatColors = [
        { id: 1, label: 'Gniada', isSystem: true },
        { id: 2, label: 'Siwa', isSystem: true },
        { id: 3, label: 'Tarantowata (Moja)', isSystem: false },
    ];

    const handleAddCoat = (label: string) => {
        console.log('API Call: create coat', label);
        // mutation.mutate({ category: 'HORSE_COAT', label })
    };

    const handleDeleteCoat = (id: number) => {
        console.log('API Call: delete coat', id);
    };

    const items: CustomTabItem[] = [
        {
            title: 'Horse coat',
            content: (
                <DictionaryEditor
                    title='Defined coats'
                    items={coatColors}
                    onAdd={handleAddCoat}
                    onDelete={handleDeleteCoat}
                />
            ),
        },
        {
            title: 'Horse breed',
            content: <p>Tu użyjesz tego samego komponentu DictionaryEditor dla innej kategorii</p>,
        },
    ];
    return (
        <div>
            <h1>Defines settings</h1>
            <CustomTabs title='Dictionaries' items={items} />
        </div>
    );
}
