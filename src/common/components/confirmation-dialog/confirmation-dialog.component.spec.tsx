import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'Confirmar acción',
    labels: {
      closeButton: 'Cancelar',
      acceptButton: 'Aceptar',
    },
    children: <div>¿Estás seguro?</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza título, contenido y botones cuando está abierto', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByText('Confirmar acción')).not.toBeNull();
    expect(screen.getByText('¿Estás seguro?')).not.toBeNull();
    expect(screen.getByText('Cancelar')).not.toBeNull();
    expect(screen.getByText('Aceptar')).not.toBeNull();
  });

  it('llama a onClose al hacer clic en cancelar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    fireEvent.click(screen.getByText('Cancelar'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.onAccept).not.toHaveBeenCalled();
  });

  it('llama a onAccept y luego a onClose al hacer clic en aceptar', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    fireEvent.click(screen.getByText('Aceptar'));
    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('no se renderiza si isOpen es false', () => {
    render(<ConfirmationDialogComponent {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Confirmar acción')).toBeNull();
  });
});