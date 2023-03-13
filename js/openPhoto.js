import {removeComments, photoEnrichment} from './photoEnrichment.js';

const closePhotoButton = document.querySelector('.big-picture__cancel');
const bigPhoto = document.querySelector('.big-picture');
const miniPhoto = document.querySelector('.pictures');
const body = document.querySelector('body');

function runAfterCloseEvents(list) {
  bigPhoto.classList.add('hidden');
  removeComments(list);
  body.classList.remove('modal-open');
}

function addCloseEvents(commentsList) {
  closePhotoButton.addEventListener('click', () => {
    runAfterCloseEvents(commentsList);
  }, {once: true});

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      runAfterCloseEvents(commentsList);
    }
  }, {once: true});
}

const onListClick = function (evt) {
  if (evt.target.tagName === 'IMG') {
    body.classList.add('modal-open');
    const commentPlace = document.querySelector('.social__comments');
    const commentPlaceList = commentPlace.querySelectorAll('li.social__comment');
    removeComments(commentPlaceList);
    photoEnrichment(evt);
    const socialCommentCount = document.querySelector('.social__comment-count');
    const commentsLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPhoto.classList.remove('hidden');

    addCloseEvents(commentPlaceList);
  }
};

miniPhoto.addEventListener('click', (evt) => {
  onListClick(evt);
});
