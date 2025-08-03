import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de RouterComponent y otros si no quieres testear su lógica interna
jest.mock('core/router', () => ({
  RouterComponent: () => <div>Mock Router</div>,
}));

jest.mock('core/theme', () => ({
  ThemeProviderComponent: ({ children }: any) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

jest.mock('core/session-context', () => ({
  SessionProvider: ({ children }: any) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

describe('App', () => {
  it('should render App with all providers and RouterComponent', () => {
    render(<App />);

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('session-provider')).toBeInTheDocument();
    expect(screen.getByText('Mock Router')).toBeInTheDocument();
  });
});
