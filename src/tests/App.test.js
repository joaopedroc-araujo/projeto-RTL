import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

const favoriteText = 'Favorite Pokémon';
test('Testa os links do componente têm os textos corretos', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const home = screen.getByText('Home');
  const about = screen.getByText('About');
  const favoritePokemon = screen.getByText(favoriteText);
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemon).toBeInTheDocument();
});

test('Testa se o link de Home redireciona para a página correta', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const home = screen.getByText('Home');
  userEvent.click(home);

  expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
});

test('Testa se o link de About redireciona para a página correta', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const about = screen.getByText('About');
  userEvent.click(about);

  expect(screen.getByText('About Pokédex')).toBeInTheDocument();
});

test('Testa se o link de Favorite redireciona para a página correta', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const favorite = screen.getByRole('link', { name: favoriteText });
  userEvent.click(favorite);

  expect(screen.getByRole('heading', { name: favoriteText })).toBeInTheDocument();
});
