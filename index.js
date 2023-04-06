import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

import { createPagination } from "../components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
// const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
export let maxPage;
export let page = 1;
// export let searchQuery=""
export let fetchurl = `https://rickandmortyapi.com/api/character?page=${page}`;

export async function fetchCharacter(url) {
  try {
    cardContainer.innerHTML = "";
    let character = await fetch(url);
    let fetchedCharacter = await character.json();
    fetchedCharacter = fetchedCharacter.results;
    console.log("results", fetchedCharacter);
    if (fetchedCharacter) {
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
    }
    createPagination(url);
    console.log(url);
  } catch (error) {
    console.log(error);
  }
}

searchBarContainer.append(createSearchBar(fetchurl));
