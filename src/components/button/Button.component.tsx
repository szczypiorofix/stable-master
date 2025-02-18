import { CSSProperties, PropsWithChildren } from 'react';
import { Button } from '@mui/material';

type ButtonProps = PropsWithChildren<{
    onClick?: () => void;
    variant: 'text' | 'contained' | 'outlined';
    size: 'xs' | 'sm' | 'md' | 'lg';
}>;

export const ButtonComponent = ({
    children,
    onClick,
    variant = 'contained',
    size = 'md',
}: ButtonProps) => {
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
        <Button
            variant={variant}
            style={{
                ...sizeStyles[size],
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
