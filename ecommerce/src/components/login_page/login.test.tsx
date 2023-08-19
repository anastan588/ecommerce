import { render, screen } from '@testing-library/react';
import { App } from 'antd';

test('renders learn react link', () => {
    // render(<App />);
    const linkElement = screen.getByText('Main page');
    expect(linkElement).toBeInTheDocument();
});
