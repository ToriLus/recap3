import {
  createCharacterCards,
  emptyCardContainer,
} from "./components/card/card.js";
import {
  createSearchBar,
  displayErrorBar,
  hideErrorBar,
} from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { changePaginationContent } from "../components/nav-pagination/nav-pagination.js";

// States
let page = 1;
let searchQuery = "";
let maxPage = 1;
let fetchUrl = "";

// Create DOM Elemnts for the navigation bar
createPagination();
// Initial fill of the page with the cards
updateCharacterCards();
// Creating and appending the search bar
createSearchBar();

export async function updateCharacterCards(
  newPage = 1,
  newSearchQuery = searchQuery
) {
  try {
    // Update states if required
    updateStates(newPage, newSearchQuery);
    // Fetch Rick and Morty data
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      maxPage = page = "-";
      changePaginationContent(maxPage, page);
      emptyCardContainer();
      displayErrorBar();
      console.error("Bad Request");
      return;
    }
    hideErrorBar();
    const charactersDataJson = await response.json();
    // Get characters and set max page
    const characters = charactersDataJson.results;
    maxPage = charactersDataJson.info.pages;

    // Update states,pagination and cards
    changePaginationContent(maxPage, page);
    createCharacterCards(characters);
  } catch (error) {
    maxPage = page = "-";
    changePaginationContent(maxPage, page);
    emptyCardContainer();
    console.log(`Fetching data not possible!\n${error}`);
  }
}

function setURL(page, searchQuery = "") {
  fetchUrl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
}

function updateStates(newPage, newSearchQuery) {
  if (newPage) page = newPage;
  searchQuery = newSearchQuery;
  setURL(page, searchQuery);
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
