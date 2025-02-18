import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonComponent } from './Button.component.tsx';

describe('ButtonComponent', () => {
    it('renders button element', () => {
        render(
            <ButtonComponent size={'sm'} variant={'primary'}>
                Click me
            </ButtonComponent>
        );
        expect(
            screen.getByRole('button', { name: /Hello/i })
        ).toBeInTheDocument();
    });

    it('renders enabled button', () => {
        render(
            <ButtonComponent size={'sm'} variant={'primary'}>
                Click me
            </ButtonComponent>
        );
        const loginBtn = screen.getByRole('button', { name: /Hello/i });
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).not.toBeDisabled();
    });
});
