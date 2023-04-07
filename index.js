import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { changePaginationContent } from "../components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

// Create DOM Elements for the search bar and append
searchBarContainer.append(createSearchBar());
const searchBar = document.querySelector('[data-js="search-bar"]');
// Create DOM Elemnts for the navigation bar

// States
let page = 1;
let searchQuery = "";
let fetchurl = `https://rickandmortyapi.com/api/character?page=${page}`;
let maxPage;
console.log(maxPage);

await createPagination();
await updateCharacterCards(fetchurl);

export async function updateCharacterCards(
  newURL,
  newPage = null,
  newSearchQuery = null
) {
  try {
    fetchurl = newURL;
    if (newPage) page = newPage;
    if (newSearchQuery) searchQuery = newSearchQuery;
    cardContainer.innerHTML = "";
    const charactersData = await fetch(fetchurl);
    const charactersDataJson = await charactersData.json();
    const characters = charactersDataJson.results;
    if (characters) {
      characters.forEach((character) => {
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
    maxPage = charactersDataJson.info.pages;
    changePaginationContent(maxPage, page);
  } catch (error) {
    maxPage = 1;
    page = 1;
    changePaginationContent(maxPage, page);
  }
}

export function getPage() {
  return page;
}

export function getMaxPage() {
  return maxPage;
}

export function getSearchQuery() {
  return searchQuery;
}
