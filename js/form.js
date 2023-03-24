import {resetEffects, setDefaultScale} from './formEffects.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadCancelButton = document.querySelector('.img-upload__cancel');
const formUploadImage = document.querySelector('.img-upload__overlay');
const formTextArea = document.querySelector('.text__description');
const formHashtags = document.querySelector('.text__hashtags');
const uploadInput = document.querySelector('.img-upload__input');
const uploadFile = document.getElementById('upload-file');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');

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

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

uploadInput.addEventListener('change', onOpenForm);
uploadCancelButton.addEventListener('click', onCloseForm);
