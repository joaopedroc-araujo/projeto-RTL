import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

const mockPokemonList = {
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  id: 25,
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
};

test('Testa se o card de informações do Pokémon exibe o nome corretamente', () => {
  renderWithRouter(<Pokemon pokemon={ mockPokemonList } isFavorite={ false } />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
});

test('Testa se o card de informações do Pokémon exibe o tipo corretamente', () => {
  renderWithRouter(<Pokemon pokemon={ mockPokemonList } isFavorite={ false } />);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent('Electric');
});

it('Testa se o card de informações do Pokémon exibe o peso e a unidade de medida corretamente', () => {
  const { value, measurementUnit } = mockPokemonList.averageWeight;
  renderWithRouter(<Pokemon pokemon={ mockPokemonList } isFavorite={ false } />);
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
});

test('Testa se o card de informações do Pokémon exibe a imagem corretamente', () => {
  const { name, image } = mockPokemonList;
  renderWithRouter(<Pokemon pokemon={ mockPokemonList } isFavorite={ false } />);
  const pokemonImage = screen.getByAltText(`${name} sprite`);
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage).toHaveAttribute('src', image);
});

test('Testa se o card contem o link de mais detalhes renderizado', () => {
  const { id } = mockPokemonList;
  renderWithRouter(
    <Pokemon
      pokemon={ mockPokemonList }
      isFavorite={ false }
    />,
  );
  const moreDetails = screen.getByRole('link', { name: /More details/i });
  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails).toHaveAttribute('href', `/pokemon/${id}`);
});

test('Testa se o clique em "More details" redireciona corretamente ', () => {
  const history = createMemoryHistory();
  renderWithRouter(
    <Route history={ history }>
      <Pokemon
        pokemon={ mockPokemonList }
        isFavorite={ false }
      />
    </Route>,
  );
  const moreDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetails);
  const { id } = mockPokemonList;
  history.push(`/pokemon/${id}`);
  expect(history.location.pathname).toBe(`/pokemon/${id}`);
});

test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
  renderWithRouter(
    <Pokemon
      pokemon={ mockPokemonList }
      isFavorite
    />,
  );
  const { name } = mockPokemonList;
  const favoritedPokemon = screen
    .getByAltText(`${name} is marked as favorite`);
  expect(favoritedPokemon).toBeInTheDocument();
  expect(favoritedPokemon).toHaveAttribute('src', '/star-icon.svg');
});
