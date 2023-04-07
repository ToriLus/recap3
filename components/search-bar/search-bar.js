import { updateCharacterCards } from "../../index.js";

export function createSearchBar() {
  const searchBar = createSearchBarDomElement();

  searchBar.addEventListener("submit", async (e) => {
    e.preventDefault();
    showSearchResults(e);
  });
  return searchBar;
}

async function showSearchResults(e) {
  const searchBarData = new FormData(e.target);
  const searchQuery = Object.fromEntries(searchBarData).query;
  try {
    await updateCharacterCards(1, searchQuery);
  } catch (error) {
    console.log("Error: ", error);
  }
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
