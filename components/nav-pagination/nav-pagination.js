import {
  createNavButton,
  createPaginationDomElement,
} from "../nav-button/nav-button.js";

import { getPage, getMaxPage, updateCharacterCards } from "../../index.js";

export async function createPagination() {
  const prevButton = createNavButton("button--prev", "button-prev", "previous");
  const spanElement = createPaginationDomElement();
  const nextButton = createNavButton("button--next", "button-next", "next");

  nextButton.addEventListener("click", () => {
    changePage(1);
  });

  prevButton.addEventListener("click", () => {
    changePage(-1);
  });

  const navContainer = document.querySelector("[data-js=navigation]");
  navContainer.append(prevButton, spanElement, nextButton);
}

export function changePaginationContent(maxPage, page) {
  const pagination = document.querySelector('[data-js="pagination"]');
  pagination.innerText = `${page} / ${maxPage}`;
}

async function changePage(changeDirection) {
  let page = getPage();
  const maxPage = getMaxPage();
  changeDirection > 0 ? ++page : --page;
  if (page <= 0) page = 1;
  if (page >= maxPage) page = maxPage;
  await updateCharacterCards(page);
}
