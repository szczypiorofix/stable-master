import { CSSProperties, JSX, PropsWithChildren } from 'react';

import { Button as ButtonMaterialUI } from '@mui/material';

type ButtonProps = PropsWithChildren<{
    onClick?: () => void;
    variant: 'text' | 'contained' | 'outlined';
    size: 'xs' | 'sm' | 'md' | 'lg';
}>;

export function Button({
    children,
    onClick,
    variant = 'contained',
    size = 'md',
}: ButtonProps): JSX.Element {
    const sizeStyles: Record<ButtonProps['size'], CSSProperties> = {
        xs: {
            padding: '0.25rem',
        },
        sm: {
            padding: '0.5rem',
        },
        md: {
            padding: '0.75rem',
        },
        lg: {
            padding: '1rem',
        },
    };

    return (
        <ButtonMaterialUI
            variant={variant}
            style={sizeStyles[size]}
            onClick={onClick}
        >
            {children}
        </ButtonMaterialUI>
    );
}
