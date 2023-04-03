import {resetEffects, setDefaultScale} from './formEffects.js';
import {sendData} from './api.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю ...'
};

const resultSendModal = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const uploadCancelButton = document.querySelector('.img-upload__cancel');
const formSubmitButton = document.querySelector('.img-upload__submit');
const formUploadImage = document.querySelector('.img-upload__overlay');
const formTextArea = document.querySelector('.text__description');
const formHashtags = document.querySelector('.text__hashtags');
const uploadInput = document.querySelector('.img-upload__input');
const uploadFile = document.getElementById('upload-file');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');

let currentSendState = resultSendModal.SUCCESS;
let errorMessage;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'form-field-error'
});

const isTagsCorrectCount = (tagsList) => {
  errorMessage = `Введите не больше ${MAX_HASHTAGS_COUNT} хэштегов.`;
  return tagsList.length <= MAX_HASHTAGS_COUNT;
};

const isTagUniq = (tagsList) => {
  const lowerCaseTags = tagsList.map((tag) => tag.toLowerCase());
  const uniqSetOfTags = new Set(lowerCaseTags);
  errorMessage = 'Хэштег должен быть уникальным.';
  return lowerCaseTags.length === uniqSetOfTags.size;
};

const isValidByRegex = (tag) => {
  errorMessage = 'Указан недопустимый хэштег.';
  return VALID_SYMBOLS_REGEX.test(tag);
};

const checkHashtags = (value) => {
  const tagsList = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isTagsCorrectCount(tagsList) && isTagUniq(tagsList) && tagsList.every(isValidByRegex);
};

const getErrorMessage = () => errorMessage;

pristine.addValidator(formHashtags, checkHashtags, getErrorMessage);

const createSendResultHiddenModal = (sendResult) => {
  const modalFragment = document.createDocumentFragment();
  const modalSuccessTemplate = document.querySelector(`#${sendResult}`).content;
  const successModalElement = modalSuccessTemplate.cloneNode(true);
  const modalContainer = successModalElement.querySelector(`.${sendResult}`);
  modalContainer.classList.add('hidden');
  modalFragment.appendChild(successModalElement);
  body.appendChild(modalFragment);
};

const onOpenForm = () => {
  setDefaultScale();
  formUploadImage.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

const onCloseForm = () => {
  formUploadImage.classList.add('hidden');
  uploadFile.value = null;
  form.reset();
  resetEffects();
  pristine.reset();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const isOnFieldsFocus = () => document.activeElement === formTextArea || document.activeElement === formHashtags;

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && !isOnFieldsFocus()) {
    evt.preventDefault();
    onCloseForm();
  }
}

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

const onModalKeyDown = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    if (currentSendState === resultSendModal.ERROR) {
      closeModalClick(resultSendModal.ERROR);
    } else {
      closeModalClick(resultSendModal.SUCCESS);
    }
  }
};

function closeModalClick(sendState) {
  const modalContainer = document.querySelector(`.${sendState}`);
  modalContainer.classList.add('hidden');
  document.removeEventListener('keydown', onModalKeyDown);
  if (sendState === resultSendModal.ERROR) {
    document.addEventListener('keydown', onDocumentKeyDown);
  }
}

const showSuccessSend = () => {
  const successButtonOnModal = document.querySelector('.success__button');
  const modalSuccessSend = document.querySelector('.success');
  document.addEventListener('keydown', onModalKeyDown);
  modalSuccessSend.classList.remove('hidden');
  successButtonOnModal.addEventListener('click', () => closeModalClick(resultSendModal.SUCCESS));
};

const showErrorSend = () => {
  const errorButtonOnModal = document.querySelector('.error__button');
  const modalErrorSend = document.querySelector('.error');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('keydown', onModalKeyDown);
  currentSendState = resultSendModal.ERROR;
  modalErrorSend.classList.remove('hidden');
  errorButtonOnModal.addEventListener('click', () => closeModalClick(resultSendModal.ERROR));
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData);
  }
});

uploadInput.addEventListener('change', onOpenForm);
uploadCancelButton.addEventListener('click', onCloseForm);
createSendResultHiddenModal(resultSendModal.ERROR);
createSendResultHiddenModal(resultSendModal.SUCCESS);

export {onCloseForm, unblockSubmitButton, showSuccessSend, showErrorSend};
