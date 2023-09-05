import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import LogInPage from './login_page';

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

test('render Log In link', () => {
    render(<App />);
    const linkElement = screen.getByText('Log In');
    expect(linkElement).toBeInTheDocument();
});

describe('render Log In Page', () => {
    it('Log In Page is in the document', () => {
        render(<App />);
        const linkElement = screen.getByText('Log In');
        fireEvent.click(linkElement);
        expect(screen.getByText('Log In Page')).toBeInTheDocument();
    });
});

describe('render input fields', () => {
    it('input fields are required', () => {
        render(<App />);
        const linkElement = screen.getByText('Log In');
        fireEvent.click(linkElement);
        expect(screen.getByText('Log In Page')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeRequired();
    });
});

/* describe('log in input', () => {
    it('input to be in the Log In Page', () => {
        render(<App />);
        const linkElement = screen.getByText('Log In');
        fireEvent.click(linkElement);
        screen.debug();
        expect(screen.getByLabelText('Password')).toBeRequired();
        userEvent.type(screen.getByLabelText('Email'), '');
        expect(screen.getByLabelText('Password')).toBeValid();
        userEvent.type(screen.getByLabelText('Password'), 'asddfffgg');
        expect(screen.getByLabelText('Password')).toBeValid();
    });
}); */

describe('email input field', () => {
    it('email input is in the Log In Page', () => {
        render(<App />);
        const linkElement = screen.getByText('Log In');
        fireEvent.click(linkElement);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeRequired();
    });
});

describe('password input field', () => {
    it('password input field is in the Log In Page', () => {
        render(<App />);
        const linkElement = screen.getByText('Log In');
        fireEvent.click(linkElement);
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeRequired();
    });
});

describe('events', () => {
    it('click to link "Or register now!"', () => {
        render(<App />);
        const linkElement = screen.getByText('Log In');
        fireEvent.click(linkElement);
        screen.debug();
        expect(screen.getByText('Log In Page')).toBeInTheDocument();
        const linkReg = screen.getByText('Or register now!');
        expect(linkReg).toBeInTheDocument();
        fireEvent.click(linkReg);
        expect(screen.getByText('Welcome to our store')).toBeInTheDocument();
    });
});
