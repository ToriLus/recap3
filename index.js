import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { changePaginationContent } from "../components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

// States
let page = 1;
let searchQuery = "";
let fetchurl = "";
let maxPage = 1;

// Creating and appending the search bar
searchBarContainer.append(createSearchBar());

// Create DOM Elemnts for the navigation bar
await createPagination();
// Initial fill of the page with the cards
await updateCharacterCards();

export async function updateCharacterCards(newPage = 1, newSearchQuery = "") {
  try {
    if (newPage) page = newPage;
    if (newSearchQuery) searchQuery = newSearchQuery;
    fetchurl = setFetchURL(page, searchQuery);

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
    console.log("Error:", error);
    return alert(`Fetching data not possible!\n${error}`);
  }
}

function setFetchURL(page, searchQuery) {
  return `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
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
