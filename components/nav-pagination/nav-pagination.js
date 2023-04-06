const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

const pagination = document.querySelector('[data-js="pagination"]');

// let maxPage = 1;
// export let page = 1;
// let fetchurl = `https://rickandmortyapi.com/api/character?page`;

export function changePaginationContent(maxPage, page) {
  pagination.innerText = `${page} / ${maxPage}`;
}
