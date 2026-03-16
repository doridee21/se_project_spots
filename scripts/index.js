import { setButtonText, setDeleteButtonText } from "../utils/helpers.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1d1ac213-7a85-46a2-9a19-e96c855359f6",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()

  .then(([cards, userData]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

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
  "#profile-description-input",
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
const deleteModalClosebtn = deleteModal.querySelector(".modal__close-btn");

const deleteCancelBtn = deleteModal.querySelector("#cancel-btn");

// Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = document.querySelector(".modal__image");
const previewModalCaptionEl = document.querySelector(".modal__caption");
const previewModalCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview",
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
  const deleteSubmitBtn = evt.submitter;
  setDeleteButtonText(deleteSubmitBtn, true);
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setDeleteButtonText(deleteSubmitBtn, false);
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;

  openModal(deleteModal);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const editModalClosebtn = evt.submitter;

  setButtonText(editModalClosebtn, true);
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(editModalClosebtn, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  disableButton(cardSubmitBtn, settings);

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  setButtonText(cardSubmitBtn, true);
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
      console.error("Error adding new card:", error);
      alert("Failed to add new card. Please check console for details.");
    })
    .finally(() => {
      setButtonText(cardSubmitBtn, false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarSubmitBtn = evt.submitter;
  setButtonText(avatarSubmitBtn, true);

  console.log(avatarModalInput.value);
  api
    .editAvatarInfo(avatarModalInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(avatarSubmitBtn, false);
    });
}

function handleCardLike(evt, id) {
  const cardLikeBtn = evt.target;
  const isLiked = cardLikeBtn.classList.contains("card__like-btn_liked");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      cardLikeBtn.classList.toggle("card__like-btn_liked");
    })
    .catch((error) => {
      console.error("Error changing like status:", error);
      alert("Failed to change like status. Please check console for details.");
    });
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.altText || `Photo of ${data.name}`;

  cardLikeBtn.addEventListener("click", (evt) => handleCardLike(evt, data._id));

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.altText || `Photo of ${data.name}`;
  });

  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id),
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

deleteFormElement.addEventListener("submit", handleDeleteSubmit);

deleteModalClosebtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

enableValidation(settings);
