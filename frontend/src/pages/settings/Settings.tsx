import { JSX, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { CustomButton } from '../../components/button/CustomButton.tsx';
import { BaseDialog } from '../../components/dialog/BaseDialog.tsx';

import { SettingsTabs } from './SettingsTabs.tsx';

export function Settings(): JSX.Element {
    const [isSaveOpen, setIsSaveOpen] = useState(false);

    const handleConfirmDelete = () => {
        console.log('Removing...');
        setIsSaveOpen(false);
    };
    return (
        <div>
            <h1>This is Settings page</h1>

            <SettingsTabs></SettingsTabs>

            <h2>Open dialog:</h2>
            <CustomButton onClick={() => setIsSaveOpen(true)}>Start</CustomButton>
            {isSaveOpen && (
                <BaseDialog
                    open={isSaveOpen}
                    onClose={() => setIsSaveOpen(false)}
                    title='Confirming'
                    maxWidth='xs'
                    actions={
                        <>
                            <Button onClick={() => setIsSaveOpen(false)}>No</Button>
                            <Button variant='contained' color='error' onClick={handleConfirmDelete}>
                                Yes, delete
                            </Button>
                        </>
                    }
                >
                    <Typography color='error'>Are you sure you want to delete this horse data?</Typography>
                </BaseDialog>
            )}
        </div>
    );
}
