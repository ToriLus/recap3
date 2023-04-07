import { updateCharacterCards } from "../../index.js";

export function createSearchBar() {
  // select the container for the search bar
  const searchBarContainer = document.querySelector(
    '[data-js="search-bar-container"]'
  );

  // Create DOM Elements for the search bar
  const searchBar = createSearchBarDomElement();

  // On submnit update cards according to the search query
  searchBar.addEventListener("submit", async (event) => {
    event.preventDefault();
    showSearchResults(event);
  });
  searchBarContainer.append(searchBar);

  const badSearchErrorBar = createSearchErrorBarDomElement();
  searchBarContainer.append(badSearchErrorBar);
}

async function showSearchResults(event) {
  const searchBarData = new FormData(event.target);
  let searchQuery = Object.fromEntries(searchBarData).query;

  // Removing inacceptable input
  searchQuery = searchQuery.replace(/[^a-zA-Z0-9]/g, "");
  searchQuery = searchQuery.slice(0, 20);

  await updateCharacterCards(1, searchQuery);
}

function createSearchBarDomElement() {
  const searchBar = document.createElement("form");
  searchBar.classList.add("search-bar");
  searchBar.setAttribute("data-js", "search-bar");
  searchBar.innerHTML = `<input
    name="query"
    class="search-bar__input"
    type="text"
    placeholder="search characters"
    aria-label="character name"
    maxlength="20"
  />
  <button class="search-bar__button" aria-label="search for character">
    <img
      class="search-bar__icon"
      src="assets/magnifying-glass.png"
      alt=""
    />
  </button>`;
  return searchBar;
}

function createSearchErrorBarDomElement() {
  const searchBarContainer = document.querySelector(
    '[data-js="search-bar-container"]'
  );
  const searchErrorBar = document.createElement("div");
  searchErrorBar.classList.add("search-bar");
  searchErrorBar.setAttribute("data-js", "search-error-bar");
  searchErrorBar.innerHTML = "No matches found! Try again!";
  searchErrorBar.style.marginTop = "1rem";
  searchErrorBar.style.backgroundColor = "red";
  searchErrorBar.classList.add("error-bar--hidden");
  // searchErrorBar.style.transition = "opacity 0.5s ease-in-out";
  // searchErrorBar.style.opacity = "0";

  // searchErrorBar.style.transition = "visibility 0.5 ease-in-out";
  // searchErrorBar.style.visibility = "hidden";
  // searchErrorBar.style.display = "none";

  return searchErrorBar;
}

export function displayErrorBar() {
  const errorBar = document.querySelector('[data-js="search-error-bar"]');
  errorBar.classList.add("error-bar--show");
}
export function hideErrorBar() {
  const errorBar = document.querySelector('[data-js="search-error-bar"]');
  errorBar.classList.remove("error-bar--show");
}
