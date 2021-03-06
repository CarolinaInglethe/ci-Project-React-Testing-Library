import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Página contém um heading h2 com o texto Encountered pokémons', () => {
    // renderiza:
    renderWithRouter(<App />);
    // Acessa:
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    // testa:
    expect(heading).toBeInTheDocument();
  });

  test('Exibe próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    // renderiza
    renderWithRouter(<App />);
    // testa primeiro pokemon:
    const cardPikachu = screen.getByText(/Pikachu/i);
    expect(cardPikachu).toBeInTheDocument();
    // Acessa Botao para proximo Pokemon:
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    // Simula click no botao:
    userEvent.click(buttonNext);

    // Testa Proximo pokemon:
    const cardCharmander = screen.getByText(/Charmander/i);
    expect(cardCharmander).toBeInTheDocument();

    // simula click no botao:
    userEvent.click(buttonNext);

    // testa pokemon atual:
    const cardCaterpie = screen.getByText(/Caterpie/i);
    expect(cardCaterpie).toBeInTheDocument();
  });

  test('Se é mostrado apenas um Pokémon por vez', () => {
    // renderiza :
    renderWithRouter(<App />);
    // testa se há apenas um pokemon name:
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  test('Pokédex tem botões de filtro', () => {
    // renderiza :
    renderWithRouter(<App />);
    // testa primeiro pokemons têm botao de filtro:
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    // testa quantidade de botoes type:
    const arrayTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];
    expect(filterButton.length).toBe(arrayTypes.length);
    // testa se existe no documento e cada um tem o texto type:
    filterButton.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(arrayTypes[index]);
    });
    // testa se existe botao All:
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // renderiza :
    renderWithRouter(<App />);

    // testa se existe botao All e o texto é All:
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');

    // simula clique no botao All:
    userEvent.click(allButton);

    // // testa pokemon atual :
    // expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    // // testa se Pokemon não é mais filtrado do type Fire:
    // const buttonFilterElectric = screen.getAllByTestId('pokemon-type-button');
    // expect(buttonFilterElectric).toBeInTheDocument();
  });
});
