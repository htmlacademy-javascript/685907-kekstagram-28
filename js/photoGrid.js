import {createRandomIdFromRangeGenerator} from './util.js';

const RANDOM_PHOTO_COUNT = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');
const filterDefaultButton = document.getElementById('filter-default');
const filterRandomButton = document.getElementById('filter-random');
const filterDiscussedButton = document.getElementById('filter-discussed');

const cleanPhotoList = () => {
  const photoArray = Array.from(photoListElement.children);
  for (let i = 0; i < photoArray.length; i++) {
    if (photoArray[i].classList.contains('picture')) {
      photoArray[i].remove();
    }
  }
};

const preparePhotoElement = (photoList) => {
  const photoListFragments = document.createDocumentFragment();
  photoList
    .forEach(({id, url, likes, comments}) => {
      const photoElement = photoTemplate.cloneNode(true);
      const elementImage = photoElement.querySelector('.picture__img');
      const elementLikesCount = photoElement.querySelector('.picture__likes');
      const elementComments = photoElement.querySelector('.picture__comments');
      elementImage.src = url;
      elementImage.setAttribute('data-photo-id', id);
      elementLikesCount.textContent = likes;
      elementComments.textContent = comments.length;
      photoListFragments.appendChild(photoElement);
    });
  return photoListFragments;
};

function renderPhoto(list) {
  photoListElement.appendChild(preparePhotoElement(list));
}

const showFiltersBlock = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const getCommentsCount = (photo) => photo.comments.length;

const comparePhotosCommentsCount = (photoA, photoB) => {
  const commentCountA = getCommentsCount(photoA);
  const commentCountB = getCommentsCount(photoB);
  return commentCountB - commentCountA;
};

function renderMostDiscussedPhoto(list) {
  const preparedFragment = preparePhotoElement(list.slice().sort(comparePhotosCommentsCount));
  photoListElement.appendChild(preparedFragment);
}

function renderRandomPhoto(list) {
  const photoDescriptionsList = [];
  const randomId = createRandomIdFromRangeGenerator(0, list.length - 1);
  return function () {
    for (let i = 0; i < RANDOM_PHOTO_COUNT; i++) {
      photoDescriptionsList.push(list[randomId()]);
    }
    photoListElement.appendChild(preparePhotoElement(photoDescriptionsList));
    return photoDescriptionsList;
  };
}

const setActiveFilterButton = (activeButton) => {
  const filterButtonList = document.querySelector('.img-filters__form').querySelectorAll('button');

  filterButtonList.forEach((button) => {
    if (button.classList.contains(ACTIVE_FILTER_CLASS)) {
      button.classList.remove(ACTIVE_FILTER_CLASS);
    }
  });

  activeButton.classList.add(ACTIVE_FILTER_CLASS);
};

const getAllPhotosClick = (cb) => {
  filterDefaultButton.addEventListener('click', () => {
    setActiveFilterButton(filterDefaultButton);
    cleanPhotoList();
    cb();
  });
};

const getRandomPhotosClick = (cb) => {
  filterRandomButton.addEventListener('click', () => {
    setActiveFilterButton(filterRandomButton);
    cleanPhotoList();
    cb();
  });
};

const getDiscussedPhotosClick = (cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    setActiveFilterButton(filterDiscussedButton);
    cleanPhotoList();
    cb();
  });
};

export {renderPhoto, showFiltersBlock, renderMostDiscussedPhoto, renderRandomPhoto, getAllPhotosClick, getRandomPhotosClick, getDiscussedPhotosClick};
