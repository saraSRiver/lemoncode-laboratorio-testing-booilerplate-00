import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'Confirmación',
    labels: {
      closeButton: 'Cancelar',
      acceptButton: 'Aceptar',
    },
    children: <p>¿Estás seguro?</p>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog with title and children when open', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByText('Confirmación')).toBeInTheDocument();
    expect(screen.getByText('¿Estás seguro?')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
  });

  it('should not render dialog when isOpen is false', () => {
    render(<ConfirmationDialogComponent {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Confirmación')).not.toBeInTheDocument();
  });

  it('should call onClose when clicking Cancelar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    fireEvent.click(screen.getByText('Cancelar'));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.onAccept).not.toHaveBeenCalled();
  });

  it('should call onAccept and then onClose when clicking Aceptar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    fireEvent.click(screen.getByText('Aceptar'));

    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});