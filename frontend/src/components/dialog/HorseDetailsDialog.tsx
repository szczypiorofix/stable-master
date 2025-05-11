import { Fragment, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, FormControl, InputLabel,
    MenuItem,
    Select,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Horse } from '../../@types';
import { HORSE_SEX } from '../../shared/enums';
import { getListOfHorseSexes } from '../../shared/helpers';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface HorseDetailsDialogProps {
    open: boolean;
    onClose: () => void;
}

export function HorseDetailsDialog(props: HorseDetailsDialogProps) {
    const [horse, setHorse] = useState<Horse>({
        sex: HORSE_SEX.MARE,
        farrierVisits: [],
        owner: undefined,
        active: 0,
        color: '',
        vetVisits: [],
        birthdate: new Date(),
        description: '',
        avatar: '',
        breed: '',
        age: 0,
        name: '',
        id: 0
    });

    return (
        <Fragment>
            <BootstrapDialog
                onClose={props.onClose}
                aria-labelledby='customized-dialog-title'
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
                    Add new horse
                </DialogTitle>
                <IconButton
                    aria-label='close'
                    onClick={props.onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Please provide the following information about the
                        horse.
                    </Typography>

                    <Box mt={2} mb={2}>
                        <TextField
                            id='horse-name'
                            label='Name'
                            variant='standard'
                            fullWidth
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <TextField
                            id='horse-breed'
                            label='Breed'
                            variant='standard'
                            fullWidth
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <TextField
                            id='horse-color'
                            label='Color'
                            variant='standard'
                            fullWidth
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <Typography gutterBottom>Date of birth</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{ width: '100%' }} />
                        </LocalizationProvider>
                    </Box>

                    <Divider />

                    <Box mt={2} mb={2}>
                        <TextField
                            id='horse-description'
                            label='Description'
                            multiline={true}
                            maxRows={4}
                            variant='filled'
                            fullWidth
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <FormControl fullWidth margin="normal" size="medium">
                            <InputLabel id="horse-sex-select-label" variant={'outlined'}>Sex</InputLabel>
                            <Select
                                labelId='horse-sex-select-label'
                                id='horse-sex-select'
                                value={horse.sex}
                                label='Sex'
                                variant={'outlined'}
                                fullWidth
                                onChange={(e) =>
                                    setHorse({
                                        ...horse,
                                        sex: e.target.value as HORSE_SEX,
                                    })
                                }
                            >
                                {getListOfHorseSexes().map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value.toString()}>
                                            {value.toString()}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.onClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Fragment>
    );
}
