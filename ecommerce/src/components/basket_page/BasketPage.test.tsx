import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import App from '../../App';
import BasketPage from './BasketPage';

// jest.mock()

window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});

test('render Basket page link', () => {
    render(<App />);
    const linkElement = screen.getByText('Basket page');
    expect(linkElement).toBeInTheDocument();
});

/* describe('render Basket page', () => {
    it('Field "Поле для промокода" is in the document', () => {
        render(<App />);
        const linkElement = screen.getByText('Basket page');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        expect(screen.getByText('Поле для промокода')).toBeInTheDocument();
    });
    it('Field "Очистить корзину" is in the document', () => {
        render(<BasketPage />);
        const linkElement = screen.getByText('Очистить корзину');
        expect(linkElement).toBeInTheDocument();
    });
    it('About us page is in the document', () => {
        render(<BasketPage />);
        const linkElement = screen.getByRole('button');
        expect(linkElement).toBeInTheDocument();
    });
}); */
