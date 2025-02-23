import { describe, expect, it } from 'vitest';

import { Button } from './Button.component.tsx';

import { render, screen } from '@testing-library/react';

describe('ButtonComponent', () => {
    it('renders button element', () => {
        render(
            <Button size={'sm'} variant={'contained'}>
                Click me
            </Button>
        );
        expect(
            screen.getByRole('button', { name: /Click me/i })
        ).toBeInTheDocument();
    });

    it('renders enabled button', () => {
        render(
            <Button size={'sm'} variant={'contained'}>
                Click me
            </Button>
        );
        const loginBtn = screen.getByRole('button', { name: /Click me/i });
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).not.toBeDisabled();
    });
});
