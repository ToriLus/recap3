import { createNavButton } from "../nav-button/nav-button.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navContainer = document.querySelector("[data-js=navigation]");
const pagination = document.querySelector('[data-js="pagination"]');

// let maxPage = 1;
// export let page = 1;
// let fetchurl = `https://rickandmortyapi.com/api/character?page`;

export async function createPagination() {
  navContainer.replaceChildren();
  const prevButton = createNavButton("button-prev", "previous");
  const spanElement = document.createElement("span");
  spanElement.classList.add("navigation__pagination");
  spanElement.setAttribute("data-js", "pagination");
  spanElement.innerText = "1/1";
  const nextButton = createNavButton("button-prev", "next");
  navContainer.append(prevButton, spanElement, nextButton);
}

export function changePaginationContent(maxPage, page) {
  console.log("pagination innerHTML", pagination.innerHTML);
  pagination.innerText = `${page} / ${maxPage}`;
}

// {/* <button class="button button--prev" data-js="button-prev">
// previous
// </button>
// <span class="navigation__pagination" data-js="pagination">1 / 1</span>
// <button class="button button--next" data-js="button-next">next</button> */}
