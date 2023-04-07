import { updateCharacterCards } from "../../index.js";
export function createSearchBar() {
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
    const searchQuery = Object.fromEntries(searchBarData).query;
    const urlWithSearchQuery = `https://rickandmortyapi.com/api/character?page=1&name=${searchQuery}`;
    try {
      await updateCharacterCards(urlWithSearchQuery, 1, searchQuery);
    } catch (error) {
      console.log("Error: ", error);
    }
  });

  return searchBar;
}
