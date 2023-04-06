import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
export const maxPage = 1;
export const page = 1;
export const searchQuery = "";
export const fetchurl = `https://rickandmortyapi.com/api/character?page=${page}`;

export async function fetchCharacter(url) {
  try {
    let character = await fetch(url);
    let fetchedCharacter = await character.json();
    fetchedCharacter = fetchedCharacter.results;

    fetchedCharacter.forEach((character) => {
      cardContainer.append(
        createCharacterCard(
          character.name,
          character.status,
          character.type,
          character.episode.length,
          character.image
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
}

fetchCharacter();

const fetchUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;

searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchBarData = new FormData(e.target);
  const searchBarEntry = Object.fromEntries(searchBarData);
  searchQuery = searchBarEntry.query;

  const url = `${fetchUrl}name=morty`;
  const character = await fetch(url);
  const fetchedCharacter = await character.json();
  fetchedCharacter = fetchedCharacter.results;

  console.log(searchQuery);
});
