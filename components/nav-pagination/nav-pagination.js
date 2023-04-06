import { fetchCharacter } from "../../index.js";
import { createSearchBar, searchQuery } from "../search-bar/search-bar.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

let maxPage = 1;
export let page = 1;
let fetchurl = `https://rickandmortyapi.com/api/character?page`;

export async function createPagination(url) {
  let getInfo = await fetch(url);
  let getInfojson = await getInfo.json();
  maxPage = getInfojson.info.pages;
  pagination.innerText = `${page} / ${maxPage}`;
  return maxPage;
}

nextButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  page = page + 1;
  if (page >= maxPage) {
    page = maxPage;
  }
  createPagination(fetchurl);
  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  fetchCharacter(fetchurl);
});
prevButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  page = page - 1;
  if (page <= 0) {
    page = 1;
  }
  fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  fetchCharacter(fetchurl);
  createPagination(fetchurl);
});
