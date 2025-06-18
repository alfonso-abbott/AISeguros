import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register.jsx';

describe('Register form', () => {
  test('shows validation message when fields are empty', async () => {
    render(<Register />);
    const button = screen.getByRole('button', { name: /registrar/i });
    await userEvent.click(button);
    expect(screen.getByRole('alert')).toHaveTextContent('Email and password are required');
  });

  test('submits without showing error when fields are filled', async () => {
    render(<Register />);
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret');
    const button = screen.getByRole('button', { name: /registrar/i });
    await userEvent.click(button);
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
