import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

interface BaseDialogProps {
    open: boolean; // Is modal opened?
    onClose: () => void; // Close callback
    title: string; // Modal title
    children: ReactNode; // Content
    actions?: ReactNode; // Optional content, buttons "Save", "Close" etc.
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Optional width
}

export const BaseDialog = ({ open, onClose, title, children, actions, maxWidth = 'sm' }: BaseDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
            <DialogTitle>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6'>{title}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>{children}</DialogContent>

            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
};
