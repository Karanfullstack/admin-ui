import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Page', () => {
    it('should render with required fields', () => {
        // Arange
        render(<Login />);

        // Act
        const button = screen.getByRole('button', { name: /Log in/ });
        const username = screen.getByPlaceholderText(/Email/);
        const password = screen.getByPlaceholderText(/Password/);
        const checkbox = screen.getByRole('checkbox', { name: /Remember me/ });
        const forgotPassword = screen.getByText('Forgot password');
        // Assert
        expect(screen.getByText(/Sign in/)).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(forgotPassword).toBeInTheDocument();
    });
});
