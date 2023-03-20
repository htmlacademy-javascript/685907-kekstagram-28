import {createCommentsElementList} from './comments.js';
import {photoList} from './photoLinker.js';

const COMMENTS_LOAD_COUNT = 5;
let actualVisibleCommentsCount = 0;
const photoImg = document.querySelector('.big-picture__img').querySelector('img');
const photoLikes = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const photoCommentsCount = document.querySelector('.comments-count');
const commentPlace = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

const getPhotoElement = function (evt) {
  return photoList.find((element) => element.id === +evt.target.getAttribute('data-photo-id'));
};

const updateVisibleCommentCount = function () {
  const visibleCommentList = commentPlace.querySelectorAll('li:not(.hidden)');
  actualVisibleCommentsCount = visibleCommentList.length;
};

const createSocialCommentHtmlInner = function () {
  const socialCommentCount = document.querySelector('.social__comment-count');
  const visibleCommentList = commentPlace.querySelectorAll('li').length;
  socialCommentCount.innerHTML = `${actualVisibleCommentsCount} из <span class="comments-count">${visibleCommentList}</span> комментариев`;
};

const setVisibleFirstComments = function (originalCommentsList) {
  const commentsFragment = document.createDocumentFragment();
  const allCommentElements = createCommentsElementList(originalCommentsList).querySelectorAll('li');
  // в цикле убираем hidden первым комментариям, которые отображаются при открытии карточки.
  for (let i = 0; i < COMMENTS_LOAD_COUNT; i++) {
    // Если в цикле мы приходим к тому, что количество комментариев меньше, чем мы отображаем по умолчанию, то цикл остановим и отобразим все
    if (i === originalCommentsList.length) {
      break;
    } else {
      allCommentElements[i].classList.remove('hidden');
    }
  }
  // отдельно проверяем, если мы по умолчанию отображаем COMMENTS_LOADED_COUNT = 5 комментариев, то в фотографии, где всего 5 комменатриями, нужно прятать кнопку {загрузить ещё} как только открываем карточку
  if (allCommentElements.length <= COMMENTS_LOAD_COUNT) {
    commentsLoader.classList.add('hidden');
  }

  for (let j = 0; j < allCommentElements.length; j++) {
    commentsFragment.appendChild(allCommentElements[j]);
  }
  return commentsFragment;
};

const photoEnrichment = function (evt) {
  const photoElement = getPhotoElement(evt);
  const commentsList = photoElement.comments;
  socialCaption.textContent = photoElement.description;
  photoImg.src = photoElement.url;
  photoImg.alt = photoElement.name;
  photoLikes.textContent = photoElement.likes;
  photoCommentsCount.textContent = photoElement.comments.length;
  commentPlace.appendChild(setVisibleFirstComments(commentsList));
  updateVisibleCommentCount();
  createSocialCommentHtmlInner();
};

const onCommentLoaderClick = () => {
  const allCommentsHiddenElements = commentPlace.querySelectorAll('li.hidden');

  if (allCommentsHiddenElements.length <= COMMENTS_LOAD_COUNT) {
    commentsLoader.classList.add('hidden');
    for (let i = 0; i < allCommentsHiddenElements.length; i++) {
      allCommentsHiddenElements[i].classList.remove('hidden');
    }
  } else {
    for (let i = 0; i < COMMENTS_LOAD_COUNT; i++) {
      allCommentsHiddenElements[i].classList.remove('hidden');
    }
  }
  updateVisibleCommentCount();
  createSocialCommentHtmlInner();
};

export {photoEnrichment, onCommentLoaderClick};
