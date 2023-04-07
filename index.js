import { createCharacterCards } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { changePaginationContent } from "../components/nav-pagination/nav-pagination.js";

// States
let page = 1;
let searchQuery = "";
let maxPage = 1;
let fetchUrl = "";

// Creating and appending the search bar
createSearchBar();
// Create DOM Elemnts for the navigation bar
createPagination();
// Initial fill of the page with the cards
updateCharacterCards();

export async function updateCharacterCards(newPage = 1, newSearchQuery = "") {
  try {
    // Update states if required
    updateStates(newPage, newSearchQuery);
    // Fetch Rick and Morty data
    const charactersData = await fetch(fetchUrl);
    const charactersDataJson = await charactersData.json();
    // Get characters and set max page
    const characters = charactersDataJson.results;
    maxPage = charactersDataJson.info.pages;

    // Update states,pagination and cards
    changePaginationContent(maxPage, page);
    createCharacterCards(characters);
  } catch (error) {
    console.log("fetchUrl", fetchUrl);
    console.log("page", page);
    console.log("max page", maxPage);
    maxPage = page = "-";
    changePaginationContent(maxPage, page);
    console.log(`Fetching data not possible!\n${error}`);
  }
}

function setURL(page, searchQuery = "") {
  fetchUrl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
}

function updateStates(newPage, newSearchQuery) {
  if (newPage) page = newPage;
  if (newSearchQuery) searchQuery = newSearchQuery;
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
