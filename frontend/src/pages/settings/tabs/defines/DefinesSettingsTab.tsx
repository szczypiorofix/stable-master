import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { CustomAccordion } from '../../../../components/accordion/CustomAccordion.tsx';
import { BaseDialog } from '../../../../components/dialog/BaseDialog.tsx';
import { getBaseUrl } from '../../../../config/Environment.config.ts';

import { DictionaryEditor } from './DictionaryEditor';

const apiUrl = getBaseUrl();

interface DictionaryEntry {
    id: number;
    label: string;
    isSystem: boolean;
    category: string;
}

export function DefinesSettingsTab() {
    const [coatColors, setCoatColors] = useState<DictionaryEntry[]>([]);
    const [horseBreeds, setHorseBreeds] = useState<DictionaryEntry[]>([]);
    const [feedTypes, setFeedTypes] = useState<DictionaryEntry[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmDeleteEntryId, setConfirmDeleteEntryId] = useState(0);

    const getAuthHeaders = () => {
        // const token = localStorage.getItem('jwt_token');
        return {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
        };
    };

    const fetchDictionaryCategory = async (category: string): Promise<DictionaryEntry[]> => {
        const response = await fetch(`${apiUrl}/dictionary?category=${category}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`An error occurred while fetching dictionaries (${category}).`);
        }

        return (await response.json()) as DictionaryEntry[];
    };

    const fetchAllDictionaries = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [coats, breeds, feedTypes] = await Promise.all([
                fetchDictionaryCategory('HORSE_COAT'),
                fetchDictionaryCategory('HORSE_BREED'),
                fetchDictionaryCategory('FEED_TYPE'),
            ]);

            setCoatColors(coats);
            setHorseBreeds(breeds);
            setFeedTypes(feedTypes);
        } catch (err) {
            console.error(err);
            setError('Cannot load dictionaries data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetchAllDictionaries();
    }, []);

    const handleAddEntry = async (category: string, label: string) => {
        try {
            const response = await fetch(`${apiUrl}/dictionary`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ label, category }),
            });

            if (!response.ok) throw new Error(`An error occurred while adding to ${category}`);

            await fetchAllDictionaries();
        } catch (err) {
            console.error(err);
            alert('Cannot add dictionary entry.');
        }
    };

    const handleDeleteEntry = async () => {
        if (confirmDeleteEntryId <= 0) {
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/dictionary/${confirmDeleteEntryId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData: Error = (await response
                    .json()
                    .then()
                    .catch((err) => console.error(err))) as Error;
                alert(errorData.message || 'Cannot delete dictionary entry.');
                return;
            }

            await fetchAllDictionaries();
        } catch (err) {
            console.error(err);
            alert('Cannot delete dictionary entry.');
        }
    };

    if (isLoading && (coatColors.length === 0 || horseBreeds.length === 0)) {
        return <Box sx={{ p: 3 }}>Loading data...</Box>;
    }

    if (error) {
        return <Box sx={{ p: 3, color: 'red' }}>{error}</Box>;
    }

    const handleConfirmDelete = () => {
        handleDeleteEntry()
            .then(() => console.log('Removing entry finished'))
            .catch((err) => console.error(err));
    };

    const showDeleteEntryDialog = () => {
        return (
            <BaseDialog
                open={confirmDeleteEntryId > 0}
                onClose={() => setConfirmDeleteEntryId(0)}
                title='Confirming'
                maxWidth='xs'
                actions={
                    <>
                        <Button onClick={() => setConfirmDeleteEntryId(0)}>No</Button>
                        <Button variant='contained' color='error' onClick={handleConfirmDelete}>
                            Yes, delete
                        </Button>
                    </>
                }
            >
                <Typography color='error'>Are you sure you want to delete this horse data?</Typography>
            </BaseDialog>
        );
    };

    return (
        <Box sx={{ pt: 2, pb: 2 }}>
            {confirmDeleteEntryId > 0 && showDeleteEntryDialog()}
            <Typography variant='h4'>Defined features</Typography>
            <Box sx={{ pt: 2, pb: 2 }}>
                <CustomAccordion index={0} title={'Horse coat'}>
                    <DictionaryEditor
                        items={coatColors}
                        onAdd={(label: string) => {
                            handleAddEntry('HORSE_COAT', label)
                                .then(() => console.log('Handle entry end'))
                                .catch((err) => console.error(err));
                        }}
                        onDelete={(id: number) => setConfirmDeleteEntryId(id)}
                    />
                </CustomAccordion>
                <CustomAccordion index={1} title={'Horse breed'}>
                    <DictionaryEditor
                        items={horseBreeds}
                        onAdd={(label: string) => {
                            handleAddEntry('HORSE_BREED', label)
                                .then(() => console.log('Handle entry end'))
                                .catch((err) => console.error(err));
                        }}
                        onDelete={(id: number) => setConfirmDeleteEntryId(id)}
                    />
                </CustomAccordion>
                <CustomAccordion index={1} title={'Feed types'}>
                    <DictionaryEditor
                        items={feedTypes}
                        onAdd={(label: string) => {
                            handleAddEntry('FEED_TYPE', label)
                                .then(() => console.log('Handle entry end'))
                                .catch((err) => console.error(err));
                        }}
                        onDelete={(id: number) => setConfirmDeleteEntryId(id)}
                    />
                </CustomAccordion>
            </Box>
        </Box>
    );
}
