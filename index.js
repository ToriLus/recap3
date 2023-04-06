import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { changePaginationContent } from "../components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// Create DOM Elements for the search bar and append
searchBarContainer.append(createSearchBar());
const searchBar = document.querySelector('[data-js="search-bar"]');
// Create DOM Elemnts for the navigation bar
createPagination();

// States
let page = 1;
let searchQuery = "";
let fetchurl = `https://rickandmortyapi.com/api/character?page=${page}`;
let maxPage;
console.log(maxPage);

await fetchCharacters(fetchurl);

nextButton.addEventListener("click", () => {
  changePage(1);
});

prevButton.addEventListener("click", () => {
  changePage(-1);
});

searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchBarData = new FormData(e.target);
  searchQuery = Object.fromEntries(searchBarData).query;
  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  try {
    page = 1;
    await fetchCharacters(fetchurl);
  } catch (error) {
    console.log("nothing");
  }
});

export async function fetchCharacters(url) {
  try {
    cardContainer.innerHTML = "";
    const charactersData = await fetch(url);
    const charactersDataJson = await charactersData.json();
    const characters = charactersDataJson.results;
    console.log("results", characters);
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
    console.log("maxPage", maxPage);
    maxPage = charactersDataJson.info.pages;
    changePaginationContent(maxPage, page);
  } catch (error) {
    maxPage = 1;
    page = 1;
    changePaginationContent(maxPage, page);
  }
}

// Change page
async function changePage(changeDirection) {
  changeDirection > 0 ? page++ : page--;
  if (page <= 0) page = 1;
  if (page >= maxPage) page = maxPage;
  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  await fetchCharacters(fetchurl);
  console.log(maxPage);
}

// export function setPage(value) {
//   page = value;
// }
// export function getPage() {
//   return page;
// }
