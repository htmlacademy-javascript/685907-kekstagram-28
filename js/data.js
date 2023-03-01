import {getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';
import {messagePartsList, nameList, descriptionList} from './dictionaries.js';

const COUNT_OF_TEST_USERS = 25;
const commentId = createRandomIdFromRangeGenerator(1, COUNT_OF_TEST_USERS * 5);

function getDescription() {
  return `Моя ${descriptionList[getRandomInteger(0, descriptionList.length - 1)]} жизнь.`;
}

function getRandomLikes() {
  return getRandomInteger(15, 200);
}

function getComments() {
  const commentsCount = getRandomInteger(1, 5);
  const commentsList = [];

  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      id: commentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomMessage(),
      name: getRandomName()
    };
    commentsList.push(comment);
  }
  return commentsList;
}

function getRandomName() {
  return nameList[getRandomInteger(0, nameList.length - 1)];
}

function getRandomMessage() {
  let result = '';
  const latestIndexMessageParts = [];

  for (let i = 0; i < getRandomInteger(1, 2); i++) {
    let messageIndex = getRandomInteger(1, messagePartsList.length) - 1;
    while (latestIndexMessageParts.includes(messageIndex)) {
      messageIndex = getRandomInteger(1, messagePartsList.length) - 1;
    }
    latestIndexMessageParts.push(messageIndex);
    result += `${messagePartsList[messageIndex]} `;
  }
  return result;
}

function getPhotoDescriptions() {
  const photoDescriptionsList = [];
  const urlId = createRandomIdFromRangeGenerator(1, COUNT_OF_TEST_USERS);
  const id = createRandomIdFromRangeGenerator(1, COUNT_OF_TEST_USERS);

  return function () {
    for (let i = 0; i < COUNT_OF_TEST_USERS; i++) {
      const photoInfo = {
        id: id(),
        url: `photos/${urlId()}.jpg`,
        description: getDescription(),
        likes: getRandomLikes(),
        comments: getComments(),
        name: getRandomName()
      };
      photoDescriptionsList.push(photoInfo);
    }
    return photoDescriptionsList;
  };
}

const getDescriptionsList = getPhotoDescriptions();

export {getDescriptionsList};
