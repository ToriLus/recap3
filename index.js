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
const maxPage = 1;
const page = 1;
const searchQuery = "";

import { createCharacterCard } from "./components/card/card.js";
async function fetchCharacter() {
  try {
    let character = await fetch("https://rickandmortyapi.com/api/character");
    let fetchedCharacter = await character.json();
    fetchedCharacter = fetchedCharacter.results;
    console.log(fetchedCharacter);

    fetchedCharacter.forEach((character) => {
      console.log(
        character.name,
        character.status,
        character.type,
        character.episode.length,
        character.image
      );
    });
  } catch (error) {
    console.log(error);
  }
}

fetchCharacter();
