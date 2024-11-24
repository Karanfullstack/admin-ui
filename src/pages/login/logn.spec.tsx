import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Page', () => {
    it('should render with required fields', () => {
        // Arange
        render(<Login />);

        // Act
        const button = screen.getByRole('button', { name: 'Signin' });
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Username');
        const checkbox = screen.getByRole('checkbox', { name: 'Remember me' });
        const forgotPassword = screen.getByText('Forgot password');
        // Assert
        expect(screen.getByText(/Login/)).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(forgotPassword).toBeInTheDocument();
    });
});
