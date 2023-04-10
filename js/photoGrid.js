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
  cleanPhotoList();
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

const showFiltersBlock = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const getCommentsCount = (photo) => photo.comments.length;

const comparePhotosCommentsCount = (photoA, photoB) => {
  const commentCountA = getCommentsCount(photoA);
  const commentCountB = getCommentsCount(photoB);
  return commentCountB - commentCountA;
};

function renderPhoto(list) {
  photoListElement.appendChild(preparePhotoElement(list));
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
    cb();
  });
};

const getRandomPhotosClick = (cb) => {
  filterRandomButton.addEventListener('click', () => {
    setActiveFilterButton(filterRandomButton);
    cb();
  });
};

const getDiscussedPhotosClick = (cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    setActiveFilterButton(filterDiscussedButton);
    cb();
  });
};

export {
  renderPhoto,
  showFiltersBlock,
  getAllPhotosClick,
  preparePhotoElement,
  getRandomPhotosClick,
  getDiscussedPhotosClick,
  comparePhotosCommentsCount
};
