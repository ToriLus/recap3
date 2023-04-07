import { createCharacterCards } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { changePaginationContent } from "../components/nav-pagination/nav-pagination.js";

// States
let page = 1;
let searchQuery = "";
let fetchurl = "";
let maxPage = 1;

// Creating and appending the search bar
createSearchBar();
// Create DOM Elemnts for the navigation bar
createPagination();
// Initial fill of the page with the cards
updateCharacterCards();

export async function updateCharacterCards(newPage = 1, newSearchQuery = "") {
  try {
    // Fetch Rick and Morty data
    const charactersData = await fetch(fetchurl);
    const charactersDataJson = await charactersData.json();
    // Get characters and set max page
    const characters = charactersDataJson.results;
    const newMaxPage = charactersDataJson.info.pages;

    updateStates(newPage, newSearchQuery, newMaxPage);
    changePaginationContent(maxPage, page);
    createCharacterCards(characters);
  } catch (error) {
    maxPage = page = "-";
    changePaginationContent(maxPage, page);
    alert(`Fetching data not possible!\n${error}`);
  }
}

function updateStates(newPage, newSearchQuery, newMaxPage) {
  if (newPage) page = newPage;
  if (newSearchQuery) searchQuery = newSearchQuery;
  if (newMaxPage) maxPage = newMaxPage;
  fetchurl = setFetchURL(page, searchQuery);
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
