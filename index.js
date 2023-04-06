import { createCharacterCard } from "./components/card/card.js";

import { createPagination } from "../components/nav-pagination/nav-pagination.js";

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
export let maxPage = 1;
export let page = 1;
export const searchQuery = "";
export let fetchurl = `https://rickandmortyapi.com/api/character?page=${page}`;

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

fetchCharacter(fetchurl);
