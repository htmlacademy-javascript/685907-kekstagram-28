const createCommentsElementList = function (list) {

  const commentFragment = document.createDocumentFragment();

  for (let i = 0; i < list.length; i++) {

    const commentTemplate = document.createElement('li');
    commentTemplate.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = list[i].avatar;
    commentAvatar.alt = list[i].name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    commentTemplate.appendChild(commentAvatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = list[i].message;
    commentTemplate.appendChild(commentText);

    commentFragment.appendChild(commentTemplate);
  }
  return commentFragment;
};

export {createCommentsElementList};
