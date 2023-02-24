const COUNT_OF_TEST_USERS = 25;

const messagePartsList = {
  1: 'Всё отлично!',
  2: 'В целом всё неплохо.',
  3: 'Но не всё.',
  4: 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  5: 'В конце концов это просто непрофессионально.',
  6: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  7: 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  8: 'Лица у людей на фотке перекошены, как будто их избивают.',
  9: 'Как можно было поймать такой неудачный момент?!'
};

const nameList = {
  1: 'Чернышев Тихон',
  2: 'Васильев Тимофей',
  3: 'Акимова Екатерина',
  4: 'Кузин Гордей',
  5: 'Васильев Степан',
  6: 'Морозова Ксения',
  7: 'Тихонова Валерия',
  8: 'Андреева Ангелина',
  9: 'Савельева Виктория',
  10: 'Лебедев Максим'
};

const descriptionList = {
  1: 'добрая',
  2: 'душевная',
  3: 'дружелюбная',
  4: 'дивная',
  5: 'единственная',
  6: 'женственная',
  7: 'желанная',
  8: 'жизнерадостная',
  9: 'заботливая',
  10: 'завораживающая'
};

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];
  if (previousValues.length >= (max - min + 1)) {
    return null;
  }
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getDescription() {
  return `Моя ${descriptionList[getRandomInteger(1, 10)]} жизнь.`;
}

function getRandomLikes() {
  return getRandomInteger(15, 200);
}

function getComments() {
  const commentsCount = getRandomInteger(1, 5);
  const commentsList = [];
  const id = createRandomIdFromRangeGenerator(1, commentsCount);

  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      id: id(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomMessage(),
      name: getRandomName()
    };
    commentsList.push(comment);
  }
  return commentsList;
}

function getRandomName() {
  return nameList[getRandomInteger(1, 10)];
}

function getRandomMessage() {
  let result = '';
  const latestIndexMessageParts = [];

  for (let i = 0; i < getRandomInteger(1, 2); i++) {
    let messageIndex = getRandomInteger(1, 9);
    while (latestIndexMessageParts.includes(messageIndex)) {
      messageIndex = getRandomInteger(1, 9);
    }
    latestIndexMessageParts.push(messageIndex);
    result += ` ${messagePartsList[messageIndex]}`;
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

getPhotoDescriptions();
