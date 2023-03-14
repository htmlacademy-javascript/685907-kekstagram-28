import {photoEnrichment} from './photoEnrichment.js';
import {removeComments} from './removeComment.js';

const closePhotoButton = document.querySelector('.big-picture__cancel');
const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = document.querySelector('.pictures');
const body = document.querySelector('body');
const commentPlace = document.querySelector('.social__comments');

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
  if (evt.target.tagName === 'IMG') {
    body.classList.add('modal-open');
    const commentPlaceList = commentPlace.querySelectorAll('li.social__comment');
    removeComments(commentPlaceList);
    photoEnrichment(evt);
    const socialCommentCount = document.querySelector('.social__comment-count');
    const commentsLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPhoto.classList.remove('hidden');

    closePhotoButton.addEventListener('click', onPhotoCloseClick);
    document.addEventListener('keydown', onPhotoKeydown);
  }
};

function closePhotoModal() {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  closePhotoButton.removeEventListener('click', onPhotoCloseClick);
  document.removeEventListener('keydown', onPhotoKeydown);
}

miniPhoto.addEventListener('click', (evt) => {
  openPhotoModal(evt);
});
