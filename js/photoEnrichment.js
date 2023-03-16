import {createCommentsElementList} from './comments.js';
import {photoList} from './photoLinker.js';

const photoImg = document.querySelector('.big-picture__img').querySelector('img');
const photoLikes = document.querySelector('.likes-count');
const photoCommentsCount = document.querySelector('.comments-count');
const commentPlace = document.querySelector('.social__comments');

const getPhotoElement = function (evt) {
  return photoList.find((element) => element.id === +evt.target.getAttribute('data-photo-id'));
};

const photoEnrichment = function (evt) {
  const photoElement = getPhotoElement(evt);
  const commentsList = photoElement.comments;
  photoImg.src = photoElement.url;
  photoImg.alt = photoElement.name;
  photoLikes.textContent = photoElement.likes;
  photoCommentsCount.textContent = photoElement.comments.length;
  commentPlace.appendChild(createCommentsElementList(commentsList));
};

export {photoEnrichment};
