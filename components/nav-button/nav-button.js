export function createNavButton(className, jsClass = "", innerContent = "") {
  const navButton = document.createElement("button");
  navButton.classList.add("button");
  navButton.classList.add(className);
  navButton.setAttribute("data-js", jsClass);
  navButton.innerHTML = innerContent;
  return navButton;
}
