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
}

async function showSearchResults(event) {
  const searchBarData = new FormData(event.target);
  let searchQuery = Object.fromEntries(searchBarData).query;
  searchQuery = searchQuery.replace(/[^a-zA-Z0-9]/g, "");
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
