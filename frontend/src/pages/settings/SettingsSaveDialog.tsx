import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { CustomButton } from '../../components/button/CustomButton';
import { BaseDialog } from '../../components/dialog/BaseDialog';

export function SettingsSaveDialog() {
    // Open modal state
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // --- EXAMPLE 1: modal for editing data ---
    const handleSave = () => {
        console.log('Saving...');
        setIsEditOpen(false);
    };

    // --- EXAMPLE 2: Confirm delete modal ---
    const handleConfirmDelete = () => {
        console.log('Remove...');
        setIsDeleteOpen(false);
    };

    return (
        <div>
            <CustomButton onClick={() => setIsEditOpen(true)}>Edit horse data</CustomButton>

            <CustomButton color='error' onClick={() => setIsDeleteOpen(true)} sx={{ ml: 2 }}>
                Remove horse data
            </CustomButton>

            {/* --- USE BASE DIALOG AS FORM --- */}
            <BaseDialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title='Edit horse data'
                actions={
                    <>
                        <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button variant='contained' onClick={handleSave}>
                            Save changes
                        </Button>
                    </>
                }
            >
                {/* Here to inject other components */}
                <Typography variant='body2' gutterBottom>
                    Fill data below:
                </Typography>
                <TextField label='Horse name' fullWidth margin='normal' />
                <TextField label='Race' fullWidth margin='normal' />
            </BaseDialog>

            {/* --- USE THE SAME BASE DIALOG AS CONFIRM --- */}
            <BaseDialog
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title='Confirm'
                maxWidth='xs'
                actions={
                    <>
                        <Button onClick={() => setIsDeleteOpen(false)}>No</Button>
                        <Button variant='contained' color='error' onClick={handleConfirmDelete}>
                            Yes, delete
                        </Button>
                    </>
                }
            >
                {/* HERE TO INJECT SIMPLE TEXT */}
                <Typography color='error'>
                    Are you sure to remove this horse ?
                </Typography>
            </BaseDialog>
        </div>
    );
}
