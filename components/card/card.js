export function createCharacterCards(characters) {
  const cardContainer = document.querySelector('[data-js="card-container"]');
  cardContainer.innerHTML = "";
  cardContainer.scrollTo({ top: 0 });
  if (characters) {
    characters.forEach((character) => {
      cardContainer.append(
        createDomForCharacterCard(
          character.name,
          character.status,
          character.type,
          character.episode.length,
          character.image
        )
      );
    });
  }
}

function createDomForCharacterCard(
  characterName = "Name not specified!",
  characterStatus = "Status not specified!",
  characterType = "Type not specified!",
  characterOccurrences = "Occurences not specified!",
  characterImageSource = "Source not specified!"
) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = ` <li class="card">
  <div class="card__image-container">
    <img
      class="card__image"
      src="${characterImageSource}"
      alt="Rick Sanchez"
    />
    <div class="card__image-gradient"></div>
  </div>
  <div class="card__content">
    <h2 class="card__title">${characterName}</h2>
    <dl class="card__info">
      <dt class="card__info-title">Status</dt>
      <dd class="card__info-description">${characterStatus}</dd>
      <dt class="card__info-title">Type</dt>
      <dd class="card__info-description">${characterType}</dd>
      <dt class="card__info-title">Occurrences</dt>
      <dd class="card__info-description">${characterOccurrences}</dd>
    </dl>
  </div>
  </li> `;
  return card;
}

export function emptyCardContainer() {
  const cardContainer = document.querySelector('[data-js="card-container"]');
  cardContainer.innerHTML = "";
}
