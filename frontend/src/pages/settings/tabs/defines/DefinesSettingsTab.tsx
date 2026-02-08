import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { CustomAccordion } from '../../../../components/accordion/CustomAccordion.tsx';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getAuthHeaders = () => {
        // const token = localStorage.getItem('jwt_token');
        return {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
        };
    };

    const fetchCoats = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/dictionary?category=HORSE_COAT`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) throw new Error('An error occurred while fetching dictionaries (coats).');

            const data = (await response.json()) as DictionaryEntry[];
            setCoatColors(data);
        } catch (err) {
            console.error(err);
            setError('Cannot get horse coats dictionary');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBreeds = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/dictionary?category=HORSE_BREED`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) throw new Error('An error occurred while fetching dictionaries (breeds).');

            const data = (await response.json()) as DictionaryEntry[];
            setHorseBreeds(data);
        } catch (err) {
            console.error(err);
            setError('Cannot get horse breeds dictionary');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCoats();
        fetchBreeds();
    }, []);

    const handleAddCoat = async (label: string) => {
        try {
            const response = await fetch(`${apiUrl}/dictionary`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    label: label,
                    category: 'HORSE_COAT',
                }),
            });

            if (!response.ok) throw new Error('An error occurred while adding dictionary');

            await fetchCoats();
        } catch (err) {
            console.error(err);
            alert('Cannot add horse coats dictionary');
        }
    };

    const handleDeleteCoat = async (id: number) => {
        if (!window.confirm('Are you sure you want to remove this entry?')) return;

        try {
            const response = await fetch(`${apiUrl}/dictionary/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = (await response.json()) as Error;
                alert(errorData.message || 'Error while removing dictionary entry');
                return;
            }

            await fetchCoats();
        } catch (err) {
            console.error(err);
            alert('Cannot remove dictionary (coats), id=' + id);
        }
    };

    const handleAddBreed = async (label: string) => {
        try {
            const response = await fetch(`${apiUrl}/dictionary`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    label: label,
                    category: 'HORSE_BREED',
                }),
            });

            if (!response.ok) throw new Error('An error occurred while adding dictionary');

            await fetchCoats();
        } catch (err) {
            console.error(err);
            alert('Cannot add horse coats dictionary');
        }
    };

    const handleDeleteBreed = async (id: number) => {
        if (!window.confirm('Are you sure you want to remove this entry?')) return;

        try {
            const response = await fetch(`${apiUrl}/dictionary/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = (await response.json()) as Error;
                alert(errorData.message || 'Error while removing dictionary entry');
                return;
            }

            await fetchCoats();
        } catch (err) {
            console.error(err);
            alert('Cannot remove dictionary (breed), id=' + id);
        }
    };

    if (isLoading && (coatColors.length === 0 || horseBreeds.length === 0)) {
        return <Box sx={{ p: 3 }}>Loading data...</Box>;
    }

    if (error) {
        return <Box sx={{ p: 3, color: 'red' }}>{error}</Box>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography component='h2'>Defined features</Typography>
            <Box sx={{ pt: 2, pb: 2 }}>
                <CustomAccordion index={0} title={'Horse coat'}>
                    <DictionaryEditor items={coatColors} onAdd={handleAddCoat} onDelete={handleDeleteCoat} />
                </CustomAccordion>
                <CustomAccordion index={1} title={'Horse breed'}>
                    <DictionaryEditor items={horseBreeds} onAdd={handleAddBreed} onDelete={handleDeleteBreed} />
                </CustomAccordion>
            </Box>
        </Box>
    );
}
