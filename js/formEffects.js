const PHOTO_EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DEFAULT_EFFECT = PHOTO_EFFECTS[0];

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleInputControl = document.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.effect-level');
const photo = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');

let chosenEffect = DEFAULT_EFFECT;

const isDefaultEffect = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const createSlider = (element) => {
  noUiSlider.create(element, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max
    },
    start: DEFAULT_EFFECT.max,
    connect: 'lower',
    step: DEFAULT_EFFECT.step
  });
  hideSlider();
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max
  });

  if (isDefaultEffect()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  if (isDefaultEffect()) {
    photo.style.filter = DEFAULT_EFFECT.style;
  } else {
    photo.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectLevel.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

const onEffectChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    chosenEffect = PHOTO_EFFECTS.find((effect) => effect.name === evt.target.value);
    photo.className = `effects__preview--${evt.target.value}`;
    updateSlider();
  }
};

const scaleImage = (value) => {
  photo.style.transform = `scale(${value / 100})`;
  scaleInputControl.value = `${value}%`;
};

const setDefaultScale = () => {
  scaleImage(DEFAULT_SCALE);
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputControl.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputControl.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

createSlider(slider);
slider.noUiSlider.on('update', onSliderUpdate);
scaleBiggerButton.addEventListener('click', onBiggerButtonClick);
scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
effectsList.addEventListener('change', onEffectChange);

export {resetEffects, setDefaultScale};
