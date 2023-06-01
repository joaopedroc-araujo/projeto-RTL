import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';

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
  {
    id: 4,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: { value: '2.9', measurementUnit: 'kg' },
  },
  {
    id: 5,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: { value: '48.0', measurementUnit: 'kg' },
  },
  {
    id: 6,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
  },
  {
    id: 7,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: { value: '460.0', measurementUnit: 'kg' },
  },
  {
    id: 8,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: { value: '16.5', measurementUnit: 'kg' },
  },
];

const mockPokemonFavoriteById = {};

const dataTestId = 'pokemon-name';
test('Exibe um h2 com o texto "Encountered Pokémon"', () => {
  renderWithRouter(
    <Pokedex
      isPokemonFavoriteById={ mockPokemonFavoriteById }
      pokemonList={ mockPokemonList }
    />,
  );

  const heading = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });
  expect(heading).toBeInTheDocument();
});

test('Exibe o próximo Pokémon da lista ao clicar no botão "Próximo Pokémon"', () => {
  renderWithRouter(
    <Pokedex
      isPokemonFavoriteById={ mockPokemonFavoriteById }
      pokemonList={ mockPokemonList }
    />,
  );

  const nextButton = screen.getByText(/próximo pokémon/i);
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();

  userEvent.click(nextButton);
  const charizard = screen.queryByText('Charizard');
  expect(charizard).toBeInTheDocument();

  userEvent.click(nextButton);
  const squirtle = screen.getByText('Squirtle');
  expect(squirtle).toBeInTheDocument();

  userEvent.click(nextButton);
  expect(pikachu).toBeInTheDocument();
});

test('Exibe apenas um Pokémon por vez', () => {
  renderWithRouter(
    <Pokedex
      isPokemonFavoriteById={ mockPokemonFavoriteById }
      pokemonList={ mockPokemonList }
    />,
  );

  const renderedPokemons = screen.getAllByTestId(dataTestId);
  expect(renderedPokemons.length).toBe(1);
});

test('Exibe os botões de filtro', () => {
  renderWithRouter(
    <Pokedex
      isPokemonFavoriteById={ mockPokemonFavoriteById }
      pokemonList={ mockPokemonList }
    />,
  );

  const allFilter = screen.getByRole('button', { name: 'All' });
  expect(allFilter).toBeInTheDocument();

  mockPokemonList.forEach((pokemon) => {
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const button = buttons.find((btn) => btn.textContent === pokemon.type);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(pokemon.type);
  });
});

test('Filtra os Pokémon corretamente ao clicar em um botão de tipo', () => {
  renderWithRouter(
    <Pokedex
      isPokemonFavoriteById={ mockPokemonFavoriteById }
      pokemonList={ mockPokemonList }
    />,
  );

  const electricFilter = screen.getByRole('button', { name: 'Electric' });
  userEvent.click(electricFilter);

  const pikachu = screen.getByTestId(dataTestId);
  expect(pikachu).toHaveTextContent('Pikachu');

  const fireFilter = screen.getByRole('button', { name: /fire/i });
  userEvent.click(fireFilter);
  const charizard = screen.getByTestId(dataTestId);
  expect(charizard).toHaveTextContent('Charizard');
  expect(charizard).not.toHaveTextContent('Pikachu');

  const bugFilter = screen.getByRole('button', { name: 'Bug' });
  userEvent.click(bugFilter);
  const caterpie = screen.getByTestId(dataTestId);
  expect(caterpie).toHaveTextContent('Caterpie');
  expect(caterpie).not.toHaveTextContent('Charizard');
});

test('Exibe os Pokémon normalmente ao clicar no botão "All"', () => {
  renderWithRouter(
    <Pokedex
      isPokemonFavoriteById={ mockPokemonFavoriteById }
      pokemonList={ mockPokemonList }
    />,
  );

  const fireFilter = screen.getByRole('button', { name: /fire/i });
  userEvent.click(fireFilter);

  const charizard = screen.getByTestId(dataTestId);
  expect(charizard).toHaveTextContent('Charizard');

  const allFilter = screen.getByRole('button', { name: 'All' });
  userEvent.click(allFilter);
  const pikachu = screen.getByTestId(dataTestId);
  expect(pikachu).toHaveTextContent('Pikachu');
});
