import { createCharacterCard } from "./components/card/card.js";
import { fetchCharacter } from "../../index.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

import { maxPage } from "../../index.js";
import { page } from "../../index.js";
import { searchQuery } from "../../index.js";
import { fetchurl } from "../../index.js";

page = 5;
fetchCharacter(`https://rickandmortyapi.com/api/character?page=${page}`);
export function createPagination() {}

console.log(maxPage);
