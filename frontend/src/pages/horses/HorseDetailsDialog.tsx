import dayjs from 'dayjs';

import { Fragment, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    TextField,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Horse } from '../../@types';
import { DATA_SOURCE, getEnvironmentDetails } from '../../config/Environment.config.ts';
import { HORSE_SEX } from '../../shared/enums';
import { getListOfHorseSexes } from '../../shared/helpers';
import { DictionaryEntry } from '../../shared/models';

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
    const apiUrl = getEnvironmentDetails(DATA_SOURCE.LOCALHOST).url;
    const [horse, setHorse] = useState<Horse>({
        sex: HORSE_SEX.MARE,
        farrierVisits: [],
        owner: undefined,
        active: 0,
        coat: '',
        vetVisits: [],
        birthdate: new Date(),
        description: '',
        avatar: '',
        breed: '',
        age: 0,
        name: '',
        id: 0,
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [coatOptions, setCoatOptions] = useState<DictionaryEntry[]>([]);

    const handleInputChange = <K extends keyof Horse>(key: K, value: Horse[K]) => {
        setHorse((prevHorse) => ({
            ...prevHorse,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        if (selectedFile) {
            formData.append('avatarFile', selectedFile, selectedFile.name);
        }

        formData.append('name', horse.name);
        formData.append('breed', horse.breed);
        formData.append('coat', horse.coat);
        formData.append('sex', horse.sex);
        formData.append('birthdate', horse.birthdate.toISOString());
        formData.append('age', horse.age.toString());
        formData.append('description', horse.description);

        try {
            const response = await fetch(`${apiUrl}/horse`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const newHorse = (await response.json()) as Horse;
            console.log('Horse added successfully:', newHorse);

            props.onClose();
        } catch (error) {
            console.error('Cannot add a horse:', error);
        }
    };

    const handleCoatSelectChange = (event: SelectChangeEvent) => {
        const name = event.target.name;
        const value = event.target.value;
        setHorse((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (props.open) {
            fetch(`${apiUrl}/dictionary?category=HORSE_COAT`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCoatOptions(data);
                })
                .catch((err) => console.error('An error occurred while retrieving horse coat data: ', err));
        }
    }, [props.open]);

    return (
        <Fragment>
            <BootstrapDialog
                onClose={() => props.onClose()}
                aria-labelledby='customized-dialog-title'
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
                    Add new horse
                </DialogTitle>
                <IconButton
                    aria-label='close'
                    onClick={() => props.onClose()}
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
                    <Typography gutterBottom>Please provide the following information about the horse.</Typography>

                    <Box mt={2} mb={2}>
                        <TextField
                            id='horse-name'
                            label='Name'
                            variant='standard'
                            value={horse.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            fullWidth
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <TextField
                            id='horse-breed'
                            label='Breed'
                            variant='standard'
                            value={horse.breed}
                            onChange={(e) => handleInputChange('breed', e.target.value)}
                            fullWidth
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <FormControl fullWidth margin='dense'>
                            <InputLabel id='coat-select-label'>Coat</InputLabel>
                            <Select
                                labelId='coat-select-label'
                                id='coat-select'
                                name='coat'
                                value={horse.coat}
                                label='Coat'
                                onChange={handleCoatSelectChange}
                            >
                                {coatOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.label}>
                                        {option.label}
                                    </MenuItem>
                                ))}

                                {horse.coat && !coatOptions.find((c) => c.label === horse.coat) && (
                                    <MenuItem value={horse.coat}>{horse.coat}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box mt={2} mb={2}>
                        <Typography gutterBottom>Date of birth</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                sx={{ width: '100%' }}
                                value={dayjs(horse.birthdate)}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        handleInputChange('birthdate', newValue.toDate());
                                    }
                                }}
                            />
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
                            value={horse.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            fullWidth
                        />
                    </Box>

                    <Divider />

                    <Box mt={2} mb={2}>
                        <Button component='label' variant='outlined'>
                            Set awatar
                            <input
                                type='file'
                                hidden
                                accept='image/png, image/jpeg, image/gif'
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setSelectedFile(e.target.files[0]);
                                    } else {
                                        setSelectedFile(null);
                                    }
                                }}
                            />
                        </Button>
                        {selectedFile && (
                            <Typography variant='body2' sx={{ display: 'inline', ml: 2 }}>
                                {selectedFile.name}
                            </Typography>
                        )}
                    </Box>

                    <Box mt={2} mb={2}>
                        <FormControl fullWidth margin='normal' size='medium'>
                            <InputLabel id='horse-sex-select-label' variant={'outlined'}>
                                Sex
                            </InputLabel>
                            <Select
                                labelId='horse-sex-select-label'
                                id='horse-sex-select'
                                label='Sex'
                                variant={'outlined'}
                                fullWidth
                                value={horse.sex}
                                onChange={(e) => handleInputChange('sex', e.target.value as HORSE_SEX)}
                            >
                                {getListOfHorseSexes().map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value}>
                                            {value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => {
                            handleSubmit()
                                .then(() => console.log('Submit end'))
                                .catch((err) => console.error(err));
                        }}
                    >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Fragment>
    );
}
