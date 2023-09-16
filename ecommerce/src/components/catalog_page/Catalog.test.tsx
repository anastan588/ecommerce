import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import ProductPage from '../product_page/ProductPage';
import ProductsItem from './Card';
import Catalog from './Catalog';
import CatalogPage from './CatalogPage';
import { productsRes } from './requests';

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

test('render Catalog link', () => {
    render(<App />);
    const linkElement = screen.getByText('Catalog page');
    expect(linkElement).toBeInTheDocument();
});

describe('render CatalogPage', () => {
    it('Catalog Page is in the document', async () => {
        render(<App />);
        const linkElement = screen.getByText('Catalog page');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        screen.debug();
        expect(await screen.findByText('Catalog')).toBeInTheDocument();
        screen.debug();
    });
    it('Filter to categories is in the document', async () => {
        render(<CatalogPage />);
        const linkElement = await screen.findByText('Выбрать категории');
        expect(linkElement).toBeInTheDocument();
    });
    it('Filter to categories is in the document', async () => {
        render(<CatalogPage />);
        const linkElement = await screen.findByText('Выбрать категории');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        // screen.debug();
        expect(screen.getByText('Tags Mode')).toBeInTheDocument();
    });
    it('Filter to filters is in the document', async () => {
        render(<CatalogPage />);
        const linkElement = await screen.findByText('Выбрать характеристики товара');
        // screen.debug();
        expect(linkElement).toBeInTheDocument();
        /* fireEvent.click(linkElement);
        screen.debug();
        const linkTwo = await screen.findByText('Flavor');
        screen.debug();
        expect(linkTwo).toBeInTheDocument(); */
        /* fireEvent.click(linkTwo);
        expect(await screen.findByText(/Lilii/)).toBeInTheDocument(); */
        /* fireEvent.click(linkTwo);
        screen.debug();
        expect(screen.findByRole('search')).toBeInTheDocument(); */
        /* fireEvent.click(linkTwo);
        screen.debug();
        expect(screen.getByText(/Lilii/)).toBeInTheDocument(); */
    });
    it('Filter to price is in the document', async () => {
        render(<CatalogPage />);
        const linkElement = await screen.findByText('Фильтр по цене');
        // screen.debug();
        expect(linkElement).toBeInTheDocument();
    });
    it('rendered cards', async () => {
        render(<Catalog />);
        expect(await screen.findByTestId('cards-test')).toBeInTheDocument();
        // screen.debug();
        /* const linkElement = await screen.findAllByTestId('card-test');
        expect(linkElement.length).toBe(20);
        screen.debug(); */
    });
});

/* describe('render ProductPage', () => {
    it('ProductPage is in the document', async () => {
        render(<ProductPage />);
        const linkElement = await screen.findByRole('button');
        expect(linkElement).toBeInTheDocument();
    });
}); */