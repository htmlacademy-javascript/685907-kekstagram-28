import {debounce, showAlert} from './util.js';
import {onCloseForm, showSuccessSend, showErrorSend, unblockSubmitButton} from './form.js';
import {getPhotoList} from './photoEnrichment.js';
import {
  renderPhoto,
  showFiltersBlock,
  getDiscussedPhotosClick,
  getAllPhotosClick,
  getRandomPhotosClick,
  comparePhotosCommentsCount
} from './photoGrid.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const RANDOM_PHOTO_COUNT = 10;

const ErrorText = {
  GET_DATA: 'Не удалось загрузить фотографии. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const RERENDER_DELAY = 500;

const getData = () => {
  fetch(`${BASE_URL}/data`)
    .then((response) => response.json())
    .then((dataPhoto) => {
      renderPhoto(dataPhoto);
      const renderPhotoDebounced = debounce(renderPhoto);
      getAllPhotosClick(() => renderPhotoDebounced(dataPhoto), RERENDER_DELAY);
      getRandomPhotosClick(() => renderPhotoDebounced(dataPhoto.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTO_COUNT)), RERENDER_DELAY);
      getDiscussedPhotosClick(() => renderPhotoDebounced(dataPhoto.slice().sort(comparePhotosCommentsCount)), RERENDER_DELAY);
      getPhotoList(dataPhoto);
      showFiltersBlock();
    })
    .catch(() => {
      showAlert(`${ErrorText.GET_DATA}`);
    });
};

const sendData = (body) => {
  fetch(
    `${BASE_URL}`,
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if (response.ok) {
        onCloseForm();
        showSuccessSend();
      } else {
        showErrorSend();
      }
    })
    .catch(() => {
      showAlert(`${ErrorText.SEND_DATA}`);
    })
    .finally(unblockSubmitButton);
};

export {sendData, getData};
