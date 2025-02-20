import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders main App component', () => {
        render(<App />);
        expect(screen.getByText('Stable Master')).toBeInTheDocument();
    });
});
