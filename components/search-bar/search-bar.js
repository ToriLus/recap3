import { fetchCharacter } from "../../index.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

export function createSearchBar(fetchurl) {
  const searchBar = document.createElement("form");
  searchBar.classList.add("search-bar");
  searchBar.setAttribute("data-js", "search-bar");
  searchBar.innerHTML = `<input
    name="query"
    class="search-bar__input"
    type="text"
    placeholder="search characters"
    aria-label="character name"
  />
  <button class="search-bar__button" aria-label="search for character">
    <img
      class="search-bar__icon"
      src="assets/magnifying-glass.png"
      alt=""
    />
  </button>`;

  searchBar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchBarData = new FormData(e.target);
    const searchBarEntry = Object.fromEntries(searchBarData);
    const searchQuery = searchBarEntry.query;
    const url = `${fetchurl}&name=${searchQuery}`;
    console.log(url);
    try {
      await fetchCharacter(url);
    } catch (error) {
      console.log("nothing");
    }
    console.log(searchQuery);
  });
  return searchBar;
}
