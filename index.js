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
let page = 1;
let searchQuery = "";
let fetchurl = `https://rickandmortyapi.com/api/character?page=${page}`;
let maxPage;
console.log(maxPage);

await fetchCharacter(fetchurl);

export async function fetchCharacter(url) {
  try {
    cardContainer.innerHTML = "";
    const character = await fetch(url);
    const fetchedCharacterData = await character.json();
    const fetchedCharacter = fetchedCharacterData.results;
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
    console.log("maxPage", maxPage);
    maxPage = fetchedCharacterData.info.pages;
    createPagination(maxPage, page);
  } catch (error) {
    maxPage = 1;
    page = 1;
    createPagination(maxPage, page);
    // alert("go cry in a corner");
  }
}

nextButton.addEventListener("click", async () => {
  cardContainer.innerHTML = "";
  page = page + 1;
  if (page >= maxPage) {
    page = maxPage;
  }
  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  await fetchCharacter(fetchurl);
  console.log(maxPage);
});
prevButton.addEventListener("click", async () => {
  cardContainer.innerHTML = "";
  page = page - 1;
  if (page <= 0) {
    page = 1;
  }
  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  await fetchCharacter(fetchurl);
});

searchBarContainer.append(createSearchBar());
const searchBar = document.querySelector('[data-js="search-bar"]');

searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchBarData = new FormData(e.target);
  const searchBarEntry = Object.fromEntries(searchBarData);
  searchQuery = searchBarEntry.query;

  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  try {
    page = 1;
    await fetchCharacter(fetchurl);
  } catch (error) {
    console.log("nothing");
  }
});
