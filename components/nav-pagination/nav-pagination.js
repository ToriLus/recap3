import {
  createNavButton,
  createPaginationDomElement,
} from "../nav-button/nav-button.js";

import { getPage, getMaxPage, updateCharacterCards } from "../../index.js";

export function createPagination() {
  // Create pagination DOM elements
  const prevButton = createNavButton("button--prev", "button-prev", "previous");
  const spanElement = createPaginationDomElement();
  const nextButton = createNavButton("button--next", "button-next", "next");

  // Change the pages forwards or backwards
  nextButton.addEventListener("click", () => {
    changePage("forwards");
  });
  prevButton.addEventListener("click", () => {
    changePage("backwards");
  });

  // Update the container with elements
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
  console.log("max Page from change Page", maxPage);
  changeDirection === "forwards" ? ++page : --page;
  if (page <= 0) page = 1;
  if (page >= maxPage) page = maxPage;
  await updateCharacterCards(page);
}
