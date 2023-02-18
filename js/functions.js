function lengthCheck(text, expectedLength) {
  return text.length <= expectedLength;
}

lengthCheck('проверяемая строка', 20); // Результат: true - строка проходит по длине
lengthCheck('проверяемая строка', 18); // Результат: true - строка проходит по длине
lengthCheck('проверяемая строка', 10); // Результат: false — строка не проходит

function polyndromCheck(text) {
  text = text.replaceAll(' ', '').toLowerCase();
  const reverseText = text.split('').reverse().join('');
  return text === reverseText;
}

polyndromCheck('топот'); // Результат: true - строка является палиндромом
polyndromCheck('ДовОд'); // Результат: true - несмотря на разный регистр, тоже палиндром
polyndromCheck('Кекс'); // Результат: false - это не палиндром
polyndromCheck('Лёша на полке клопа нашёл '); // Результат: true - это палиндром

function isNumberContain(text) {
  return parseInt(text.toString().replace(/[^0-9]/g, ''), 10);
}

isNumberContain('2023 год'); // Результат: число 2023
isNumberContain('ECMAScript 2022'); // Результат: число 2022
isNumberContain('1 кефир, 0.5 батона'); // Результат: число 105
isNumberContain('а я томат'); // Результат: NaN
isNumberContain(2023); // Результат: число 2023
isNumberContain(-1); // Результат: число 1
isNumberContain(1.5); // Результат: число 15

function stringAppend(text, minLength, appendText) {
  let resultText = text;
  if (resultText.length >= minLength) {
    return resultText;
  } else {
    for (let i = 0; i < minLength; i++) {
      if (appendText.length + resultText.length <= minLength) {
        resultText = appendText + resultText;
      } else {
        appendText = appendText.slice(0, -1);
      }
    }
    return resultText;
  }
}

// Добавочный символ использован один раз
stringAppend('1', 2, '0'); // Результат: строка '01'

// Добавочный символ использован три раза
stringAppend('1', 4, '0'); // Результат: строка '0001'

// Добавочные символы обрезаны с конца
stringAppend('q', 4, 'werty'); // Результат: строка 'werq'

// Добавочные символы использованы полтора раза
stringAppend('q', 4, 'we'); // Результат: строка 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
stringAppend('qwerty', 4, '0'); // Результат: строка 'qwerty'
