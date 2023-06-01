import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Exibe a mensagem "No favorite pokemon found" se não há Pokémons favoritos', () => {
  const { getByText } = render(<FavoritePokemon pokemonList={ [] } />);
  expect(getByText('No favorite Pokémon found')).toBeInTheDocument();
});

test('Exibe os pokémons favoritos', () => {
  const mockPokemonList = [
    {
      id: 1,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
    },
    {
      id: 2,
      name: 'Charizard',
      type: 'Fire/Flying',
      averageWeight: { value: '90.5', measurementUnit: 'kg' },
    },
    {
      id: 3,
      name: 'Squirtle',
      type: 'Water',
      averageWeight: { value: '9.0', measurementUnit: 'kg' },
    },
  ];

  renderWithRouter(<FavoritePokemon pokemonList={ mockPokemonList } />);
  const pikachuFavorite = screen.getByText('Pikachu');
  expect(pikachuFavorite).toBeInTheDocument();

  const charizardFavorite = screen.getByText('Charizard');
  expect(charizardFavorite).toBeInTheDocument();

  const squirtleFavorite = screen.getByText('Squirtle');
  expect(squirtleFavorite).toBeInTheDocument();
});
