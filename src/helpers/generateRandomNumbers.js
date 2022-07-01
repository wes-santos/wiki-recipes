// Créditos pelas duas funções ao StackOverflow:
// https://stackoverflow.com/questions/8378870/generating-unique-random-numbers-integers-between-0-and-x
// https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100

const HALF = 0.5;
const RANDOM_NUMBERS_LIMIT = 1000;

const generateRandomNumber = () => Math.floor(Math.random() * (RANDOM_NUMBERS_LIMIT + 1));

export default function generateRandomNumbers() {
  const numbers = Array(RANDOM_NUMBERS_LIMIT).fill().map((_, index) => index + 1);
  numbers.sort(() => Math.random() - HALF);
  const randomNumber = generateRandomNumber();
  return numbers[randomNumber];
}
