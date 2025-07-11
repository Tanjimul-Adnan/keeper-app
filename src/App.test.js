import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Keeper title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Keeper/i); // Match the "Keeper" title from your app
    expect(titleElement).toBeInTheDocument();
});
