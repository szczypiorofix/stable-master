import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { DATA_SOURCE, getEnvironmentDetails } from '../../../../config/Environment.config.ts';

import { DictionaryEditor } from './DictionaryEditor';

const apiUrl = getEnvironmentDetails(DATA_SOURCE.LOCALHOST).url;

interface DictionaryEntry {
    id: number;
    label: string;
    isSystem: boolean;
    category: string;
}

export function DefinesSettingsTab() {
    const [coatColors, setCoatColors] = useState<DictionaryEntry[]>([]);
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

    useEffect(() => {
        fetchCoats();
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

    if (isLoading && coatColors.length === 0) {
        return <Box sx={{ p: 3 }}>Loading data...</Box>;
    }

    if (error) {
        return <Box sx={{ p: 3, color: 'red' }}>{error}</Box>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <DictionaryEditor
                title='Horse Coats'
                items={coatColors}
                onAdd={handleAddCoat}
                onDelete={handleDeleteCoat}
            />
        </Box>
    );
}
