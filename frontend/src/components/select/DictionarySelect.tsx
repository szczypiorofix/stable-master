import { useEffect, useState } from 'react';
import {
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import { getBaseUrl } from '../../config/Environment.config.ts';
import { getAuthHeaders } from '../../shared/helpers';
import { DictionaryEntry } from '../../shared/models';

interface DictionarySelectProps {
    category: string;
    label: string;
    value: string;
    name: string;
    onChange: (event: SelectChangeEvent) => void;
    required?: boolean;
    disabled?: boolean;
}

export function DictionarySelect({
    category,
    label,
    value,
    name,
    onChange,
    required = false,
    disabled = false,
}: DictionarySelectProps) {
    const [options, setOptions] = useState<DictionaryEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const apiUrl = getBaseUrl();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        const authHeaders = getAuthHeaders();
        const options = {
            method: 'GET',
            headers: authHeaders,
        };
        fetch(`${apiUrl}/dictionary?category=${category}`, options)
            .then(async (res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return (await res.json()) as unknown;
            })
            .then((data) => {
                if (isMounted) {
                    if (Array.isArray(data)) {
                        setOptions(data);
                    }
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(`Error fetching dictionary for ${category}:`, err);
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [category]);

    return (
        <FormControl fullWidth margin='dense' error={error} disabled={disabled || loading}>
            <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-select-label`}
                id={`${name}-select`}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
                required={required}
                endAdornment={loading ? <CircularProgress size={20} sx={{ mr: 2 }} /> : null}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                        {option.label}
                    </MenuItem>
                ))}

                {value && !loading && !options.find((c) => c.label === value) && (
                    <MenuItem value={value}>{value}</MenuItem>
                )}
            </Select>
            {error && <FormHelperText>Cannot retrieve list data.</FormHelperText>}
        </FormControl>
    );
}
