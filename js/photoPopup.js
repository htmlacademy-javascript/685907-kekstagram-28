import {photoEnrichment} from './photoEnrichment.js';
import {onCommentLoaderClick} from './photoEnrichment.js';

const closePhotoButton = document.querySelector('.big-picture__cancel');
const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = document.querySelector('.pictures');
const body = document.querySelector('body');
const commentsLoader = document.querySelector('.comments-loader');

const onPhotoKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhotoModal();
  }
};

const onPhotoCloseClick = () => {
  closePhotoModal();
};

const openPhotoModal = function (evt) {
  if (evt.target.className === 'picture__img') {
    body.classList.add('modal-open');
    photoEnrichment(evt);
    bigPhoto.classList.remove('hidden');
    closePhotoButton.addEventListener('click', onPhotoCloseClick);
    document.addEventListener('keydown', onPhotoKeydown);
    commentsLoader.addEventListener('click', onCommentLoaderClick);
  }
};

function closePhotoModal() {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  closePhotoButton.removeEventListener('click', onPhotoCloseClick);
  document.removeEventListener('keydown', onPhotoKeydown);
  commentsLoader.removeEventListener('click', onCommentLoaderClick);
  commentsLoader.classList.remove('hidden');
}

miniPhoto.addEventListener('click', (evt) => {
  openPhotoModal(evt);
});
