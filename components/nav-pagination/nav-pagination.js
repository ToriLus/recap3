import { createNavButton } from "../nav-button/nav-button.js";
import {
  getPage,
  setPage,
  getMaxPage,
  getSearchQuery,
  setRickMortyURL,
  fetchCharacters,
} from "../../index.js";
const navContainer = document.querySelector("[data-js=navigation]");
const pagination = document.querySelector('[data-js="pagination"]');

export function createPagination() {
  navContainer.replaceChildren();
  const prevButton = createNavButton("button--prev", "button-prev", "previous");
  const spanElement = document.createElement("span");
  spanElement.classList.add("navigation__pagination");
  spanElement.setAttribute("data-js", "pagination");
  spanElement.innerText = "1/1";
  const nextButton = createNavButton("button--next", "button-next", "next");
  nextButton.addEventListener("click", () => {
    changePage(1);
  });

  prevButton.addEventListener("click", () => {
    changePage(-1);
  });
  navContainer.append(prevButton, spanElement, nextButton);
}

export function changePaginationContent(maxPage, page) {
  console.log("pagination innerHTML", pagination.innerHTML);
  pagination.innerText = `${page} / ${maxPage}`;
}

async function changePage(changeDirection) {
  let page = getPage();
  const maxPage = getMaxPage();
  const searchQuery = getSearchQuery();
  changeDirection > 0 ? setPage(++page) : setPage(--page);
  if (page <= 0) page = 1;
  if (page >= maxPage) page = maxPage;
  const fetchurl = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  setRickMortyURL(fetchurl);
  await fetchCharacters(fetchurl);
}
