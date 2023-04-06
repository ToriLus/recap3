import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacter() {
  try {
    let character = await fetch("https://rickandmortyapi.com/api/character");
    let fetchedCharacter = await character.json();
    fetchedCharacter = fetchedCharacter.results;

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
  } catch (error) {
    console.log(error);
  }
}

fetchCharacter();

searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchBarData = new FormData(e.target);
  const searchBarEntry = Object.fromEntries(searchBarData);
  searchQuery = searchBarEntry.query;
  console.log(searchQuery);
});
