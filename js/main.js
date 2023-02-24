const COUNT_OF_TEST_USERS = 25;

const messagePartsList = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const nameList = [
  'Чернышев Тихон',
  'Васильев Тимофей',
  'Акимова Екатерина',
  'Кузин Гордей',
  'Васильев Степан',
  'Морозова Ксения',
  'Тихонова Валерия',
  'Андреева Ангелина',
  'Савельева Виктория',
  'Лебедев Максим'
];

const descriptionList = [
  'добрая',
  'душевная',
  'дружелюбная',
  'дивная',
  'единственная',
  'женственная',
  'желанная',
  'жизнерадостная',
  'заботливая',
  'завораживающая'
];

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
  return `Моя ${descriptionList[getRandomInteger(0, descriptionList.length - 1)]} жизнь.`;
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

getPhotoDescriptions();
