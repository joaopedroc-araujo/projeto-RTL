import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

test('A página contém um heading com o texto "Page requested not found"', () => {
  render(<NotFound />);

  const notFoundText = screen.getByRole('heading', { name: 'Page requested not found' });
  expect(notFoundText).toBeInTheDocument();
});

test('A página contém uma imagem com o src correto "', () => {
  render(<NotFound />);

  const notFoundImage = screen.getByAltText('Pikachu crying because the page requested was not found');
  expect(notFoundImage).toBeInTheDocument();
  expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
