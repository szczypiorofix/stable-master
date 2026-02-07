import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { DictionaryEditor } from './DictionaryEditor';
import { DATA_SOURCE, getEnvironmentDetails } from '../../../../config/Environment.config.ts';

const apiUrl = getEnvironmentDetails(DATA_SOURCE.LOCALHOST).url;
// Adres Twojego backendu (w przyszłości warto przenieść do pliku .env)
const API_URL = 'apiUrl/dictionary';

// Typ danych zgodny z tym co zwraca backend
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

    // Pomocnicza funkcja do pobierania tokena (zakładam, że trzymasz go w localStorage)
    const getAuthHeaders = () => {
        const token = localStorage.getItem('jwt_token'); // Sprawdź czy tak nazywasz klucz
        return {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`, // Odkomentuj, gdy już zepniesz logowanie
        };
    };

    // 1. Pobieranie danych (GET)
    const fetchCoats = async () => {
        setIsLoading(true);
        try {
            // Pamiętaj o parametrze ?category=HORSE_COAT
            const response = await fetch(`${API_URL}/dictionary?category=HORSE_COAT`, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            if (!response.ok) throw new Error('Błąd pobierania danych');

            const data = await response.json();
            setCoatColors(data);
        } catch (err) {
            console.error(err);
            setError('Nie udało się pobrać listy maści.');
        } finally {
            setIsLoading(false);
        }
    };

    // Pobierz dane przy pierwszym renderze
    useEffect(() => {
        fetchCoats();
    }, []);

    // 2. Dodawanie wpisu (POST)
    const handleAddCoat = async (label: string) => {
        try {
            const response = await fetch(`${API_URL}/dictionary`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    label: label,
                    category: 'HORSE_COAT', // Ważne: musimy wysłać kategorię
                }),
            });

            if (!response.ok) throw new Error('Błąd zapisu');

            // Po udanym dodaniu odświeżamy listę
            await fetchCoats();
        } catch (err) {
            console.error(err);
            alert('Nie udało się dodać maści');
        }
    };

    // 3. Usuwanie wpisu (DELETE)
    const handleDeleteCoat = async (id: number) => {
        if (!window.confirm('Czy na pewno chcesz usunąć tę pozycję?')) return;

        try {
            const response = await fetch(`${API_URL}/dictionary/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                // Obsługa błędu np. gdy próbujesz usunąć systemowy (choć UI to blokuje)
                const errorData = await response.json();
                alert(errorData.message || 'Błąd usuwania');
                return;
            }

            // Po udanym usunięciu odświeżamy listę
            await fetchCoats();
        } catch (err) {
            console.error(err);
            alert('Nie udało się usunąć maści');
        }
    };

    if (isLoading && coatColors.length === 0) {
        return <Box sx={{ p: 3 }}>Ładowanie danych...</Box>;
    }

    if (error) {
        return <Box sx={{ p: 3, color: 'red' }}>{error}</Box>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <DictionaryEditor
                title='Maści koni (Horse Coats)'
                items={coatColors}
                onAdd={handleAddCoat}
                onDelete={handleDeleteCoat}
            />

            {/* Tutaj możesz dodać kolejne DictionaryEditor dla innych kategorii, np. Rasy */}
            {/* <Box sx={{ mt: 4 }}>
                <DictionaryEditor 
                    title="Rasy koni" 
                    items={breeds} 
                    onAdd={handleAddBreed} ... 
                />
            </Box> */}
        </Box>
    );
}
