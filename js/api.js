import {debounce, showAlert} from './util.js';
import {onCloseForm, showSuccessSend, showErrorSend, unblockSubmitButton} from './form.js';
import {getPhotoList} from './photoEnrichment.js';
import {renderPhoto, showFiltersBlock, renderMostDiscussedPhoto, renderRandomPhoto, getDiscussedPhotosClick, getAllPhotosClick, getRandomPhotosClick} from './photoGrid.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

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
      getDiscussedPhotosClick(debounce(() => renderMostDiscussedPhoto(dataPhoto)), RERENDER_DELAY);
      getAllPhotosClick(debounce(() => renderPhoto(dataPhoto)), RERENDER_DELAY);
      getRandomPhotosClick(debounce(() => renderRandomPhoto(dataPhoto)()), RERENDER_DELAY);
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
