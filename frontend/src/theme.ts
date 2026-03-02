import { createTheme, Theme } from '@mui/material';

const defaultTheme: Theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#607d8b',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        success: {
            main: '#4caf50',
        },
        warning: {
            main: '#ff9800',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontSize: 13,
        fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 600,
        },
        subtitle2: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 0,
    },
    components: {
        MuiTable: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                    padding: '6px 12px',
                },
                head: {
                    fontWeight: 700,
                    backgroundColor: '#f5f6fa',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 0,
                },
                sizeSmall: {
                    fontSize: 12,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 2,
                },
                sizeSmall: {
                    fontSize: 11,
                    height: 20,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 12,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: 0,
                },
            },
        },
    },
});

export default defaultTheme;
