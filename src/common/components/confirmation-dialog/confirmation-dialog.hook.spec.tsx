import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../app';

// Mock de RouterComponent y otros si no quieres testear su lógica interna
jest.mock('core/router', () => ({
  RouterComponent: () => <div>Mock Router</div>,
}));




describe('App', () => {
  it('should render App with all providers and RouterComponent', () => {
    render(<App />);

    expect(screen.getByText('Mock Router')).toBeInTheDocument();
  });
});
