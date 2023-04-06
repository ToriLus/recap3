export function createNavButton(jsClass = "", innerContent = "") {
  const navButton = document.createElement("button");
  navButton.classList.add("button");
  navButton.classList.add("button--prev");
  navButton.setAttribute("data-js", jsClass);
  navButton.innerHTML = innerContent;
  return navButton;
}
