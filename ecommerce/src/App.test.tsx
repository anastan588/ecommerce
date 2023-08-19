import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText('Registration');
    expect(linkElement).toBeInTheDocument();
});
