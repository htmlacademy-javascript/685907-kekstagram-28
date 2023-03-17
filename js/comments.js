const removeComments = function (list) {
  for (let i = 0; i < list.length; i++) {
    list[i].remove();
  }
};

const createCommentElement = function (element) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = element.avatar;
  commentAvatar.alt = element.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentElement.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = element.message;
  commentElement.appendChild(commentText);
  commentElement.classList.add('hidden');

  return commentElement;
};

const createCommentsElementList = function (list) {
  const commentPlace = document.querySelector('.social__comments');
  const commentPlaceList = commentPlace.querySelectorAll('li.social__comment');
  const commentFragment = document.createDocumentFragment();
  removeComments(commentPlaceList);

  for (let i = 0; i < list.length; i++) {
    commentFragment.appendChild(createCommentElement(list[i]));
  }
  return commentFragment;
};

export {createCommentsElementList};
