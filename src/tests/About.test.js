import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { About } from '../pages';

test('Exibe um h2 com o texto "About Pokédex"', () => {
  render(<About />);

  const about = screen.getByRole('heading', { name: /about pokédex/i });
  expect(about).toBeInTheDocument();
});

test('Exibe dois parágrafos na página', async () => {
  render(<About />);

  await waitFor(() => {
    const paragraph1 = screen.queryByText(/This application simulates a Pokédex/);
    const paragraph2 = screen.queryByText(/One can filter Pokémon by type/);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});

test('Exibe a imagem de Pokédex na página', () => {
  render(<About />);

  const aboutImage = screen.getByAltText('Pokédex');
  expect(aboutImage).toBeInTheDocument();
  expect(aboutImage.src).toBe(
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
