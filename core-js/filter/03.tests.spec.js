import './02.filter';

const isEven = (element, index) => element % 2 === 0;
const isOdd = (element, index) => element % 2 === 1;

describe('Array.prototype.myFilter', () => {
  test('even numbers', () => {
    expect([1, 10, 4].myFilter(isEven)).toStrictEqual([10, 4]);
  });

  test('odd numbers', () => {
    expect([1, 10, 3].myFilter(isOdd)).toStrictEqual([1, 3]);
  });
});