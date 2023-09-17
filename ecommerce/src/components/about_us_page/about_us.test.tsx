import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import App from '../../App';
import AboutUsPage from './AboutUsPage';
import YuliaPage from './ourCommand/julia';
import NastyaPage from './ourCommand/nastya';
import SashaPage from './ourCommand/sasha';

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

test('render About Us link', () => {
    render(<App />);
    const linkElement = screen.getByText('About Us');
    expect(linkElement).toBeInTheDocument();
});

describe('render About Us Page', () => {
    it('About us page is in the document', () => {
        render(<App />);
        const linkElement = screen.getByText('About Us');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        expect(screen.getByText('Anastasiya Andronova')).toBeInTheDocument();
    });
    it('About us page is in the document', () => {
      render(<App />);
      const linkElement = screen.getByText('About Us');
      expect(linkElement).toBeInTheDocument();
      fireEvent.click(linkElement);
      expect(screen.getByText('Aliaksandr Fedukovich')).toBeInTheDocument();
  });
    it('Link to Anastasiya profile is in the document', () => {
        render(
            <MemoryRouter>
                <NastyaPage />
            </MemoryRouter>
        );
        expect(screen.getByText('Anastasiya Andronova')).toBeInTheDocument();
    });
    it('Link to Aliaksandr profile is in the document', () => {
        render(
            <MemoryRouter>
                <SashaPage />
            </MemoryRouter>
        );
        /* const linkElement = screen.getByText('Aliaksandr');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement); */
        expect(screen.getByText('Aliaksandr Fedukovich')).toBeInTheDocument();
    });
    it('Link to Yulia profile is in the document', () => {
        render(
            <MemoryRouter>
                <YuliaPage />
            </MemoryRouter>
        );
        /* const linkElement = screen.getByText('Yulia');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement); */
        expect(screen.getByText('Yulia Ivashchenko')).toBeInTheDocument();
    });
    it('Anastasiya  profile is in the document', () => {
        render(
            <MemoryRouter>
                <NastyaPage />
            </MemoryRouter>
        );
        /* const linkElement = screen.getByText('Anastasiya');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        screen.debug(); */
        expect(screen.getByAltText('nastya')).toBeInTheDocument();
    });
    it('Aliaksandr profile is in the document', () => {
        render(
            <MemoryRouter>
                <SashaPage />
            </MemoryRouter>
        );
        /* const linkElement = screen.getByText('Aliaksandr');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        screen.debug(); */
        expect(screen.getByAltText('sasha')).toBeInTheDocument();
    });
    it('Yulia profile is in the document', () => {
        render(
            <MemoryRouter>
                <YuliaPage />
            </MemoryRouter>
        );
        /* const linkElement = screen.getByText('Yulia');
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        screen.debug(); */
        expect(screen.getByAltText('julia')).toBeInTheDocument();
    });
});
