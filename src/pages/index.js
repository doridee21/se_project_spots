//import "./images";
import "./index.css";
import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";
import editAvatarSrc from "../images/edit_avatar-btn.png";
import pencilIconSrc from "../images/pencil-icon.svg";
import addIconSrc from "../images/add-icon.svg";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
//const path = { enableValidation, settings };require("./validation.js");

/*const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    altText: "Golden Gate bridge",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    altText: "Val Thorens",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    altText: "Restaurant terrace",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    altText: "An outdoor cafe",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    altText: "A very long bridge, over the forest and through the trees",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    altText: "Tunnel with morning light",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    altText: "Mountain house",
  },
];*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1d1ac213-7a85-46a2-9a19-e96c855359f6",
    "Content-Type": "application/json",
  },
});

/*api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cards.forEach((item) => {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
  })
  /*.catch((err) => {
    console.error(err);
  })*/ // above is the traditional way and the line of code below is a shorthand way to write this line of code
//}).catch(console.error);
// This method went through some refactoring and is now the method below it. For an in-depth understanding revist "Project 9 Part 3 - API Endpoints Overview video @ 7:20.""

api
  .getAppInfo()
  // TODO - Destructure the second item in the callback of the .then()
  .then(([cards, userData]) => {
    //console.log(cards);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    // TODO - handle the user's information
    // TODO - set the textContent of both the text elements
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    // TODO - set the src of the avatar image
    avatarImage.src = userData.avatar;
  })
  .catch(console.error);

const logoImage = document.getElementById("image-logo");
logoImage.src = logoSrc;

const avatarImage = document.getElementById("avatar-image");
avatarImage.src = avatarSrc;

const pencilIcon = document.getElementById("pencil-icon");
pencilIcon.src = pencilIconSrc;

const addIcon = document.getElementById("add-icon");
addIcon.src = addIconSrc;

const avatarBtnImage = document.getElementById("avatarbtn-image");
avatarBtnImage.src = editAvatarSrc;

//Profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalClosebtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// Avatar modal elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarModalClosebtn = avatarModal.querySelector(".modal__close-btn");
const avatarModalInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteFormElement = deleteModal.querySelector(".modal__form");

// Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = document.querySelector(".modal__image");
const previewModalCaptionEl = document.querySelector(".modal__caption");
const previewModalCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);

// select other neccesary elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.querySelector("#add-card-form");
const cardModalCloseBtn = document.querySelector("#modal-close-btn");
const cardLinkInput = document.querySelector("#add-card-link-input");
const cardNameInput = document.querySelector("#add-card-name-input");

//Card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardSubmitBtn = cardModal.querySelector(".modal__button");

let selectedCard, selectedCardId;
//let selectedCardId; // above we can also declare both variables on one line

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEscape);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  //evt.target.closest(".card").remove();
  selectedCard = cardElement;
  selectedCardId = cardId;
  console.log(cardId);
  openModal(deleteModal);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      // TODO - use data arguement instead of input values
      profileName.textContent = data.name /*editModalNameInput.value*/;
      profileDescription.textContent =
        data.about /*editModalDescriptionInput.value*/;
      closeModal(editModal);
    })
    .catch(console.error);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  disableButton(cardSubmitBtn, settings);

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);

  api
    .addNewCard(inputValues)
    .then((cardData) => {
      const newCardElement = getCardElement(cardData);
      cardsList.prepend(newCardElement);
      closeModal(cardModal);
      cardForm.reset();
      resetValidation(cardForm, [cardNameInput, cardLinkInput]);
    })
    .catch((error) => {
      // Handle any errors from the API call
      console.error("Error adding new card:", error);
      alert("Failed to add new card. Please check console for details.");
    });
  //.catch(console.error);
  //cardsList.prepend(cardElement);
  //evt.target.reset();
  //disableButton(cardSubmitBtn, settings);
  //closeModal(cardModal);
  /*.finally(() => {
      enableButton(cardSubmitButton, settings);
    });*/
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  console.log(avatarModalInput.value);
  api
    .editAvatarInfo(avatarModalInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.altText || `Photo of ${data.name}`;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.altText || `Photo of ${data.name}`;
  });

  cardDeleteBtn.addEventListener("click", (evt) =>
    //cardElement.remove();
    //openModal(deleteModal);
    handleDeleteCard(cardElement, data._id)
  );

  return cardElement;
}

function closeModalOnEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function closeModalOnOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, [
    editModalNameInput,
    editModalDescriptionInput,
  ]);
  openModal(editModal);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", closeModalOnOverlayClick);
});

editModalClosebtn.addEventListener("click", () => {
  closeModal(editModal);
});

//new listeners

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalClosebtn.addEventListener("click", () => {
  closeModal(avatarModal);
});
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

deleteFormElement.addEventListener(
  "submit",
  /*evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
});*/
  handleDeleteSubmit
);

/*initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});*/

enableValidation(settings);
