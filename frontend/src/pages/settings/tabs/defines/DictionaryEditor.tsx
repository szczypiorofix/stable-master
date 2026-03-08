import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import {
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';

interface DictionaryEntry {
    id: number;
    label: string;
    is_system: boolean;
}

interface DictionaryEditorProps {
    title?: string;
    items: DictionaryEntry[];
    onAdd: (label: string) => void;
    onDelete: (id: number) => void;
}

export function DictionaryEditor({ title, items, onAdd, onDelete }: DictionaryEditorProps) {
    const [newValue, setNewValue] = useState('');

    const handleAdd = () => {
        if (newValue.trim()) {
            onAdd(newValue);
            setNewValue('');
        }
    };

    return (
        <Box sx={{ maxWidth: 600 }}>
            {title && (
                <Typography variant='h6' gutterBottom>
                    {title}
                </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                    label='New value'
                    size='small'
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    fullWidth
                />
                <Button variant='contained' startIcon={<AddIcon />} onClick={handleAdd}>
                    Add
                </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List dense sx={{ bgcolor: 'background.paper' }}>
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        secondaryAction={
                            item.is_system ? (
                                <LockIcon color='disabled' fontSize='small' />
                            ) : (
                                <IconButton edge='end' aria-label='delete' onClick={() => onDelete(item.id)}>
                                    <DeleteIcon color='error' />
                                </IconButton>
                            )
                        }
                    >
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                color: item.is_system ? 'text.secondary' : 'text.primary',
                                fontWeight: item.is_system ? 'normal' : 'medium',
                            }}
                        />
                        {item.is_system && (
                            <Chip
                                label='System'
                                size='small'
                                variant='outlined'
                                sx={{ mr: 2, height: 20, fontSize: '0.7rem', userSelect: 'none' }}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
