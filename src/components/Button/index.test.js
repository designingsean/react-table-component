import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './index'

const defaultProps = { 
  clickHandler: jest.fn(),
  disabled: false,
  children: "Test Text"
};

describe('Button', () => {
  test('renders the button element with correct text', () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.children)).toBeInTheDocument();
  });

  test('can be clicked and fires the correct function', () => {
    render(<Button {...defaultProps} />);

    userEvent.click(screen.getByRole('button'));
    expect(defaultProps.clickHandler).toHaveBeenCalled();
  });

  test('can be set to disabled', () => {
    render(<Button {...defaultProps} disabled={true} />);

    expect(screen.getByRole('button')).toBeDisabled();

    userEvent.click(screen.getByRole('button'));
    expect(defaultProps.clickHandler).not.toHaveBeenCalled();
  });
});